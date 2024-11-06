import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../styles/EditPost.css";

function EditFornecedor() {
  const { fornecedorId } = useParams();
  const navigate = useNavigate();
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
    if (!fornecedorId) return;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("contato", contato);
      formData.append("produto_fornecido", produtoFornecido);

      if (fornecedorId) {
        await api.put(`/fornecedor/${fornecedorId}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Fornecedor atualizado com sucesso!");
      } else {
        await api.post(`/fornecedor/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao salvar fornecedor:", error);
    }
  };

  return (
    <div className="edit-fornecedor-container">
      <h1>{fornecedorId ? "Editar Fornecedor" : "Criar Novo Fornecedor"}</h1>
      <form className="formedit" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="text"
          placeholder="Contato"
          value={contato}
          onChange={(e) => setContato(e.target.value)}
        />
        <input
          type="text"
          placeholder="Produto Fornecido"
          value={produtoFornecido}
          onChange={(e) => setProdutoFornecido(e.target.value)}
        />
        <div className="button-group">
          <button className="save-button" type="submit">{fornecedorId ? "Salvar" : "Criar"}</button>
          <Link to="/dashboard">
            <button className="back-button" type="button">Voltar para Listagem</button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditFornecedor;
