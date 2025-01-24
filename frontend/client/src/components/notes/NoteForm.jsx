import { useState } from "react";
import { TextField, Button, Box, Alert } from "@mui/material";
import * as notesService from "../../services/notes.service";

export const NoteForm = ({ refreshNotes }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await notesService.createNote({ content });
      setContent("");
      setSuccess("Note created successfully!");
      setTimeout(() => setSuccess(""), 3000);
      // Refresh the note list
      refreshNotes();
    } catch (error) {
      console.error("Failed to create note:", error);
      setError("Failed to create note");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <TextField
        fullWidth
        multiline
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        label="New Note"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" disabled={!content.trim()}>
        Create Note
      </Button>
    </Box>
  );
};
