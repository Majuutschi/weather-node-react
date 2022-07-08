import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Weather from './views/Weather';
import Favorites from './views/Favorites';


const App = () => {

  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path='/' element={<Weather />} />
          <Route path='/favorites' element={<Favorites />} />
        </Routes>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App