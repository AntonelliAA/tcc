import React, { useState, useEffect } from "react";
import axios from "axios";

import "./EditarTreino.scss";
import { Link, useNavigate } from "react-router-dom";

const EditarTreino = () => {
  const [nomeTreino, setNomeTreino] = useState("");
  const id_treino = localStorage.getItem("id_treino");
  const id_usuario = localStorage.getItem("id_usuario");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTreino = async () => {
      try {
        const response = await axios.get(
          `https://tcc-qs1j.onrender.com/treinos?id_usuario=${id_usuario}`
        );

        const treinosDoUsuario = response.data.filter(
          (treino) => treino.id_treino === Number(id_treino)
        );

        setNomeTreino(treinosDoUsuario[0].nome);
      } catch (error) {
        console.log("Erro ao buscar o treino:", error);
      }
    };

    fetchTreino();
  }, [id_treino, id_usuario]);

  const handleNomeTreinoChange = (event) => {
    setNomeTreino(event.target.value);
  };
  

  const handleEditar = async () =>{
    const data = {
      id_treino: Number(id_treino),
      nome: nomeTreino
    }
    try {
      console.log(data)
      await axios.put("https://tcc-qs1j.onrender.com/treinos", data);
      console.log("Dados do exercício atualizados com sucesso!");
      navigate("/inicio")
    } catch (error) {
      console.log("Erro ao atualizar os dados do treino:", error);
    }
  }

  const handleDeleteTreino = async () => {
    try {
      await axios.delete(
        `https://tcc-qs1j.onrender.com/treinos?id_treino=${id_treino}`
      );
      console.log("Treino excluído!");
      navigate("/inicio");
    } catch (error) {
      console.log("Erro ao excluir o treino:", error);
    }
  };

  return (
    <div className="editar-treino">
      <h1>Editar Treino</h1>
      <form>
        <label htmlFor="id">ID do treino:</label>
        <input type="number" id="id" value={id_treino} disabled />
        <label htmlFor="nomeTreino">Nome do Treino:</label>
        <input
          type="text"
          id="nomeTreino"
          value={nomeTreino}
          onChange={handleNomeTreinoChange}
        />
      </form>
      <Link to="/editar-treino">Voltar</Link>
      <div className={"buttons"}>
        <button onClick={handleEditar} style={{backgroundColor: "#007bff", color: "#fff"}}>Salvar treino</button>

        <button style={{backgroundColor: "red", color: "#fff"}} onClick={handleDeleteTreino} >Deletar Treino</button>
      </div>
    </div>
  );
};

export default EditarTreino;
