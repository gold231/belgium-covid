// moment js adaptor for mui
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';

// Pages
import Dashboard from "./pages/Dashboard";

// App Component
function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Dashboard />
    </LocalizationProvider>
    
  );
}

export default App;
