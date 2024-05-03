import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

function ThemeProviderComponent({ children }: any) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default ThemeProviderComponent;
