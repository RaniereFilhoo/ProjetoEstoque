import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import "../styles/PostList.css";

function FornecedorList() {
  const [fornecedores, setFornecedores] = useState([]);

  const handleDelete = async (fornecedorId) => {
    try {
      await api.delete(`/fornecedor/${fornecedorId}/`);
      const updatedFornecedores = fornecedores.filter(
        (fornecedor) => fornecedor.id !== fornecedorId
      );
      setFornecedores(updatedFornecedores);
    } catch (error) {
      console.error("Erro ao deletar fornecedor:", error);
    }
  };

  useEffect(() => {
    api
      .get(`/fornecedor/`)
      .then((response) => {
        setFornecedores(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar fornecedores:", error);
      });
  }, []);

  return (
    <div className="fornecedor-list-container">
      <div className="header-fornece">
        <h1 className="h1title">Lista de Fornecedores</h1>
        <Link to="/fornecedor/create" className="create-button">
          Criar Novo Fornecedor
        </Link>
      </div>
      <ul>
        {fornecedores.map((fornecedor) => (
          <li key={fornecedor.id} className="item">
            <Link to={`/fornecedor/${fornecedor.id}/detail`} className="link-name">
              {fornecedor.nome} - Contato: {fornecedor.contato} - Fornece:{" "}
              {fornecedor.produto_fornecido} {/* Novo campo */}
            </Link>
            <div className="actions">
              <Link to={`/fornecedor/${fornecedor.id}/edit`} className="edit-link">Editar</Link>
              <button onClick={() => handleDelete(fornecedor.id)} className="delete-button">
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FornecedorList;
