import Box from "@mui/material/Box";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../store/store";
export default function Layout() {
  let userToken = useAppSelector(
    (state) => state.authSlice.userData.token
  );
  return (
    <Box sx={{ display: "flex" }}>    
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>       
      {userToken? <Navigate to='/users'/> : <Outlet/>}
      </Box>
    </Box>
  );
}
