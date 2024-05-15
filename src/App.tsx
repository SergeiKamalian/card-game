import "./libs/ui/globals.css";
import {
  Routes,
  Theme,
  UserProvider,
  AppProvider,
  Loading,
  AppLoadingProvider,
  Background,
  Notification,
} from "./libs";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FriendsProvider } from "./libs/contexts/Friends";

function App() {
  return (
    <BrowserRouter>
      <Theme>
        <AppProvider>
          <AppLoadingProvider>
            <UserProvider>
              <FriendsProvider>
                <div className="App">
                  <div
                    style={{
                      zIndex: 10,
                      position: "relative",
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Loading />
                    <Routes />
                  </div>
                  <Background />
                  <Notification />
                </div>
                <ToastContainer />
              </FriendsProvider>
            </UserProvider>
          </AppLoadingProvider>
        </AppProvider>
      </Theme>
    </BrowserRouter>
  );
}

export default App;
