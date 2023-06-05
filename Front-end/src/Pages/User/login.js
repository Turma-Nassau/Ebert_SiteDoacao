import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email,
      senha
    };

    try {
      const response = await axios.post('http://localhost:8083/user/login', data);
      console.log(response.data);
      // Redirecionar ou realizar outras ações após o login bem-sucedido
    } catch (error) {
      console.error(error);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Erro de conexão');
      }
    }
  };

  return (
    <div className="container-fluid bg-light py-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <h1 className="text-center mb-4">StockRotativo</h1>
          <div className="card bg-white shadow-sm p-4">
            <h2 className="mb-4">Acesse sua conta</h2>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">E-mail:</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Digite seu e-mail"
                  className="form-control"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="senha">Senha:</label>
                <input
                  type="password"
                  name="senha"
                  id="senha"
                  placeholder="Digite sua senha"
                  className="form-control"
                  value={senha}
                  onChange={(event) => setSenha(event.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100 mb-3 mt-3">
                Acessar
              </button>
            </form>
            <hr />
            <p className="text-center mb-0">
              Não tem uma conta? <a href="/user/criarUsuario" className="text-primary">Crie uma agora</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
