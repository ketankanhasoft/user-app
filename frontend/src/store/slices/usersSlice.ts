import { createSlice } from "@reduxjs/toolkit";
interface InitialState {
  userList: any;
}

const initialState: InitialState = {
  userList: [],
};
const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserList: (state: any, { payload }) => ({ ...state, userList: payload }),
  },
});

export default userSlice.reducer;
export const { setUserList } = userSlice.actions;
