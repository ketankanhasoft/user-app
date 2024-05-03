import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config"
import { addNotification } from "../slices/userNotificationSlice";

export const loginUserThunk = createAsyncThunk(
  "login",
  async (_request: any, { dispatch }) => {
    try {
      axios
        .post(`${config.url}api/login`, _request.payload)
        .then((response:any) => {
          dispatch(addNotification({message:"User logged successfully"}))
        })
        .catch((error:any) => {
          dispatch(addNotification({message:"Error while trying to login, Please check your credentials."}))
        });
    } catch (error) {}
  }
);


