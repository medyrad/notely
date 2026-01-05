import { memo } from "react";
import { useNoteById } from "../selectors";

interface Props {
  noteId: string;
}

export const NoteRow = memo<Props>(({ noteId }) => {
  const note = useNoteById(noteId);

  if (!note) return null;

  return (
    <li>
      <h4>{note.title}</h4>
      <p>{note.content}</p>
    </li>
  );
});
