import { createSlice } from "@reduxjs/toolkit";
interface InitialState {
  userNotifications: any;  
  userData: any;
}

const initialState:InitialState={
  userNotifications:{},
  userData:{}
}
const userNotificationSlice = createSlice({
  name: 'userNotificationSlice',
  initialState,
  reducers: {  
    setAuthUser:(state:any,{payload})=>{
      state.userData={...state.userData,userData:payload}
    },
  },
});

export default userNotificationSlice.reducer;
export const { setAuthUser } = userNotificationSlice.actions;
