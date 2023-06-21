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
        const response = await axios.get("http://localhost:3333/treinos", {
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
  localStorage.setItem("id_treino",id)
  navigate("/editar-treino")
  }

  

  return (
    
    <div className="inicio">
      <Link to="/login">Sair</Link>
      <h1>Página de Início</h1>
      <div className={"divLista"}>
        <ul className={"lista-exercicios"}>
          {exercicios.map((treino) => (
            <li key={treino.id_treino} className={"lista"}>
              {treino.nome}
              <button className="botaoLista" onClick={() => handleClick(treino.id_treino)}>Editar</button>

            </li>
          ))}
        </ul>
      </div>
      <Link to="/criar-treino" className="criar-treino-button">Criar Treino</Link>
    </div>
  );
};

export default Inicio;
