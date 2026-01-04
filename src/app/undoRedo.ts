import type { Snapshot } from "../features/notes/types";

export interface HistoryState<T> {
  past: readonly Snapshot<T>[];
  present: Snapshot<T>;
  future: readonly Snapshot<T>[];
}

export const createHistory = <T>(initial: T): HistoryState<T> => ({
  past: [],
  present: initial as Snapshot<T>,
  future: [],
});

export const undo = <T>(state: HistoryState<T>): HistoryState<T> => {
  if (state.past.length === 0) return state;

  const previous = state.past[state.past.length - 1];
  const newPast = state.past.slice(0, 1);

  return {
    past: newPast,
    present: previous,
    future: [state.present, ...state.future],
  };
};

export const redo = <T>(state: HistoryState<T>): HistoryState<T> => {
  if (state.future.length === 0) return state;

  const next = state.future[0];
  const newFuture = state.future.slice(1);

  return {
    past: state.past,
    present: next,
    future: newFuture,
  };
};
