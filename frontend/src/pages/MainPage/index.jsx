import React from "react";
import Nav from "./Nav";
import Search from "./Search";
import Repositories from "./Repositories";
import './style.css'

const MainPage = () => {
    const handleLogout = () => {
        console.log('Logout')
    }

    const handleSearch = (query) => {
        console.log('Query', query)
    }

    const handleDeleteRepo = (repository) => {
        console.log('Deletar Repo', repository)
    }

    const handleNewRepo = (url) => {
        console.log('New Repo', url)
    }

    return (
        <div id="main">
            <Nav onLogout={handleLogout} />
            {/* Pesquisar */}
            <Search onSearch={handleSearch} />
            {/* Repositórios */}
            <Repositories
                repositories={[]}
                onDeleteRepo={handleDeleteRepo}
                onNewRepo={handleNewRepo}
            />

        </div>
    )
}

export default MainPage