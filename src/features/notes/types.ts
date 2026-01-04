export type NoteId = string & { readonly brand: unique symbol };

export interface Note {
  readonly id: NoteId;
  title: string;
  content: string;
  createdAt: number;
  updatedAt: number;
}

export type DraftNote = Omit<Note, "id" | "createdAt" | "updatedAt">;

export type Snapshot<T> = {
  readonly [K in keyof T]: T[K] extends object ? Snapshot<T[K]> : T[K];
};
