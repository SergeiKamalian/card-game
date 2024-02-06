import './libs/ui/globals.css'
import { Routes, Theme, UserProvider, } from './libs';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
    <BrowserRouter>
      <Theme>
        <UserProvider>
          <div className="App">
            <Routes />
          </div>
        </UserProvider>
      </Theme>
    </BrowserRouter>
  );
}

export default App;
