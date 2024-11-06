import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api";
import "../styles/EditPost.css";

function EditProduto() {
  const { produtoId } = useParams();
  const navigate = useNavigate();
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
    if (!produtoId) return;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("preco", preco);
      formData.append("quantidade", quantidade);

      if (produtoId) {
        await api.put(`/produto/${produtoId}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Produto atualizado com sucesso!");
      } else {
        await api.post(`/produto/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  return (
    <div className="edit-produto-container">
      <h1>{produtoId ? "Editar Produto" : "Criar Novo Produto"}</h1>
      <form className="formedit" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
        <div className="button-group">
          <button className="save-button" type="submit">
            {produtoId ? "Salvar" : "Criar"}
          </button>
          <Link to="/dashboard">
            <button type="button" className="back-button">
              Voltar para Listagem
            </button>
          </Link>
          </div>
      </form>
    </div>
  );
}

export default EditProduto;
