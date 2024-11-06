import React from "react";
import ProdutoList from "./ProdutoList";
import PedidoList from "./PedidoList";
import FornecedorList from "./FornecedorList";

import "../styles/Dashboard.css";



function Dashboard() {
  return (
    <>
      <nav className="navbar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="Logo" className="imglogo" />
          <span className="nav-title">ReactWarehouse</span>
        </div>
        <ul className="navbar-menu">
          <li><a href="#background-image">Home</a></li>
          <li><a href="#presentation-image">Sobre</a></li>
          <li><a href="#dashcontainer">Iniciar</a></li>
          <li><a href="/">Sair</a></li>
        </ul>
      </nav>

      <div id="background-image" className="background-image" style={{ backgroundImage: `url('/background1.jpg')` }}>
        <div className="overlay-text">
          <h1>Reaja rapidamente às necessidades do</h1>
          <h2>seu estoque com nossa tecnologia.</h2>
          <h3>Inicie agora:</h3>
          <button 
              className="beginbtn" 
              onClick={() => {
                const dashcontainer = document.getElementById("dashcontainer");
                dashcontainer.scrollIntoView({ behavior: "smooth" });
              }}
>
  Iniciar
</button>

        </div>
      </div>

      <div id="presentation-image" className="presentation-image" style={{ backgroundImage: `url('/about.jpg')`}}>
        <div className="about-text">
          <h1>O software essencial</h1>
          <h2>para controle de estoques.</h2>
          <p>ReactStock: plataforma prática para gestão de estoques em tempo real, garantindo agilidade, precisão e organização para sua empresa.</p>
        </div>
      </div>

      <div id="dashcontainer" className="dashcontainer">
        
        <ProdutoList/>
       
        <PedidoList/>
        
        <FornecedorList/>
      </div>

      <footer className="footer">
        <p>© 2024 ReactWarehouse. Todos os direitos reservados.</p>
        <p>Desenvolvido por: Raniere Filho e Gabriel França.</p>
    </footer>
    </>
  );
}

export default Dashboard;