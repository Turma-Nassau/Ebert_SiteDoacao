import React, { useState } from 'react';
import axios from 'axios';

const PerdaMaterial = () => {
  const [id, setId] = useState('');
  const [quantidadeTotal, setQuantidadeTotal] = useState('');
  const [quantidadePerdida, setQuantidadePerdida] = useState('');
  const [produto, setProduto] = useState('');
  const [dataAtualizacao, setDataAtualizacao] = useState('');
  const [flashMessages, setFlashMessages] = useState([]);

  const validateData = () => {
    let isValid = true;

    if (!id) {
      setFlashMessages([{ text: 'Por favor, preencha o campo de código.', type: 'error' }]);
      isValid = false;
    }

    if (!quantidadeTotal) {
      setFlashMessages([{ text: 'Por favor, preencha o campo de quantidade total.', type: 'error' }]);
      isValid = false;
    }

    if (!quantidadePerdida) {
      setFlashMessages([{ text: 'Por favor, preencha o campo de quantidade perdida.', type: 'error' }]);
      isValid = false;
    }

    if (!produto) {
      setFlashMessages([{ text: 'Por favor, preencha o campo de descrição.', type: 'error' }]);
      isValid = false;
    }

    if (!dataAtualizacao) {
      setFlashMessages([{ text: 'Por favor, selecione a data da perda.', type: 'error' }]);
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValidData = validateData();

    if (!isValidData) {
      return;
    }

    const data = {
      id,
      quantidade_total: quantidadeTotal,
      quantidade_perdida: quantidadePerdida,
      produto,
      data_atualizacao: dataAtualizacao,
    };

    axios
      .post('http://localhost:8083/user/perdaMaterial/novo', data)
      .then((response) => {
        console.log(response);
        setFlashMessages([{ text: 'Material perdido registrado com sucesso!', type: 'success' }]);
        setId('');
        setQuantidadeTotal('');
        setQuantidadePerdida('');
        setProduto('');
        setDataAtualizacao('');
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
          setFlashMessages([{ text: error.response.data.message, type: 'error' }]);
        } else {
          setFlashMessages([{ text: 'Ocorreu um erro ao registrar o material perdido. Por favor, tente novamente.', type: 'error' }]);
        }
      });
  };

  return (
    <div>
      <h3>Perda de Material</h3>
      {flashMessages.length > 0 && (
        <div>
          {flashMessages.map((message, index) => (
            <div
              key={index}
              className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}
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
              <label htmlFor="id">Código:</label>
              <input
                type="text"
                name="id"
                id="id"
                className="form-control"
                placeholder="Insira o código do material"
                value={id}
                onChange={(event) => setId(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantidade_total">Quantidade Total:</label>
              <input
                type="number"
                name="quantidade_total"
                id="quantidade_total"
                className="form-control"
                placeholder="Insira a quantidade total anterior"
                value={quantidadeTotal}
                onChange={(event) => setQuantidadeTotal(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantidade_perdida">Quantidade Perdida:</label>
              <input
                type="number"
                name="quantidade_perdida"
                id="quantidade_perdida"
                className="form-control"
                placeholder="Insira a quantidade perdida"
                value={quantidadePerdida}
                onChange={(event) => setQuantidadePerdida(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="produto">Descrição:</label>
              <textarea
                name="produto"
                id="produto"
                className="form-control"
                placeholder="Insira uma breve descrição do material"
                value={produto}
                onChange={(event) => setProduto(event.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="data_atualizacao">Data da perda:</label>
              <input
                type="date"
                name="data_atualizacao"
                id="data_atualizacao"
                className="form-control"
                value={dataAtualizacao}
                onChange={(event) => setDataAtualizacao(event.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-success mt-4">
              Registrar Material Perdido
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PerdaMaterial;

