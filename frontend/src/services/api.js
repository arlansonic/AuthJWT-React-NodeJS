import axios from 'axios'

export const api = axios.create({
    baseURL: 'http://10.57.72.121:3010',
})

export const createSession = async (email, password) => {
    let url = `/sessions`

    return api.post(url, { email, password })
}

export const getRepositories = async (userId, query) => {
    let url = `/users/${userId}/repositories/`

    if (query !== '') {
        url += `?q=${query}`
    }

    console.log('Query: ', url)

    return api.get(url)
}

export const createRepository = async (userId, repositoryUrl) => {
    const repositoryName = getRepositoryName(repositoryUrl)
    const url = `/users/${userId}/repositories/`

    return api.post(url, { name: repositoryName, url: repositoryUrl })
}

const getRepositoryName = (url) => {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\\+.~#?&\\/\\/=]*)/

    const match = url.match(regex)    

    if (match[2]) {
        const values = match[2].split('/')        
        return `${values[1]}/${values[2]}`
    }
}

export const DeleteRepository = async (userId, id) => {
    const url = `/users/${userId}/repositories/${id}`
    return api.delete(url)
}

