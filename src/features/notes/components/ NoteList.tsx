import { memo, useCallback } from "react";
import { NoteRow } from "./NoteRow";

interface NotesListProps {
  noteIds: readonly string[];
}

export const NotesList = memo<NotesListProps>(({ noteIds }) => {
  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

    const items = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("article"));

    const index = items.indexOf(document.activeElement as HTMLElement);

    const nextIndex =
      e.key === "ArrowDown" ? Math.min(index + 1, items.length - 1) : Math.max(index - 1, 0);

    items[nextIndex]?.focus();
  }, []);

  return (
    <ul role="list" onKeyDown={onKeyDown}>
      {noteIds.map((id) => (
        <NoteRow key={id} noteId={id} />
      ))}
    </ul>
  );
});
