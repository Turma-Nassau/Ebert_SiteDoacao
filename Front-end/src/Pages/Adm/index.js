import React from 'react';

const AdminArea = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h2>StockRotativo: Área Administrativa</h2>
        <hr />
        <p>Nesta área, você tem acesso a uma variedade de serviços de gerenciamento de estoque, incluindo:</p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <a href="/admin/listaTempoEntrega" className="text-decoration-none">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <h5 className="mb-1">Listagem de Tempos de Entrega</h5>
                <span className="badge bg-primary rounded-pill">Novo</span>
              </div>
              <p className="mb-1">Visualize todos os registros relacionados aos tempos de entrega de seus produtos.</p>
            </a>
          </li>
          <li className="list-group-item">
            <a href="/admin/listaTaxaOcupacao" className="text-decoration-none">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <h5 className="mb-1">Listagem de Taxas de Ocupação</h5>
                <span className="badge bg-primary rounded-pill">Novo</span>
              </div>
              <p className="mb-1">Acompanhe os registros de taxa de ocupação do seu setor de forma detalhada.</p>
            </a>
          </li>
          <li className="list-group-item">
            <a href="/admin/listaProdutoEstoque" className="text-decoration-none">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <h5 className="mb-1">Listagem de Produtos em Estoque</h5>
                <span className="badge bg-primary rounded-pill">Novo</span>
              </div>
              <p className="mb-1">Obtenha uma visão geral completa de todos os produtos atualmente em seu estoque.</p>
            </a>
          </li>
          <li className="list-group-item">
            <a href="/admin/listaPerdaMaterial" className="text-decoration-none">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <h5 className="mb-1">Listagem de Produtos Perdidos</h5>
                <span className="badge bg-primary rounded-pill">Novo</span>
              </div>
              <p className="mb-1">Analise os registros de perda de material para minimizar prejuízos e otimizar sua operação.</p>
            </a>
          </li>
        </ul>
        <p className="mt-3">
          Por meio desses serviços, você terá um controle mais preciso do seu estoque e poderá tomar decisões estratégicas com base em informações atualizadas e detalhadas sobre seu almoxarifado.
        </p>
      </div>
    </div>
  );
};

export default AdminArea;
