import { memo } from "react";
import { NoteRow } from "./NoteRow";

interface NotesListProps {
  noteIds: readonly string[];
}

export const NotesList = memo<NotesListProps>(({ noteIds }) => {
  return (
    <ul>
      {noteIds.map((id) => (
        <NoteRow key={id} noteId={id} />
      ))}
    </ul>
  );
});
