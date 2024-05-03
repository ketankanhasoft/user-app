import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config/config";
import { addNotification } from "../slices/userNotificationSlice";
import { setAuthUser } from "../slices/authSlice";
export const loginUserThunk = createAsyncThunk(
	"login",
	async (_request: any, { dispatch }) => {
		try {
			return axios
				.post(`${config.url}api/login`, _request.payload)
				.then((response: any) => {
					localStorage.setItem(
						"userToken",
						response?.data?.data?.token
					);
					dispatch(
						addNotification({ message: "User logged successfully" })
					);
					dispatch(
						setAuthUser({ token: response?.data?.data?.token })
					);
				})
				.catch((error: any) => {
					dispatch(
						addNotification({
							message:
								"Error while trying to login, Please check your credentials.",
						})
					);
				});
		} catch (error) {}
	}
);
