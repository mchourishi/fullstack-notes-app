import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

export const NoteCard = ({ note }) => {
  const { content, created_at } = note;

  return (
    <Card>
      <CardContent>
        <Typography variant="body1">{content}</Typography>
        {created_at && (
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mt: 1, display: "block" }}
          >
            {new Date(created_at).toDateString()}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
