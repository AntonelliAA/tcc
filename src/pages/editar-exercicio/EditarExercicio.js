import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./EditarExercicio.scss";

const EditarExercicio = () => {
  const [exercicio, setExercicio] = useState({
    id_exercicio: 0,
    nome: "",
    series: "",
    repeticoes: "",
    carga: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id_usuario = Number(localStorage.getItem("id_usuario"));
        const id_exercicio = Number(localStorage.getItem("id_exercicio"));
        const response = await axios.get(
          `https://tcc-qs1j.onrender.com/exercicios/editar?id_usuario=${id_usuario}&id_exercicio=${id_exercicio}`
        );
        let { nome, series, repeticoes, carga } = response.data;

        carga = Number(carga);

        setExercicio({ id_exercicio, nome, series, repeticoes, carga });
      } catch (error) {
        console.log("Erro ao buscar os dados do exercício:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue =
      name === "nome" ? value : value === "" ? "" : Number(value);
    setExercicio((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(exercicio);
      await axios.put("https://tcc-qs1j.onrender.com/exercicios", exercicio);
      console.log("Dados do exercício atualizados com sucesso!");
      navigate("/editar-treino");
    } catch (error) {
      console.log("Erro ao atualizar os dados do exercício:", error);
    }
  };

  const handleDelete = async () => {
    try {
      console.log(exercicio);
      await axios.delete(
        `https://tcc-qs1j.onrender.com/exercicios?id_exercicio=${exercicio.id_exercicio}`
      );
      console.log("Exercício excluído!");
      navigate("/editar-treino");
    } catch (error) {
      console.log("Erro ao excluir o exercício:", error);
    }
  };

  return (
    <div className="editar-exercicio">
      <h1>Editar Exercício</h1>
      <form onSubmit={handleSubmit}>
        <label>
          ID Exercício:
          <input
            type="number"
            name="id"
            value={exercicio.id_exercicio}
            disabled
          />
        </label>
        <label>
          Nome:
          <input
            type="nome"
            name="nome"
            value={exercicio.nome}
            onChange={handleChange}
          />
        </label>
        <label>
          Series:
          <input
            type="number"
            name="series"
            value={exercicio.series}
            onChange={handleChange}
          />
        </label>
        <label>
          Repetições:
          <input
            type="number"
            name="repeticoes"
            value={exercicio.repeticoes}
            onChange={handleChange}
          />
        </label>
        <label>
          Carga:
          <input
            type="number"
            name="carga"
            value={exercicio.carga}
            onChange={handleChange}
          />
        </label>

        <div className={"buttons"}>
          <button
            style={{ backgroundColor: "#007bff", color: "#fff" }}
            type="submit"
          >
            Salvar
          </button>
          <button
            style={{ backgroundColor: "red", color: "#fff" }}
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
          >
            Excluir
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarExercicio;
