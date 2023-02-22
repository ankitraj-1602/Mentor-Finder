
import './App.css';
import { Navbar } from './components/Navbar';
import { Homescreen } from './screens/Homescreen';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom"
import axios from "axios"
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { BookingScreen } from './screens/BookingScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AdminScreen } from './screens/AdminScreen';
import { LandingScreen } from './screens/LandingScreen';
// import { Moment } from './components/Moment';

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/home" element={<Homescreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/book/:mentorid/:fromdate/:todate" element={<BookingScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/admin" element={<AdminScreen />} />
          {/* <Route path="/moment" element={<Moment />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
