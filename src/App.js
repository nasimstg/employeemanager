import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { EmployeeProvider } from './context/EmployeeContext';
import Navbar from './components/Nav';
import Home from './pages/Home';
import Fav from './pages/Fav';
import Emp from './pages/Emp';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <EmployeeProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fav" element={<Fav />} />
          <Route path="/employee" element={<Emp />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </EmployeeProvider>
    </Router>
  );
}

export default App;