import React, { useState, useEffect } from "react";
import "./Temporizador.scss";
import { Link } from "react-router-dom";


const Temporizador = () => {
  const [horas, setHoras] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [iniciado, setIniciado] = useState(false);

  useEffect(() => {
    let intervalId;

    if (iniciado) {
      intervalId = setInterval(() => {
        if (segundos === 0) {
          if (minutos === 0) {
            if (horas === 0) {
              setIniciado(false);
              clearInterval(intervalId);
              return;
            }
            setHoras((prevHoras) => prevHoras - 1);
            setMinutos(59);
          } else {
            setMinutos((prevMinutos) => prevMinutos - 1);
          }
          setSegundos(59);
        } else {
          setSegundos((prevSegundos) => prevSegundos - 1);
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [iniciado, segundos, minutos, horas]);

  const iniciarTemporizador = () => {
    setIniciado(true);
  };

  const pausarTemporizador = () => {
    setIniciado(false);
  };

  const zerarTemporizador = () => {
    setHoras(0);
    setMinutos(0);
    setSegundos(0);
    setIniciado(false);
  };

  const handleChangeHoras = (e) => {
    setHoras(parseInt(e.target.value, 10));
  };

  const handleChangeMinutos = (e) => {
    setMinutos(parseInt(e.target.value, 10));
  };

  const handleChangeSegundos = (e) => {
    setSegundos(parseInt(e.target.value, 10));
  };

  return (
    <div className="temporizador">
      <h1>Temporizador</h1>
      {!iniciado && (
        <div className="temporizador-inputs">
          <div className="temporizador-input">
            <label htmlFor="horas">Horas:</label>
            <input
              type="number"
              id="horas"
              value={horas}
              onChange={handleChangeHoras}
            />
          </div>
          <div className="temporizador-input">
            <label htmlFor="minutos">Minutos:</label>
            <input
              type="number"
              id="minutos"
              value={minutos}
              onChange={handleChangeMinutos}
            />
          </div>
          <div className="temporizador-input">
            <label htmlFor="segundos">Segundos:</label>
            <input
              type="number"
              id="segundos"
              value={segundos}
              onChange={handleChangeSegundos}
            />
          </div>
        </div>
      )}
      <div className="temporizador-display">
        <div className="temporizador-field">
          <span className="temporizador-label">Horas</span>
          <span className="temporizador-value">{horas}</span>
        </div>
        <div className="temporizador-field">
          <span className="temporizador-label">Minutos</span>
          <span className="temporizador-value">{minutos}</span>
        </div>
        <div className="temporizador-field">
          <span className="temporizador-label">Segundos</span>
          <span className="temporizador-value">{segundos}</span>
        </div>
      </div>
      <div className="temporizador-buttons">
        {!iniciado ? (
          <button className="temporizador-button" onClick={iniciarTemporizador}>
            Iniciar
          </button>
        ) : (
          <button className="temporizador-button" onClick={pausarTemporizador}>
            Pausar
          </button>
        )}
        <button className="temporizador-button" onClick={zerarTemporizador}>
          Zerar
        </button>
      </div>
      <Link to={"/inicio"}>Voltar</Link>
    </div>
  );
};

export default Temporizador;
