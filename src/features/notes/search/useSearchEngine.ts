import { InvertedIndex } from "./invertedIndex";
import { useNotesStore } from "../store";

const engine = new InvertedIndex();

export const initSearchIndex = () => {
  const state = useNotesStore.getState();
  Object.values(state.history.present).forEach((note) => engine.add(note));

  useNotesStore.subscribe(
    (s) => s.history.present,
    (notes) => {
      engine["index"].clear();
      Object.values(notes).forEach((n) => engine.add(n));
    },
  );
};

export const searchNotes = (query: string) => {
  return engine.search(query);
};
