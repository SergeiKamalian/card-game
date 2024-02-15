import './libs/ui/globals.css'
import { Routes, Theme, UserProvider, AppProvider, TimerProvider } from './libs';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Theme>
        <AppProvider>
          <UserProvider>
            {/* <TimerProvider> */}
              <div className="App">
                <Routes />
              </div>
            {/* </TimerProvider> */}
          </UserProvider>
        </AppProvider>
      </Theme>
    </BrowserRouter>
  );
}

export default App;
