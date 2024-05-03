import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
export default function Layout() {

  return (
    <Box sx={{ display: "flex" }}>    
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>       
        <Outlet/>
      </Box>
    </Box>
  );
}
