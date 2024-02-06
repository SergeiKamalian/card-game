import './libs/ui/globals.css'
import { Routes, Theme, UserProvider, AppProvider } from './libs';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Theme>
        <AppProvider>
          <UserProvider>
              <div className="App">
                <Routes />
              </div>
          </UserProvider>
        </AppProvider>
      </Theme>
    </BrowserRouter>
  );
}

export default App;
