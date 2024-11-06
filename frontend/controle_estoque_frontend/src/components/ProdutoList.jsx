import { useState, useEffect } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import "../styles/PostList.css";

function ProdutoList() {
  const [produtos, setProdutos] = useState([]);

  const handleDelete = async (produtoId) => {
    try {
      await api.delete(`/produto/${produtoId}/`);
      const updatedProdutos = produtos.filter(
        (produto) => produto.id !== produtoId
      );
      setProdutos(updatedProdutos);
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  useEffect(() => {
    api
      .get(`/produto/`)
      .then((response) => {
        setProdutos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar produtos:", error);
      });
  }, []);

  return (
    <div className="produto-list-container">
      <div className="header">
        <h1 className="h1title">Lista de Produtos</h1>
        <Link to="/produto/create" className="create-button">
          Criar Novo Produto
        </Link>
      </div>
      <ul>
        {produtos.map((produto) => (
          <li key={produto.id} className="item">
            <Link
              to={`/produto/${produto.id}/detail`}
              className="link-name"
            >
              {produto.nome} - x{produto.quantidade} - unidade: R${" "}
              {produto.preco}
            </Link>
            <div className="actions">
              <Link to={`/produto/${produto.id}/edit`} className="edit-link">
                Editar
              </Link>
              <button
                onClick={() => handleDelete(produto.id)}
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

export default ProdutoList;
