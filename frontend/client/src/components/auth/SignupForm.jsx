import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, FormHelperText } from "@mui/material";
import * as authService from "../../services/auth.service";

export const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await authService.signup(formData);
        navigate("/login", {
          state: { successMessage: "Successfully signed up, please login." },
        });
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setErrors({
            submit: "User already exists. Please use a different email.",
          });
        } else {
          setErrors({ submit: "An error occurred. Please try again later." });
        }
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
      <TextField
        fullWidth
        label="Username"
        name="username"
        id="username"
        margin="normal"
        required
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        error={!!errors.username}
        helperText={errors.username}
      />
      <TextField
        fullWidth
        label="Email"
        id="email"
        name="email"
        type="email"
        margin="normal"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        error={!!errors.password}
        helperText={errors.password}
      />
      {errors.submit && <FormHelperText error>{errors.submit}</FormHelperText>}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
        Sign Up
      </Button>
    </Box>
  );
};
