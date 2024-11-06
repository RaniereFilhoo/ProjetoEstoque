import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import "../styles/ReadPost.css";

function ReadProduto() {
  const { produtoId } = useParams();
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");

  useEffect(() => {
    document.body.classList.add("edit-produto-background");

    return () => {
      document.body.classList.remove("edit-produto-background");
    };
  }, []);

  useEffect(() => {
    api
      .get(`/produto/${produtoId}/`)
      .then((response) => {
        setNome(response.data.nome);
        setPreco(response.data.preco);
        setQuantidade(response.data.quantidade);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do produto:", error);
      });
  }, [produtoId]);

  return (
    <div className="read-post-container">
      <h1>Detalhes do Produto</h1>
      <Link to="/dashboard">
        <button type="button" className="back-button">
          Voltar para Listagem
        </button>
      </Link>
      <h2>Nome: {nome}</h2>
      <p>Preço: R$ {preco}</p>
      <p>Quantidade: {quantidade}</p>
    </div>
  );
}

export default ReadProduto;
