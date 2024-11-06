import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import "../styles/ReadPost.css";

function ReadPedido() {
  const { pedidoId } = useParams();
  const [produtoNome, setProdutoNome] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    document.body.classList.add("edit-produto-background");

    return () => {
      document.body.classList.remove("edit-produto-background");
    };
  }, []);

  useEffect(() => {
    api
      .get(`/pedido/${pedidoId}/`)
      .then((response) => {
        setProdutoNome(response.data.produto.nome);
        setQuantidade(response.data.quantidade);
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do pedido:", error);
      });
  }, [pedidoId]);

  return (
    <div className="read-post-container">
      <h1>Detalhes do Pedido</h1>
      <Link to="/dashboard">
        <button type="button" className="back-button">
          Voltar para Listagem
        </button>
      </Link>
      <h2>Produto: {produtoNome}</h2>
      <p>Quantidade: {quantidade}</p>
      <p>Data: {data}</p>
    </div>
  );
}

export default ReadPedido;
