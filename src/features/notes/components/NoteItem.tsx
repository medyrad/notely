import { memo } from "react";
import type { Note } from "../types";

interface Props {
  note: Note;
}

export const NoteItem = memo<Props>(({ note }) => {
  return (
    <article aria-labelledby={`note-title-${note.id}`} tabIndex={0}>
      <h3 id={`note-title-${note.id}`}>{note.title}</h3>
      <p>{note.content}</p>
    </article>
  );
});
