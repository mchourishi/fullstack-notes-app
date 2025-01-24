import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import { NoteCard } from "./NoteCard";

export const NoteList = ({ notes, loading, error }) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" my={4}>
        {error}
      </Typography>
    );
  }

  if (!notes.length) {
    return (
      <Typography align="center" my={4}>
        No notes yet. Create your first note!
      </Typography>
    );
  }

  // Sort notes in descending order of creation time
  const sortedNotes = [...notes].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  return (
    <Grid container spacing={3}>
      {sortedNotes.map((note) => (
        <Grid item xs={12} sm={6} md={4} key={note._id || note.id}>
          <NoteCard note={note} />
        </Grid>
      ))}
    </Grid>
  );
};
