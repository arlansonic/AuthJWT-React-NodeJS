import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Search from "./Search";
import Repositories from "./Repositories";
import { getRepositories, createRepository, DeleteRepository } from '../../services/api'
import './style.css'
const userId = '6308489647e35bf43c400be3'

const MainPage = () => {
    const [repositories, setRepositories] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingError, setLoadingError] = useState(false)

    const loadData = async (query = '') => {
        try {
            setLoading(true)
            const res = await getRepositories(userId, query)
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
    }

    const handleSearch = async (query) => {
        console.log('Query', query)
        await loadData(query)
    }

    const handleDeleteRepo = async (repository) => {
        console.log('Deletar Repo', repository)
        await DeleteRepository(userId, repository._id)
        await loadData()
    }

    const handleNewRepo = async (url) => {
        console.log('New Repo', url)
        try {
            await createRepository(userId, url)
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