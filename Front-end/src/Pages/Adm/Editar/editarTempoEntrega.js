import React, { useState, useEffect } from "react";
import axios from "axios";

const TempoEntrega = () => {
  const [codigo, setCodigo] = useState("");
  const [produto, setProduto] = useState("");
  const [dataSaida, setDataSaida] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [flashMessages, setFlashMessages] = useState([]);

  useEffect(() => {
    // Obtém os dados do tempo de entrega pelo ID e preenche os campos do formulário
    fetchTempoEntrega();
  }, []); // Executa apenas uma vez, quando o componente é montado

  const fetchTempoEntrega = async () => {
    try {
      const response = await axios.get("http://localhost:8083/user/tempoEntrega/{id}"); // Substitua "{id}" pelo ID correto
      const tempoEntrega = response.data;

      // Preenche os campos do formulário com os dados existentes
      setCodigo(tempoEntrega.codigo);
      setProduto(tempoEntrega.produto);
      setDataSaida(tempoEntrega.data_saida);
      setDataEntrega(tempoEntrega.data_entrega);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValidData = validateData(); // Validar os campos de data

    if (!isValidData) {
      return; // Retorna se os campos de data forem inválidos
    }

    const data = {
      codigo,
      produto,
      data_saida: new Date(dataSaida).toISOString(),
      data_entrega: new Date(dataEntrega).toISOString(),
    };

    axios
      .post("http://localhost:8083/user/tempoEntrega/novo", data)
      .then((response) => {
        console.log(response);
        // Faça algo com a resposta, se necessário
        setFlashMessages([{ text: "Nova entrega registrada com sucesso!", type: "success" }]);
        setCodigo("");
        setProduto("");
        setDataSaida("");
        setDataEntrega("");
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
          setFlashMessages([{ text: error.response.data.message, type: "error" }]);
        } else {
          setFlashMessages([{ text: "Ocorreu um erro ao registrar a entrega. Por favor, tente novamente.", type: "error" }]);
        }
      });
  };

  const validateData = () => {
    let isValid = true;

    if (!codigo) {
      setFlashMessages([{ text: "Por favor, preencha o campo de código.", type: "error" }]);
      isValid = false;
      return isValid; // Retorna imediatamente se o campo de código estiver vazio
    }

    if (!produto) {
      setFlashMessages([{ text: "Por favor, preencha o campo de material.", type: "error" }]);
      isValid = false;
      return isValid; // Retorna imediatamente se o campo de material estiver vazio
    }

    if (!dataSaida) {
      setFlashMessages([{ text: "Por favor, preencha o campo de data de recebimento.", type: "error" }]);
      isValid = false;
      return isValid; // Retorna imediatamente se o campo de data de recebimento estiver vazio
    }

    if (!dataEntrega) {
      setFlashMessages([{ text: "Por favor, preencha o campo de data de entrega.", type: "error" }]);
      isValid = false;
      return isValid; // Retorna imediatamente se o campo de data de entrega estiver vazio
    }

    if (new Date(dataSaida) > new Date(dataEntrega)) {
      setFlashMessages([{ text: "A data de saída não pode ser posterior à data de entrega.", type: "error" }]);
      isValid = false;
    }

    return isValid;
  };

  return (
    <div>
      <h3>Editar Tempo de Entrega</h3>
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
              <label htmlFor="produto">Material:</label>
              <input
                type="text"
                name="produto"
                id="produto"
                placeholder="Insira o nome ou uma descrição do material"
                className="form-control"
                value={produto}
                onChange={(event) => setProduto(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="data_saida">Data de recebimento:</label>
              <input
                type="datetime-local"
                name="data_saida"
                id="data_saida"
                className="form-control"
                value={dataSaida}
                onChange={(event) => setDataSaida(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="data_entrega">Data de entrega:</label>
              <input
                type="datetime-local"
                name="data_entrega"
                id="data_entrega"
                className="form-control"
                value={dataEntrega}
                onChange={(event) => setDataEntrega(event.target.value)}
              />
            </div>
            <button type="submit" id="enviar" className="btn btn-success mt-4">
              Editar Tempo de Entrega
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TempoEntrega;

