import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Search from "./Search";
import Repositories from "./Repositories";
import { getRepositories, createRepository, DeleteRepository } from '../../services/api'
import './style.css'

const MainPage = () => {
    // Recuperar as informações de Login        
    const { user, logout } = useContext(AuthContext)
    const [repositories, setRepositories] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingError, setLoadingError] = useState(false)

    const loadData = async (query = '') => {
        try {
            setLoading(true)
            const res = await getRepositories(user?.id, query)
            setRepositories(res.data)
            setLoading(false)
        } catch (err) {
            console.error(err)
            setLoadingError(true)
        }
    }

    useEffect(() => {
        (async () => await loadData())()
    }, [])

    const handleLogout = () => {
        console.log('Logout')
        logout()
    }

    const handleSearch = async (query) => {
        console.log('Query', query)
        await loadData(query)
    }

    const handleDeleteRepo = async (repository) => {
        console.log('Deletar Repo', repository)
        await DeleteRepository(user?.id, repository._id)
        await loadData()
    }

    const handleNewRepo = async (url) => {
        console.log('New Repo', url)
        try {
            await createRepository(user?.id, url)
            await loadData()
        } catch (err) {
            console.error(err)
            setLoadingError(true)
        }
    }

    if (loadingError) {
        return (
            <div className="loading">
                Erro ao carregar os dados do Repositório <Link to="/login">Voltar</Link>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="loading">
                <h1>Carregando........</h1>
            </div>
        )
    }

    return (
        <div id="main">            
            <Nav onLogout={handleLogout} />
            {/* Pesquisar */}
            <Search onSearch={handleSearch} />
            {/* Repositórios */}
            <Repositories
                repositories={repositories}
                onDeleteRepo={handleDeleteRepo}
                onNewRepo={handleNewRepo}
            />
        </div>
    )
}

export default MainPage