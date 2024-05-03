import { createSlice } from "@reduxjs/toolkit";
interface InitialState {
  userNotifications: any;
  userData: any;
}

const initialState: InitialState = {
  userNotifications: {},
  userData: {
    token: localStorage.getItem("userToken"),
  },
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuthUser: (state: any, { payload }) => ({
      ...state,
      userData: payload,
    }),
  },
});

export default authSlice.reducer;
export const { setAuthUser } = authSlice.actions;
