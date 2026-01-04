import type { Note, NoteId } from "@/features/notes/types";

const DB_NAME = "notely-db";
const STORE_NAME = "notes";

export class NotesDB {
  private db!: IDBDatabase;

  async init() {
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, 1);

      request.onupgradeneeded = () => {
        const db = request.result;
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onerror = () => reject(request.error);
    });
  }

  async getAll(): Promise<Note[]> {
    return this.tx("readonly", (store) => store.getAll());
  }

  async put(note: Note) {
    return this.tx("readwrite", (store) => store.put(note));
  }

  async delete(id: NoteId) {
    return this.tx("readwrite", (store) => store.delete(id));
  }

  private tx<T>(
    mode: IDBTransactionMode,
    fn: (store: IDBObjectStore) => IDBRequest<T>,
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(STORE_NAME, mode);
      const store = tx.objectStore(STORE_NAME);
      const req = fn(store);

      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
}
