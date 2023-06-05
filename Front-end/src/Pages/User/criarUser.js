import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [senha2, setSenha2] = useState("");
  const [flashMessages, setFlashMessages] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValidData = validateData(); // Validar os campos de dados

    if (!isValidData) {
      return; // Retorna se os campos de dados forem inválidos
    }

    const data = {
      nome,
      sobrenome,
      email,
      matricula,
      senha,
      senha2
    };

    try {
      const response = await axios.post("http://localhost:8083/user/criar/novo", data);
      console.log(response);
      setFlashMessages([{ text: "Nova conta criada com sucesso!", type: "success" }]);
      setNome("");
      setSobrenome("");
      setEmail("");
      setMatricula("");
      setSenha("");
      setSenha2("");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setFlashMessages([{ text: error.response.data.message, type: "error" }]);
      } else {
        setFlashMessages([{ text: "Ocorreu um erro ao criar a conta. Por favor, tente novamente.", type: "error" }]);
      }
    }
  };

  const validateData = () => {
    let isValid = true;

    if (!nome) {
      setFlashMessages([{ text: "Por favor, preencha o campo de nome.", type: "error" }]);
      isValid = false;
    }

    if (!sobrenome) {
      setFlashMessages([{ text: "Por favor, preencha o campo de sobrenome.", type: "error" }]);
      isValid = false;
    }

    if (!email) {
      setFlashMessages([{ text: "Por favor, preencha o campo de e-mail.", type: "error" }]);
      isValid = false;
    }

    if (!matricula) {
      setFlashMessages([{ text: "Por favor, preencha o campo de matrícula.", type: "error" }]);
      isValid = false;
    }

    if (!senha) {
      setFlashMessages([{ text: "Por favor, preencha o campo de senha.", type: "error" }]);
      isValid = false;
    }

    if (senha !== senha2) {
      setFlashMessages([{ text: "As senhas não coincidem.", type: "error" }]);
      isValid = false;
    }

    return isValid;
  };

  return (
    <div>
      <h3>Criar uma nova conta</h3>
      {flashMessages.length > 0 && (
        <div>
          {flashMessages.map((message, index) => (
            <div
              key={index}
              className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}
              role="alert"
            >
              {message.text}
            </div>
          ))}
        </div>
      )}
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                name="nome"
                id="nome"
                placeholder="Digite seu nome"
                className="form-control"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
           
              />
            </div>
            <div className="form-group">
              <label htmlFor="sobrenome">Sobrenome:</label>
              <input
                type="text"
                name="sobrenome"
                id="sobrenome"
                placeholder="Digite seu sobrenome"
                className="form-control"
                value={sobrenome}
                onChange={(event) => setSobrenome(event.target.value)}
             
              />
            </div>
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
              <label htmlFor="matricula">Matrícula:</label>
              <input
                type="number"
                name="matricula"
                id="matricula"
                placeholder="Digite sua matrícula"
                className="form-control"
                value={matricula}
                onChange={(event) => setMatricula(event.target.value)}
           
              />
            </div>
            <div className="form-group">
              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                name="senha"
                id="senha"
                placeholder="Crie uma senha"
                className="form-control"
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
             
              />
            </div>
            <div className="form-group">
              <label htmlFor="senha2">Confirme a senha:</label>
              <input
                type="password"
                name="senha2"
                id="senha2"
                placeholder="Digite a senha novamente"
                className="form-control"
                value={senha2}
                onChange={(event) => setSenha2(event.target.value)}
             
              />
            </div>
            <button type="submit" className="btn btn-success mt-4">
              Criar Conta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
