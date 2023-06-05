import React from 'react';

const ListaServicos = () => {
  return (
    <div className="card">
      <div className="card-body">
        <h2>StockRotativo: seus serviços de gestão de estoque</h2>
        <hr />
        <p>Com StockRotativo, você pode acessar uma variedade de serviços de gestão de estoque, incluindo:</p>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <a href="/user/tempoEntrega" className="text-decoration-none">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <h5 className="mb-1">Tempo de Entrega</h5>
                <span className="badge bg-primary rounded-pill">Novo</span>
              </div>
              <p className="mb-1">Registre o tempo de entrega dos seus produtos.</p>
            </a>
          </li>
          <li className="list-group-item">
            <a href="/user/taxaOcupacao" className="text-decoration-none">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <h5 className="mb-1">Taxa de Ocupação</h5>
                <span className="badge bg-primary rounded-pill">Novo</span>
              </div>
              <p className="mb-1">Registre a taxa de ocupação do seu estoque.</p>
            </a>
          </li>
          <li className="list-group-item">
            <a href="/user/produtoEstoque" className="text-decoration-none">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <h5 className="mb-1">Produto em Estoque</h5>
                <span className="badge bg-primary rounded-pill">Novo</span>
              </div>
              <p className="mb-1">Mantenha o controle dos produtos em estoque.</p>
            </a>
          </li>
          <li className="list-group-item">
            <a href="/user/PerdaMaterial" className="text-decoration-none">
              <div className="d-flex w-100 justify-content-between align-items-center">
                <h5 className="mb-1">Perda de Material</h5>
                <span className="badge bg-primary rounded-pill">Novo</span>
              </div>
              <p className="mb-1">Registre perdas de material e minimize prejuízos.</p>
            </a>
          </li>
        </ul>
        <p className="mt-3">
          Com esses serviços, você terá mais controle sobre seu estoque e poderá tomar decisões mais informadas sobre a gestão de seu
          almoxarifado.
        </p>
      </div>
    </div>
  );
};

export default ListaServicos;
