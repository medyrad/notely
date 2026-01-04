import type { DraftNote } from "../features/notes/types";

export const createDraftValidator = (maxLength: number) => {
  return (draft: DraftNote) => {
    return draft.title.length <= maxLength && draft.content.length <= maxLength * 10;
  };
};
