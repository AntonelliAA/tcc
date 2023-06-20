// pages/Inicio.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Inicio.scss';

const Inicio = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const id_usuario = localStorage.getItem("id_usuario")
        const response = await axios.get('http://localhost:3333/treinos',{
          data:{
            id_usuario
          }
        });
        console.log(response.data)
        setExercises(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExercises();
  }, []);

  return (
    <div className="inicio">
      <h1>Página de Início</h1>
      <div className={"divLista"}>

      <ul className={"exercises-list"}>
        {exercises.map((exercise) => (
          <li key={exercise.id} className={"lista"}>{exercise.nome}</li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default Inicio;
