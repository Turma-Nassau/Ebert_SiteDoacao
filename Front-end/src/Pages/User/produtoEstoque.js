import React, { useState } from 'react';
import axios from 'axios';

const ProdutoEstoque = () => {
  const [codigo, setCodigo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [produto, setProduto] = useState('');
  const [dataEntrada, setDataEntrada] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Limpa as mensagens de erro e sucesso
    setErrorMessages([]);
    setSuccessMessage('');

    // Validação do formulário
    let isValid = true;

    if (!codigo) {
      isValid = false;
      setErrorMessages((prevMessages) => [...prevMessages, 'Por favor, preencha o campo de código.']);
    }

    if (!quantidade) {
      isValid = false;
      setErrorMessages((prevMessages) => [...prevMessages, 'Por favor, preencha o campo com a quantidade.']);
    }

    if (!produto) {
      isValid = false;
      setErrorMessages((prevMessages) => [...prevMessages, 'Por favor, preencha o campo com uma descrição.']);
    }

    if (!dataEntrada) {
      isValid = false;
      setErrorMessages((prevMessages) => [...prevMessages, 'Por favor, preencha o campo com uma data de entrada.']);
    }

    if (isValid) {
      // Constrói o objeto com os campos correspondentes
      const novoProdutoEstoque = {
        id: codigo,
        quantidade: quantidade,
        produto: produto,
        data_atualizacao: dataEntrada
      };

      // Enviar o formulário como um objeto JSON
      axios
        .post('http://localhost:8083/user/produtoEstoque/novo', novoProdutoEstoque)
        .then((response) => {
          console.log(response.data); // Resposta JSON
          setSuccessMessage('Material adicionado com sucesso!');
          setCodigo('');
          setQuantidade('');
          setProduto('');
          setDataEntrada('');
        })
        .catch((error) => {
          console.log(error); // Tratar erro de requisição
        });
    }
  };

  return (
    <div>
      <h3>Estoque do Material</h3>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessages.length > 0 && (
        <div className="alert alert-danger" role="alert">
          {errorMessages[0]}
        </div>
      )}
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="codigo">Código:</label>
              <input
                type="number"
                name="codigo"
                id="codigo"
                placeholder="Insira o código do material"
                className="form-control"
                value={codigo}
                onChange={(event) => setCodigo(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantidade">Quantidade:</label>
              <input
                type="number"
                name="quantidade"
                id="quantidade"
                placeholder="Insira a quantidade"
                className="form-control"
                value={quantidade}
                onChange={(event) => setQuantidade(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="produto">Descrição:</label>
              <textarea
                name="produto"
                id="produto"
                placeholder="Insira o nome ou uma descrição do material"
                className="form-control"
                value={produto}
                onChange={(event) => setProduto(event.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="dataEntrada">Data de entrada:</label>
              <input
                type="datetime-local"
                name="dataEntrada"
                id="dataEntrada"
                className="form-control"
                value={dataEntrada}
                onChange={(event) => setDataEntrada(event.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success mt-4">
              Adicionar Material
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProdutoEstoque;
