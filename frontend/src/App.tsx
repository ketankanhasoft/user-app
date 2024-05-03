import React from "react";
import "./App.css";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import ThemeProviderComponent from "./theme/themeProvider";
import MySnackbar from "./components/snackbar";
import store from "./store/store";
import { Provider as ReduxProvider } from "react-redux";

function App() {
  return (
    <div className="App">
      <ReduxProvider store={store}>
        <ThemeProviderComponent>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
          <MySnackbar />
        </ThemeProviderComponent>
      </ReduxProvider>
    </div>
  );
}

export default App;
