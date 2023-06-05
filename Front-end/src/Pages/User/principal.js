import React from 'react';

const Principal = () => {
  // Conteúdo do componente Principal
  return (

    <div className="container-fluid p-0">

      <div style={{ background: '#E9ECEF' }} className="p-5 rounded-lg m-3">

        <h1 className="display-4">StockRotativo</h1>

        <p className="lead">O controle de estoque ao alcance de suas mãos.</p>

        <hr className="my-4" />

        <p>
          Gerencie seu estoque de forma eficiente com o StockRotativo. Registre as entradas e saídas de produtos e obtenha
          relatórios atualizados para manter o controle de seu almoxarifado
        </p>

        <a className="btn btn-primary btn-lg" href="/saibaMais" role="button">
          Saiba mais
        </a>

      </div>

    </div>

  );
};

export default Principal;
