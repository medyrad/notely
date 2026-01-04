import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { nanoid } from "nanoid";
import type { Note, NoteId, DraftNote } from "./types";
import { createHistory, undo, redo, type HistoryState } from "../../app/undoRedo";

type NotesMap = Record<NoteId, Note>;

interface NotesState {
  history: HistoryState<NotesMap>;
  draft: DraftNote | null;

  createNote: (draft: DraftNote) => void;
  updateNote: (id: NoteId, patch: Partial<Note>) => void;
  deleteNote: (id: NoteId) => void;

  startDraft: (initial?: DraftNote) => void;
  updateDraft: (patch: Partial<DraftNote>) => void;
  discardDraft: () => void;

  undo: () => void;
  redo: () => void;
}

export const useNotesStore = create<NotesState>()(
  immer((set, get) => ({
    history: createHistory<NotesMap>({} as NotesMap),
    draft: null,

    createNote: (draft) => {
      const id = nanoid() as NoteId;
      const now = Date.now();

      set((state) => {
        state.history.past.push(state.history.present);
        state.history.present = {
          ...state.history.present,
          [id]: {
            id,
            title: draft.title,
            content: draft.content,
            createdAt: now,
            updatedAt: now,
          },
        };
        state.history.future = [];
        state.draft = null;
      });
    },

    updateNote: (id, patch) => {
      set((state) => {
        const note = state.history.present[id];
        if (!note) return;

        state.history.past.push(state.history.present);
        state.history.present = {
          ...state.history.present,
          [id]: {
            ...note,
            ...patch,
            updatedAt: Date.now(),
          },
        };
        state.history.future = [];
      });
    },

    deleteNote: (id) => {
      set((state) => {
        if (!state.history.present[id]) return;

        const { [id]: _, ...rest } = state.history.present;
        state.history.past.push(state.history.present);
        state.history.present = rest as NotesMap;
        state.history.future = [];
      });
    },

    startDraft: (initial) => {
      set(() => ({
        draft: initial ?? { title: "", content: "" },
      }));
    },

    updateDraft: (patch) => {
      set((state) => {
        if (!state.draft) return;
        state.draft = { ...state.draft, ...patch };
      });
    },

    discardDraft: () => {
      set(() => ({ draft: null }));
    },

    undo: () => {
      set((state) => {
        state.history = undo(state.history);
      });
    },

    redo: () => {
      set((state) => {
        state.history = redo(state.history);
      });
    },
  })),
);
