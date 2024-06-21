import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import { EmployeeProvider } from './context/EmployeeContext';
import Navbar from './components/Nav';
import Fav from './pages/Fav';
import Emp from './pages/Emp';

function App() {
  return (
    <Router>
      <EmployeeProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fav" element={<Fav />} />
          <Route path="/employee" element={<Emp />} />
        </Routes>
      </EmployeeProvider>
    </Router>
  );
}

export default App;