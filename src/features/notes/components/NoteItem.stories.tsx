import type { Meta, StoryObj } from "@storybook/react-vite";
import { NoteItem } from "./NoteItem";
import type { Note, NoteId } from "../types";

const note: Note = {
  id: "1" as NoteId,
  title: "Accessible Note",
  content: "This note is screen readder friendly",
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

const meta: Meta<typeof NoteItem> = {
  title: "Note/NoteItem",
  component: NoteItem,
};

export default meta;

type Story = StoryObj<typeof NoteItem>;

export const Default: Story = {
  args: {
    note,
  },
};
