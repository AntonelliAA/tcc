import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Conta.scss";
import { useNavigate } from "react-router-dom";

const Conta = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const idUsuario = localStorage.getItem("id_usuario");
        const response = await axios.get(
          `https://tcc-qs1j.onrender.com/conta?id_usuario=${idUsuario}`
        );
        const { nome, email, idade, altura, peso } = response.data;
        setNome(nome);
        setEmail(email);
        setIdade(idade);
        setAltura(altura);
        setPeso(peso);
      } catch (error) {
        console.log("Erro ao buscar os dados do usuário:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleIdadeChange = (event) => {
    setIdade(event.target.value);
  };

  const handleAlturaChange = (event) => {
    setAltura(event.target.value);
  };

  const handlePesoChange = (event) => {
    setPeso(event.target.value);
  };

  const handleSalvarClick = async () => {
    const id_usuario = localStorage.getItem("id_usuario");
    const data = {
      id_usuario: Number(id_usuario),
      nome: nome,
      email: email,
      idade: Number(idade),
      altura: Number(altura),
      peso: Number(peso),
    };

    try {
      await axios.put(`https://tcc-qs1j.onrender.com/conta`, data);
      console.log("Dados do usuário atualizados com sucesso!");
      navigate("/inicio")
    } catch (error) {
      console.log("Erro ao atualizar os dados do usuário:", error);
    }
  };

  const handleVoltarClick = () => {
    navigate("/inicio");
  };

  return (
    <div className="conta">
      <h1>Conta</h1>
      <form>
        <label htmlFor="nome">Nome:</label>
        <input type="text" id="nome" value={nome} onChange={handleNomeChange} />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />

        <label htmlFor="idade">Idade:</label>
        <input
          type="number"
          id="idade"
          value={idade}
          onChange={handleIdadeChange}
        />

        <label htmlFor="altura">Altura:</label>
        <input
          type="number"
          id="altura"
          value={altura}
          onChange={handleAlturaChange}
        />

        <label htmlFor="peso">Peso:</label>
        <input
          type="number"
          id="peso"
          value={peso}
          onChange={handlePesoChange}
        />
      </form>
      <div className="buttons">
        <button style={{backgroundColor: "#007bff"}} onClick={handleSalvarClick}>Salvar</button>
        <button style={{backgroundColor: "red"}} onClick={handleVoltarClick}>Voltar</button>
      </div>
    </div>
  );
};

export default Conta;
