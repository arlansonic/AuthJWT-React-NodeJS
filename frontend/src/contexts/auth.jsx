import React, { createContext, useState, useEffect } from "react";
import { api, createSession } from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {        
        const user = localStorage.getItem('user')
        const token = localStorage.getItem('token')

        if (user && token) {
            setUser(JSON.parse(user))
            api.defaults.headers.Authorization = `Bearer ${token}`
        }
        setLoading(false)
    }, [])

    const login = async (email, password) => {
        const res = await createSession(email, password)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        localStorage.setItem('token', res.data.token)

        api.defaults.headers.Authorization = `Bearer ${res.data.token}`

        setUser(res.data.user)
        navigate('/')
    }

    const logout = async () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        api.defaults.headers.Authorization = null
        setUser(null)
        navigate('/login')
    }

    return (
        <AuthContext.Provider
            value={{
                authenticated: !!user,
                user,
                loading,
                login,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    )
}