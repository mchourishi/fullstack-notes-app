import { useState } from "react";
import { TextField, Button, Box, FormHelperText } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import * as authService from "../../services/auth.service";
import { useLocation } from "react-router-dom";

export const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const location = useLocation();
  const { login } = useAuth();

  const validateForm = () => {
    const newErrors = {};

    if (!credentials.username) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(credentials.username)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!credentials.password) {
      newErrors.password = "Password is required";
    } else if (credentials.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const { access_token } = await authService.login(credentials);
        login(access_token);
      } catch (error) {
        if (error.response && error.response.status !== 500) {
          setErrors({
            submit: "Invalid Credentials.",
          });
        } else {
          setErrors({ submit: "An error occurred. Please try again later." });
        }
      }
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      {location.state?.successMessage && (
        <FormHelperText sx={{ color: "green", mb: 2 }}>
          {location.state.successMessage}
        </FormHelperText>
      )}
      <TextField
        fullWidth
        label="Email"
        id="email"
        name="email"
        type="email"
        required
        margin="normal"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        fullWidth
        label="Password"
        name="password"
        id="password"
        type="password"
        margin="normal"
        required
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        error={!!errors.password}
        helperText={errors.password}
      />
      {errors.submit && <FormHelperText error>{errors.submit}</FormHelperText>}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Login
      </Button>
    </Box>
  );
};
