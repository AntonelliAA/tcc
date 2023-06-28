import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Inicio from "./pages/inicio/Inicio";
import "./App.css";

import EditarTreinos from "./pages/Editar-treino/EditarTreinos";
import EditarExercicio from "./pages/editar-exercicio/EditarExercicio";
import CriarTreino from "./pages/criar-treino/CriarTreino";
import EditarTreino from "./pages/treino/EditarTreino";
import Conta from "./pages/Conta/Conta";
import Temporizador from "./pages/temporizador/Temporizador";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/criar-treino" element={<CriarTreino />} />
          <Route path="/editar-treino" element={<EditarTreinos />} />
          <Route path="/editar-exercicio" element={<EditarExercicio />} />
          <Route path="/editar-treinos" element={<EditarTreino />} />
          <Route path="/conta" element={<Conta />} />
          <Route path="/temporizador" element={<Temporizador />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
