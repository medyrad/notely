import { act } from "@testing-library/react";
import { useNotesStore } from "../store";

describe("notes store", () => {
  it("creates a note", () => {
    act(() => {
      useNotesStore.getState().startDraft();
      const draft = useNotesStore.getState().draft!;
      useNotesStore.getState().createNote(draft);
    });

    const state = useNotesStore.getState();

    expect(state.noteIds.length).toBe(1);
    expect(state.notesById[state.noteIds[0]]).toBeDefined();
  });
});
