import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import RegistreationForm from "./Components/RegistreationForm";
// import TimeSlots from "./Components/timeSlots";
import Home from './Home';

function App() {
  return (
    <div className="App">
      <h1>Swimming Pool & Gym Allocation Tool</h1>
      <BrowserRouter>
        <Routes>
            <Route path='' />
        </Routes>
      </BrowserRouter>
      <Home />

    </div>
  );
}

export default App;
