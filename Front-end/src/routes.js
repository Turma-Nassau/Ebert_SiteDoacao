import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from './pages/user/login';
import Principal from "./pages/user/principal";
import CriarUsuario from "./pages/user/criarUser";

import ListaServicos from './pages/user/listaServicos';
import PerdaMaterial from './pages/user/perdaMaterial';
import ProdutoEstoque from './pages/user/produtoEstoque';
import TempoEntrega from "./pages/user/tempoEntrega";
import TaxaOcupacao from "./pages/user/taxaOcupacao";

import ListaAdmin from "./pages/admin/index"
import ListaTempoEntrega from "./pages/admin/listaTempoEntrega";


import EditarTempoEntrega from "./pages/admin/Editar/editarTempoEntrega";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/criarUsuario" element={<CriarUsuario />} />
        <Route path="/user/principal" element={<Principal />} />

        <Route path="/user/lista" element={<ListaServicos />} />
        <Route path="/user/PerdaMaterial" element={<PerdaMaterial />} />
        <Route path="/user/produtoEstoque" element={<ProdutoEstoque />} />
        <Route path="/user/tempoEntrega" element={<TempoEntrega />} />
        <Route path="/user/taxaOcupacao" element={<TaxaOcupacao />} />

        <Route path="/admin" element={<ListaAdmin />} />
        <Route path="/admin/listaTempoEntrega" element={<ListaTempoEntrega />} />

        <Route path="/admin/listaTempoEntrega/editar/:id" element={<EditarTempoEntrega />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
