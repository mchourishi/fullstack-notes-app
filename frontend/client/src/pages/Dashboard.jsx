import { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { NoteForm } from "../components/notes/NoteForm";
import { NoteList } from "../components/notes/NoteList";
import * as notesService from "../services/notes.service";

export const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await notesService.getNotes();
      setNotes(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Failed to fetch notes:", error);
      setError("Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateQuote = async () => {
    try {
      setLoading(true);
      await notesService.getRandomQuote();
      fetchNotes();
    } catch (error) {
      console.error("Failed to generate quote:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Notes
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleGenerateQuote}
          sx={{ mb: 2 }}
        >
          Generate Note
        </Button>
      </Box>

      <NoteForm refreshNotes={fetchNotes} />
      <NoteList notes={notes} loading={loading} error={error} />
    </Container>
  );
};
