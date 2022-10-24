import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// import RegistreationForm from "./Components/RegistreationForm";
// import TimeSlots from "./Components/timeSlots";
import Home from './Home';
import Admin from './Admin';


function App() {
  return (
    <div className="App">
      <h1>Swimming Pool & Gym Allocation Tool</h1>
      <BrowserRouter>
        <Routes>
            <Route path='/home' element={<Home />}/>
            <Route path='/admin' element={<Admin />}/>
        </Routes>
      </BrowserRouter>
      {/* <Home /> */}

    </div>
  );
}

export default App;
