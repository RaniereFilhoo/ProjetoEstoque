import { useState, useEffect } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import "../styles/PostList.css";

function PedidoList() {
  const [pedidos, setPedidos] = useState([]);

  const handleDelete = async (pedidoId) => {
    try {
      await api.delete(`/pedido/${pedidoId}/`);
      const updatedPedidos = pedidos.filter((pedido) => pedido.id !== pedidoId);
      setPedidos(updatedPedidos);
    } catch (error) {
      console.error("Erro ao deletar pedido:", error);
    }
  };

  useEffect(() => {
    api
      .get(`/pedido/`)
      .then((response) => {
        setPedidos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar pedidos:", error);
      });
  }, []);

  return (
    <div className="pedido-list-container">
      <div className="header">
        <h1 className="h1title">Lista de Pedidos</h1>
        <Link to="/pedido/create" className="create-button">
          Criar Novo Pedido
        </Link>
      </div>
      <ul>
        {pedidos.map((pedido) => (
          <li key={pedido.id} className="item">
            <Link
              to={`/pedido/${pedido.id}/detail`}
              className="link-name"
            >
              {pedido.produto.nome} - x{pedido.quantidade} - {pedido.data}
            </Link>
            <div className="actions">
              <Link to={`/pedido/${pedido.id}/edit`} className="edit-link">
                Editar
              </Link>
              <button
                onClick={() => handleDelete(pedido.id)}
                className="delete-button"
              >
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PedidoList;
