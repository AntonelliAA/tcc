import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import Login from './pages/Login';
import Inicio from './pages/inicio/Inicio';
import './App.css'

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
