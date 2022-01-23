import Home from './components/Home';
import { AppContextProvider } from './components/utils/context';

function App() {
  return (
      <AppContextProvider>
        <Home />
      </AppContextProvider>
  );
}

export default App;
