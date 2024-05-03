import { createSlice } from "@reduxjs/toolkit";
interface InitialState {
  userList: any;
}

const initialState: InitialState = {
  userList: {},
};
const userNotificationSlice = createSlice({
  name: "userNotificationSlice",
  initialState,
  reducers: {
    userList: (state: any, { payload }) => {
      state.userNotifications = { ...state, userList: payload };
    },
  },
});

export default userNotificationSlice.reducer;
export const { userList } = userNotificationSlice.actions;
