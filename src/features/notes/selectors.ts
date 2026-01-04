import { useNotesStore } from "./store";
import type { Note } from "./types";

export const useNotesList = (): readonly Note[] =>
  useNotesStore((s) => Object.values(s.history.present));

export const useNoteById = (id: string) => useNotesStore((s) => s.history.present[id as any]);

export const useCanUndo = () => useNotesStore((s) => s.history.past.length > 0);

export const useCanRedo = () => useNotesStore((s) => s.history.future.length > 0);
