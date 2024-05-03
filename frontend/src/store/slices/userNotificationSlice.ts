import { createSlice } from "@reduxjs/toolkit";
interface InitialState {
  userNotifications: any;
}

const initialState: InitialState = {
  userNotifications: {},
};
const userNotificationSlice = createSlice({
  name: "userNotificationSlice",
  initialState,
  reducers: {
    addNotification: (state: any, { payload }) => {
      state.userNotifications = { ...payload };
    },
    clearNotification: (state: any) => {
      state.userNotifications = {};
    },
  },
});

export default userNotificationSlice.reducer;
export const { addNotification, clearNotification } =
  userNotificationSlice.actions;
