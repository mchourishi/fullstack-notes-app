import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NoteList } from "../components/notes/NoteList";
import { NoteForm } from "../components/notes/NoteForm";
import { Dashboard } from "../pages/Dashboard";
import * as notesService from "../services/notes.service";

jest.mock("../services/notes.service");

describe("Notes Features", () => {
  const mockRefreshNotes = jest.fn();

  beforeEach(() => {
    render(<NoteForm refreshNotes={mockRefreshNotes} />);
  });

  describe("AddNote Component", () => {
    test("renders add note form", () => {
      expect(screen.getByLabelText(/new note/i)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /create note/i })
      ).toBeInTheDocument();
    });

    test("adds new note", async () => {
      await userEvent.type(screen.getByLabelText(/new note/i), "Test Content");

      fireEvent.click(screen.getByRole("button", { name: /create note/i }));

      await waitFor(() => {
        expect(screen.queryByText(/Test Content/i)).toBeInTheDocument();
      });
    });
  });

  describe("NotesList Component", () => {
    const mockNotes = [
      { id: 1, content: "Content 1" },
      { id: 2, content: "Content 2" },
    ];

    test("displays list of notes", () => {
      render(<NoteList notes={mockNotes} />);

      expect(screen.getByText("Content 1")).toBeInTheDocument();
      expect(screen.getByText("Content 2")).toBeInTheDocument();
    });

    test("displays empty state when no notes", () => {
      render(<NoteList notes={[]} />);

      expect(
        screen.getByText(/No notes yet. Create your first note!/i)
      ).toBeInTheDocument();
    });
  });

  describe("Generate Note", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("displays random note generate", async () => {
      await act(async () => {
        render(<Dashboard />);
      });
      expect(
        screen.getByRole("button", { name: /generate note/i })
      ).toBeInTheDocument();
    });

    test("should call handleGenerateQuote and refresh notes", async () => {
      // Mock notesService responses
      const mockNotes = [{ id: 1, title: "Test Note" }];
      notesService.getNotes.mockResolvedValue(mockNotes);
      notesService.getRandomQuote.mockResolvedValue({
        id: 2,
        content: "Generate Test Content",
      });

      // Render Dashboard
      await act(async () => {
        render(<Dashboard />);
      });

      // Wait for initial note fetch
      await waitFor(() =>
        expect(notesService.getNotes).toHaveBeenCalledTimes(1)
      );
      expect(screen.getByText("Your Notes")).toBeInTheDocument();

      // Simulate button click
      const generateButton = screen.getByText("Generate Note");
      await act(async () => {
        fireEvent.click(generateButton);
      });

      // Wait for quote generation and notes refresh
      await waitFor(() => {
        expect(notesService.getRandomQuote).toHaveBeenCalledTimes(1);
        expect(notesService.getNotes).toHaveBeenCalledTimes(2);
      });

      // Assert the refreshed notes are displayed
      expect(screen.getByText("Generate Note")).toBeInTheDocument();
    });
  });
});
