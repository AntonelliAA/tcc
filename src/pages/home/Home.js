import React, { useState } from 'react';
import axios from 'axios';
import './Home.scss'
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState(0);
  const [altura, setAltura] = useState(0);
  const [peso, setPeso] = useState(0);
  const [senha, setSenha] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      nome: nome,
      email: email,
      idade: Number(idade),
      altura: Number(altura),
      peso: Number(peso),
      senha: senha
    };
  
    try {
      const response = await axios.post('https://tcc-qs1j.onrender.com/cadastro', data);
      console.log('Resposta da API:', response.data);
      localStorage.setItem("id_usuario", response.data.id_usuario);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className='home'>
      <h1>Cadastro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="idade">Idade:</label>
          <input
            type="text"
            id="idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="altura">Altura:</label>
          <input
            type="text"
            id="altura"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="peso">Peso:</label>
          <input
            type="text"
            id="peso"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <Link to="/login">Já cadastrado? Clique aqui</Link>
    </div>
  );
};

export default Home;
