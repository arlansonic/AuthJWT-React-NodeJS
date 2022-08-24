import bcrypt from 'bcrypt'
import User from "../models/User"

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
            // Criando Criptografia para Senha 
            const salt = await bcrypt.genSalt(12)
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await User.create({ name, email, password: hashedPassword })
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