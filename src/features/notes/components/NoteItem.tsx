import { memo } from "react";
import type { Note } from "../types";

interface Props {
  note: Note;
}

export const NoteItem = memo<Props>(({ note }) => {
  return (
    <article>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
    </article>
  );
});
