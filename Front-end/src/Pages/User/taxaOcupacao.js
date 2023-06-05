import React, { useState } from "react";
import axios from "axios";

const TaxaOcupacao = () => {
  const [espacoTotal, setEspacoTotal] = useState("");
  const [espacoUtilizado, setEspacoUtilizado] = useState("");
  const [dataAtualizacao, setDataAtualizacao] = useState("");
  const [flashMessage, setFlashMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!espacoTotal || !espacoUtilizado || !dataAtualizacao) {
      setFlashMessage({ text: "Por favor, preencha todos os campos.", type: "error" });
      return;
    }

    const data = {
      espaco_total: espacoTotal,
      espaco_utilizado: espacoUtilizado,
      data_atualizacao: dataAtualizacao,
    };

    axios
      .post("http://localhost:8083/user/taxaOcupacao/novo", data)
      .then((response) => {
        console.log(response);
        // Faça algo com a resposta, se necessário
        setFlashMessage({ text: "Taxa de Ocupação criada com sucesso!", type: "success" });
        setEspacoTotal("");
        setEspacoUtilizado("");
        setDataAtualizacao("");
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
          setFlashMessage({ text: error.response.data.message, type: "error" });
        } else {
          setFlashMessage({ text: "Ocorreu um erro ao criar a Taxa de Ocupação. Por favor, tente novamente.", type: "error" });
        }
      });
  };

  return (
    <div>
      <h3>Taxa de Ocupação do Setor</h3>
      {flashMessage && (
        <div className={`alert ${flashMessage.type === "success" ? "alert-success" : "alert-danger"}`} role="alert">
          {flashMessage.text}
        </div>
      )}
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="espaco_total">Espaço total:</label>
              <input
                type="number"
                name="espaco_total"
                id="espaco_total"
                placeholder="Insira o espaço total do setor"
                className="form-control"
                value={espacoTotal}
                onChange={(event) => setEspacoTotal(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="espaco_utilizado">Espaço Utilizado:</label>
              <input
                type="number"
                name="espaco_utilizado"
                id="espaco_utilizado"
                placeholder="Insira o espaço utilizado no setor"
                className="form-control"
                value={espacoUtilizado}
                onChange={(event) => setEspacoUtilizado(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="data_atualizacao">Data de atualização:</label>
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
              Criar Taxa de Ocupação
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaxaOcupacao;
