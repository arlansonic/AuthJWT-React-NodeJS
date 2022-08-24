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
            const { name, email, password, confirmPassword } = req.body
            const user = await User.findOne({ email })

            if (user) {
                return res.status(422).json({ message: `User ${email} Already Exists` })
            }

            const newUser = await User.create({ name, email, password, confirmPassword })
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