import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import CreateProduto from "./components/EditProduto";
import EditProduto from "./components/EditProduto";
import ReadProduto from "./components/ReadProduto";
import CreatePedido from "./components/EditPedido";
import EditPedido from "./components/EditPedido";
import ReadPedido from "./components/ReadPedido";
import CreateFornecedor from "./components/EditFornecedor";
import EditFornecedor from "./components/EditFornecedor";
import ReadFornecedor from "./components/ReadFornecedor";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<PrivateRoute />}>
          {/* Rota para o Dashboard com as listagens */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Rotas de Produto */}
          <Route path="/produto/create" element={<CreateProduto />} />
          <Route path="/produto/:produtoId/edit" element={<EditProduto />} />
          <Route path="/produto/:produtoId/detail" element={<ReadProduto />} />

          {/* Rotas de Pedido */}
          <Route path="/pedido/create" element={<CreatePedido />} />
          <Route path="/pedido/:pedidoId/edit" element={<EditPedido />} />
          <Route path="/pedido/:pedidoId/detail" element={<ReadPedido />} />

          {/* Rotas de Fornecedor */}
          <Route path="/fornecedor/create" element={<CreateFornecedor />} />
          <Route
            path="/fornecedor/:fornecedorId/edit"
            element={<EditFornecedor />}
          />
          <Route
            path="/fornecedor/:fornecedorId/detail"
            element={<ReadFornecedor />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
