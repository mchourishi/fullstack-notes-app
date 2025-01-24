import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Notes App
        </Typography>
        {user ? (
          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        ) : (
          <>
            <Button color="inherit" href="/login">
              Login
            </Button>
            <Button color="inherit" href="/signup">
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
