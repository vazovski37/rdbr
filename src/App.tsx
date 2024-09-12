import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage'; // Import your HomePage component
import HouseDetails from './pages/HouseDetails'; // Import the component for displaying individual house details
import AddHouse from './pages/AddHouse'; // Import the component for adding a new house
import RDBRIcon from './assets/icons/RDBRIcon'
import Header from './components/header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/house/:id" element={<HouseDetails />} />
        <Route path="/add-house" element={<AddHouse />} />
      </Routes>
    </Router>
  );
};

export default App;
