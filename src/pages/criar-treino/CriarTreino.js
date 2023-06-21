import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CriarTreino.scss";

const CriarTreino = () => {
  const [nomeTreino, setNomeTreino] = useState("");

  const handleNomeTreinoChange = (event) => {
    setNomeTreino(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const id_usuario = localStorage.getItem("id_usuario");

      if (!nomeTreino || !id_usuario) {
        console.log("Erro ao criar treino!");
        return;
      }

      const data = {
        nome: nomeTreino,
        id_usuario: Number(id_usuario),
      };

      const response = await axios.post("http://localhost:3333/treinos", data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    setNomeTreino("");
  };

  return (
    <div className="divTreino">
      <Link to="/login">Sair</Link>
      <h1>Criar Treino</h1>
      <form onSubmit={handleSubmit} className="formTreino">
        <label htmlFor="nomeTreino">Nome do Treino:</label>
        <input
          type="text"
          id="nomeTreino"
          value={nomeTreino}
          onChange={handleNomeTreinoChange}
        />
        <button type="submit">Criar</button>
      </form>
      <Link to="/inicio">Voltar para página inicial</Link>
    </div>
  );
};

export default CriarTreino;
