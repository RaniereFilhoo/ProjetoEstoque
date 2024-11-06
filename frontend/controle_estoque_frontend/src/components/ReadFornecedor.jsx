import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";
import "../styles/ReadPost.css";

function ReadFornecedor() {
  const { fornecedorId } = useParams();
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [produtoFornecido, setProdutoFornecido] = useState("");

  useEffect(() => {
    document.body.classList.add("edit-produto-background");

    return () => {
      document.body.classList.remove("edit-produto-background");
    };
  }, []);

  useEffect(() => {
    api
      .get(`/fornecedor/${fornecedorId}/`)
      .then((response) => {
        setNome(response.data.nome);
        setContato(response.data.contato);
        setProdutoFornecido(response.data.produto_fornecido);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do fornecedor:", error);
      });
  }, [fornecedorId]);

  return (
    <div className="read-post-container">
      <h1>Detalhes do Fornecedor</h1>
      <Link to="/dashboard">
        <button type="button" className="back-button">Voltar para Listagem</button>
      </Link>
      <h2>Nome: {nome}</h2>
      <p>Contato: {contato}</p>
      <p>Produto Fornecido: {produtoFornecido}</p>
    </div>
  );
}

export default ReadFornecedor;
