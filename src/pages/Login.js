import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setsenha] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlesenhaChange = (event) => {
    setsenha(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://tcc-qs1j.onrender.com/login', {
        email,
        senha,
      });

      console.log(response.data);
      
      localStorage.setItem("id_usuario",response.data.id_usuario)
      
      setEmail('');
      setsenha('');

      
      navigate('/inicio');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Email" value={email} onChange={handleEmailChange} />
        <input type="password" placeholder="Senha" value={senha} onChange={handlesenhaChange} />
        <button type="submit">Login</button>
      </form>
      <Link to="/">Não cadastrado? Clique aqui</Link>
    </div>
  );
};

export default Login;
