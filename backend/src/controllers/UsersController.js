import User from "../models/User"
import { createPasswordHash } from '../services/auth'

class UserController {
    async index(req, res) {
        try {
            const users = await User.find()
            return res.json(users);
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: "Internal Server Error!!" })
        }
    }

    async show(req, res) {

    }

    async create(req, res) {
        try {
            const { name, email, password } = req.body
            const user = await User.findOne({ email })

            if (user) {
                return res.status(422).json({ message: `User ${email} Already Exists` })
            }

            const passwordHash = await createPasswordHash(password)

            const newUser = await User.create({ name, email, password: passwordHash })
            console.log(`Usuário Criado com Sucesso: ${email}`)
            return res.status(201).json({ newUser })

        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: "Internal Server Error!!" })
        }
    }

    async update(req, res) {

    }

    async delete(req, res) {

    }

}

export default new UserController()