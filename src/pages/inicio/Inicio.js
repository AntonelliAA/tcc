import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Inicio.scss";
import { Link, useNavigate } from "react-router-dom";

const Inicio = () => {
  const [exercicios, setExercicios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExercicios = async () => {
      try {
        const id_usuario = localStorage.getItem("id_usuario");
        const response = await axios.get("https://tcc-qs1j.onrender.com/treinos", {
          params: {
            id_usuario: id_usuario,
          },
        });
        console.log(response.data);
        setExercicios(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExercicios();
  }, []);

  const handleClick = (id) => {
    localStorage.setItem("id_treino", id);
    navigate("/editar-treino");
  };

  return (
    <div className="inicio">
      <nav>
        <Link to="/conta">Conta</Link>
        <Link to="/temporizador">Timer</Link>
        <Link to="/login">Sair</Link>
      </nav>
      <h1>Página de Início</h1>
      <Link to="/criar-treino" className="criar-treino-button">
        Criar Treino
      </Link>
      <div className={"divLista"}>
        <ul className={"lista-exercicios"}>
          {exercicios.map((treino) => (
            <li key={treino.id_treino} className={"lista"}>
              {treino.nome}
              <button
                className="botaoLista"
                onClick={() => handleClick(treino.id_treino)}
              >
                Editar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Inicio;
