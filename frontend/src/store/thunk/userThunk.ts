import { createAsyncThunk } from "@reduxjs/toolkit";
import { addNotification } from "../slices/userNotificationSlice";
import config from "../../config/config";
import axios from "axios";
import { setUserList } from "../slices/usersSlice";

export const getUserThunk = createAsyncThunk(
  "get",
  async (_request: any, { dispatch }) => {
    try {
      axios
        .get(`${config.url}api/users/`, {
          headers: {
            Authorization: "Bearer " + _request?.token,
          },
        })
        .then((response: any) => {
          dispatch(setUserList(response.data));
        })
        .catch((error: any) => {
          dispatch(
            addNotification({
              message: "Error while trying getting users.",
            })
          );
        });
    } catch (error) {}
  }
);

export const updateUserThunk = createAsyncThunk(
  "udpate",
  async (_request: any, { dispatch }) => {
    try {
      axios
        .put(
          `${config.url}api/users/${_request.payload.id}`,
          _request.payload,
          {
            headers: {
              Authorization: "Bearer " + _request?.token,
            },
          }
        )
        .then((response: any) => {
          dispatch(
            addNotification({
              message: "User udpated successfully",
            })
          );
          dispatch(getUserThunk({ token: _request.token }));
        })
        .catch((error: any) => {
          dispatch(
            addNotification({
              message: "Error while trying update a new user.",
            })
          );
        });
    } catch (error) {}
  }
);

export const deleteUserThunk = createAsyncThunk(
  "delete",
  async (_request: any, { dispatch }) => {
    try {
      axios
        .delete(`${config.url}api/users/${_request.payload.id}`, {
          headers: {
            Authorization: "Bearer " + _request?.token,
          },
        })
        .then((response: any) => {
          dispatch(
            addNotification({
              message: "User deleted successfully",
            })
          );
          dispatch(getUserThunk({ token: _request.token }));
        })
        .catch((error: any) => {
          dispatch(
            addNotification({
              message: "Error while trying delete a new user.",
            })
          );
        });
    } catch (error) {}
  }
);

export const addUserThunk = createAsyncThunk(
  "add",
  async (_request: any, { dispatch }) => {
    try {
      axios
        .post(`${config.url}api/users`, _request.payload, {
          headers: {
            Authorization: "Bearer " + _request?.token,
          },
        })
        .then((response: any) => {
          dispatch(
            addNotification({
              message: "User Created successfully",
            })
          );
          dispatch(getUserThunk({ token: _request.token }));
        })
        .catch((error: any) => {
          dispatch(
            addNotification({
              message: "Error while trying create a new user.",
            })
          );
        });
    } catch (error) {}
  }
);
