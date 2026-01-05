import { render, screen } from "@testing-library/react";
import { NoteItem } from "../NoteItem";

const note = {
  id: "1",
  title: "Test Note",
  content: "Accessible content",
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

describe("NoteItem", () => {
  it("renders note title and content", () => {
    render(<NoteItem note={note} />);

    expect(screen.getByRole("heading", { name: /test note/i })).toBeInTheDocument();

    expect(screen.getByText(/accessible content/i)).toBeInTheDocument();
  });
});
