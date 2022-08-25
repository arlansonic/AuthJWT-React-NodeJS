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

    async search(req, res) {
        try {
            const { id } = req.params
            const user = await User.findById(id)

            if (!user) {
                return res.status(404).json({ message: "User not Found!" })
            }

            return res.json({ user })

        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: "Internal Server Error!!" })
        }
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

        try {
            const { id } = req.params
            const { name, email, password } = req.body

            const user = await User.findById(id)

            if (!user) {
                return res.status(404).json({ message: "User not Found!" })
            }
            const passwordHash = createPasswordHash(password)
            await user.update({ name, email, password: passwordHash })

            return res.status(200).json({ message: 'User successfully updated ' })

        } catch (error) {
            console.error(err)
            return res.status(500).json({ error: "Internal Server Error!!" })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const user = await User.findById(id)

            if (!user) {
                return res.status(404).json({ message: "User not Found!" })
            }
            await user.deleteOne()

            return res.status(200).json({ message: "User successfully deleted" })
        } catch (error) {
            console.error(err)
            return res.status(500).json({ error: "Internal Server Error!!" })
        }
    }

}

export default new UserController()