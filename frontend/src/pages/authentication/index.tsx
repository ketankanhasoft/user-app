import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Grid,
  Snackbar,
} from "@mui/material";
import { loginUserThunk } from "../../store/thunk/authThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useAppDispatch();

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};
    if (username.trim() === "") {
      errors.username = "Username is required";
    }
    if (password.trim() === "") {
      errors.password = "Password is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      // Here you can implement your login logic
      console.log("Username:");
      console.log("Password:");

      dispatch(
        loginUserThunk({
          payload: {
            email: username,
            password: password,
          },
        })
      );
    }
  };

  return (
    <Container maxWidth="xs">
      <div style={{ marginTop: "100px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={!!errors.username}
                helperText={errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
