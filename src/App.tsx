import "./libs/ui/globals.css";
import {
  Routes,
  Theme,
  UserProvider,
  AppProvider,
  Loading,
  AppLoadingProvider,
} from "./libs";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <Theme>
        <AppProvider>
          <AppLoadingProvider>
            <UserProvider>
              {/* <TimerProvider> */}
              <div className="App">
                <Loading />
                <Routes />
              </div>
              <ToastContainer />
              {/* </TimerProvider> */}
            </UserProvider>
          </AppLoadingProvider>
        </AppProvider>
      </Theme>
    </BrowserRouter>
  );
}

export default App;
