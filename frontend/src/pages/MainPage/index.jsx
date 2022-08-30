import React from "react";
import './style.css'

const MainPage = () => {
    const handleLogout = () => {
        console.log('Logout')
    }

    const handleSearch = (query) => {
        console.log('Query', query)
    }

    const handleClear = () => {
        console.log('Clear')
    }

    const handleDeleteRepo = () => {
        console.log('Deletar Repo')
    }

    return (
        <div id="main">
            <div className="nav">
                <h1 className="logo">Repository</h1>
                <button onClick={handleLogout}>Sair</button>
            </div>

            {/* Pesquisar */}
            <div className="search">
                <label htmlFor="query">Procurar:</label>
                <input type="search" name="query" id="query"></input>
                <button onClick={handleSearch}>Procurar</button>
                <button onClick={handleClear}>Limpar</button>
            </div>
            {/* Repositórios */}
            <div className="repositories">
                <h2 className="title">Repositórios</h2>
                <ul className="list">
                    <li className="item">
                        <div className="info">
                            <div className="owner">FrontEnd</div>
                            <div className="name">React</div>
                        </div>
                        <button onClick={handleDeleteRepo}>Apagar</button>
                    </li>
                    <li className="item">
                        <div className="info">
                            <div className="owner">Mobile</div>
                            <div className="name">React-Native</div>
                        </div>
                        <button onClick={handleDeleteRepo}>Apagar</button>
                    </li>
                    <li className="item">
                        <div className="info">
                            <div className="owner">JavaScript</div>
                            <div className="name">NodeJS</div>
                        </div>
                        <button onClick={handleDeleteRepo}>Apagar</button>
                    </li>
                </ul>

                <div className="new">
                    <label htmlFor="new-repo">Novo Repositório:</label>
                    <input type="url" name="new-repo"></input>
                    <button>Adicionar</button>
                </div>
            </div>
        </div>
    )
}

export default MainPage