import { Container, Paper, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { SignupForm } from "../components/auth/SignupForm";

export const Signup = () => {
  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Account
        </Typography>
        <SignupForm />
        <Typography align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <MuiLink component={Link} to="/login">
            Login
          </MuiLink>
        </Typography>
      </Paper>
    </Container>
  );
};
