import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditarTreinos.scss";
import { Link } from "react-router-dom";

const EditarTreinos = () => {
  const [idTreino, setidTreino] = useState("");
  const [nomeTreino, setNomeTreino] = useState("");
  const [exercicios, setExercicios] = useState([]);
  const [series, setSeries] = useState("");
  const [repeticoes, setRepeticoes] = useState("");
  const [cargas, setCargas] = useState("");
  const [recarregar, setRecarregar] = useState(0);

  useEffect(() => {
    const idTreino = localStorage.getItem("id_treino");
    const idUsuario = localStorage.getItem("id_usuario");
    if (idTreino && idUsuario) {
      setidTreino(idTreino);
      fetchTreino(idTreino, idUsuario);
    }
  }, [recarregar]);

  const fetchTreino = async (idTreino, idUsuario) => {
    const params = {
      id_treino: idTreino,
      id_usuario: idUsuario,
    };

    try {
      const response = await axios.get(`http://localhost:3333/exercicios`, {
        params,
      });

      console.log(response.data);

      setExercicios(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const idTreino = localStorage.getItem("id_treino");
    const idUsuario = localStorage.getItem("id_usuario");

    const data = {
      series: Number(series),
      repeticoes: Number(repeticoes),
      carga: Number(cargas),
      nome: nomeTreino,
      id_usuario: Number(idUsuario),
      id_treino: Number(idTreino),
    };

    console.log(data);

    try {
      const response = await axios.post(
        `http://localhost:3333/exercicios`,
        data
      );

      console.log(response.data);

      setExercicios([...exercicios, response.data]);
    } catch (error) {
      console.error(error);
    }

    setRecarregar(recarregar + 1);
  };

  return (
    <div className={"divExercicios"}>
      <Link to="/login">Sair</Link>
      <h1>Editar Treinos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="idTreino">ID do Treino:</label>
          <input type="text" id="idTreino" value={idTreino} readOnly />
        </div>
        <div>
          <label htmlFor="nomeExercicio">Nome do Exercicio:</label>
          <input
            type="text"
            id="nomeExercicio"
            value={nomeTreino}
            onChange={(event) => setNomeTreino(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="series">Número de séries:</label>
          <input
            type="number"
            id="series"
            value={series}
            onChange={(event) => setSeries(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="repeticoes">Número de repetições:</label>
          <input
            type="number"
            id="repeticoes"
            value={repeticoes}
            onChange={(event) => setRepeticoes(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cargas">Cargas:</label>
          <input
            type="number"
            id="cargas"
            value={cargas}
            onChange={(event) => setCargas(event.target.value)}
          />
        </div>
        <div className={"listaExercicios"}>
          Lista de exercícios
          <ul>
            {exercicios.map((exercicio) => {
              return (
                <li key={exercicio.id_exercicio}>
                  Nome: {exercicio.nome}
                  <br />
                  Series: {exercicio.series}
                  <br />
                  Repetições: {exercicio.repeticoes}
                  <br />
                  Carga: {exercicio.carga}
                </li>
              );
            })}
          </ul>
        </div>

        <button type="submit">Salvar</button>
      </form>
      <Link to="/inicio">Voltar</Link>
    </div>
  );
};

export default EditarTreinos;
