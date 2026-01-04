import { useNotesStore } from "./store";
import { NotesDB } from "@/services/indexedDB";

const db = new NotesDB();

export const initNotesSync = async () => {
  await db.init();

  const notes = await db.getAll();
  const store = useNotesStore.getState();

  notes.forEach((note) => {
    store.updateNote(note.id, note);
  });

  useNotesStore.subscribe(
    (state) => state.history.present,
    (notesMap) => {
      Object.values(notesMap).forEach((note) => {
        db.put(note);
      });
    },
  );
};
