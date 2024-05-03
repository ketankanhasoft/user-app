import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import MySnackbar from "../../components/snackbar";
import { addUserThunk, updateUserThunk } from "../../store/thunk/userThunk";
import { useAppDispatch, useAppSelector } from "../../store/store";

interface FormData {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  role: string;
  mobile: string;
  date_of_birth: string;
  password: string;
}

interface Errors {
  first_name: string;
  email: string;
  username: string;
  password: string;
}

interface Props {
  data: any;
  handleCloseDialog: Function;
}

const RegistrationForm: React.FC<Props> = ({ data, handleCloseDialog }) => {
  const dispatch = useAppDispatch();
  let userToken = useAppSelector((state) => state.authSlice.userData.token);
  const [formData, setFormData] = useState<FormData>(
    data?.id
      ? data
      : {
          id: null,
          first_name: "",
          last_name: "",
          email: "",
          username: "",
          role: "",
          mobile: "",
          date_of_birth: "",
          password: "",
        }
  );

  const [errors, setErrors] = useState<Errors>({
    first_name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (formData?.id) {
        dispatch(
          updateUserThunk({
            token: userToken,
            payload: formData,
          })
        );
      } else {
        dispatch(
          addUserThunk({
            token: userToken,
            payload: formData,
          })
        );
      }
      handleCloseDialog();
    }
  };

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: any = {};

    // Validation rules
    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!isValidEmail(formData.email.trim())) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      valid = false;
    }

    if (!data?.id && !formData.password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const isValidEmail = (email: string): boolean => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            error={!!errors.first_name}
            helperText={errors.first_name}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            label="Mobile"
            name="mobile"
            type="number"
            value={formData.mobile}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sm={12} md={6}>
          <TextField
            fullWidth
            label="Date of Birth"
            name="date_of_birth"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.date_of_birth}
            onChange={handleChange}
          />
        </Grid>
        {!data?.id && (
          <Grid item sm={12} md={6}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
        )}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegistrationForm;
