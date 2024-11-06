import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api";
import "../styles/EditPost.css";

function EditPedido() {
  const { pedidoId } = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    document.body.classList.add("edit-produto-background");

    return () => {
      document.body.classList.remove("edit-produto-background");
    };
  }, []);

  useEffect(() => {
    api
      .get("/produto/")
      .then((response) => setProdutos(response.data))
      .catch((error) => console.error("Erro ao buscar produtos:", error));

    if (pedidoId) {
      api
        .get(`/pedido/${pedidoId}/`)
        .then((response) => {
          setProduto(response.data.produto);
          setQuantidade(response.data.quantidade);
        })
        .catch((error) =>
          console.error("Erro ao buscar detalhes do pedido:", error)
        );
    }
  }, [pedidoId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("produto", produto);
      formData.append("quantidade", quantidade);

      if (pedidoId) {
        await api.put(`/pedido/${pedidoId}/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Pedido atualizado com sucesso!");
      } else {
        await api.post(`/pedido/`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao salvar pedido:", error);
    }
  };

  return (
    <div className="edit-pedido-container">
      <h1>{pedidoId ? "Editar Pedido" : "Criar Novo Pedido"}</h1>
      <form className="formedit" onSubmit={handleSubmit}>
        <select
          value={produto}
          onChange={(e) => setProduto(e.target.value)}
          required
        >
          <option value="">Selecione um produto</option>
          {produtos.map((prod) => (
            <option key={prod.id} value={prod.id}>
              {prod.nome}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantidade"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />
        <div className="button-group">
          <button className="save-button" type="submit">
            {pedidoId ? "Salvar" : "Criar"}
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

export default EditPedido;
