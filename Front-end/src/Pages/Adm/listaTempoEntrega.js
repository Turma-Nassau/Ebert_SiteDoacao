import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TemposEntrega = () => {
  const [tempoEntrega, setTempoEntrega] = useState([]);
  const [exclusaoSucesso, setExclusaoSucesso] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTempoEntrega();
  }, []);

  const fetchTempoEntrega = async () => {
    try {
      const response = await axios.get('http://localhost:8083/admin/listaTempoEntrega');
      setTempoEntrega(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatarData = (data) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(data).toLocaleString('pt-BR', options);
  };

  const limitarTexto = (texto, limite) => {
    if (texto.length <= limite) {
      return texto;
    }
    return texto.slice(0, limite) + '...';
  };

  const handleExcluirTempo = async (id) => {
    try {
      await axios.post('http://localhost:8083/admin/listaTempoEntrega/deletar', { id });
      setExclusaoSucesso(true);
      fetchTempoEntrega();
    } catch (error) {
      console.error(error);
      // Exibir mensagem de erro (opcional)
    }
  };

  const handleEditarTempo = (id) => {
    navigate(`/admin/listaTempoEntrega/editar/${id}`);
  };

  return (
    <div className="container">
      <h3 className="mt-4 mb-4 h2 fw-bold">Histórico de Entregas</h3>

      {exclusaoSucesso && (
        <div className="alert alert-success" role="alert">
          Tempo de entrega excluído com sucesso!
        </div>
      )}

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Código</th>
            <th scope="col">Produto</th>
            <th scope="col">Data de Recebimento</th>
            <th scope="col">Data de Entrega</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tempoEntrega.map((tempo) => (
            <tr key={tempo.id}>
              <td>{tempo.codigo}</td>
              <td>{limitarTexto(tempo.produto, 30)}</td>
              <td>{formatarData(tempo.data_saida)}</td>
              <td>{formatarData(tempo.data_entrega)}</td>
              <td>
                <div className="d-flex">
                  <button
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={() => handleExcluirTempo(tempo.id)}
                  >
                    Deletar
                  </button>
                  <button
                    className="btn btn-warning" // Alteração: adicionada a classe 'btn-warning' para cor laranja
                    onClick={() => handleEditarTempo(tempo.id)}
                  >
                    Editar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TemposEntrega;
