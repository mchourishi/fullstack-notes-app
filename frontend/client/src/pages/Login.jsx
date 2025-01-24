// src/pages/Login.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Link as MuiLink,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { LoginForm } from "../components/auth/LoginForm";
import { useAuth } from "../context/AuthContext";

export const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        {location.state?.message && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {location.state.message}
          </Alert>
        )}
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <LoginForm />
        <Typography align="center" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <MuiLink component={Link} to="/signup">
            Sign up
          </MuiLink>
        </Typography>
      </Paper>
    </Container>
  );
};
