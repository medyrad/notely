import { useNotesStore } from "./store";

export const useNotesList = () => useNotesStore((s) => Object.values(s.history.present));

export const useNoteById = (id: string) => useNotesStore((s) => s.history.present[id as any]);

export const useCanUndo = () => useNotesStore((s) => s.history.past.length > 0);

export const useCanRedo = () => useNotesStore((s) => s.history.future.length > 0);
