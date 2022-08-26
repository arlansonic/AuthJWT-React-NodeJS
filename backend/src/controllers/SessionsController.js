import jwt from 'jsonwebtoken'
import User from '../models/User'
import bcrypt from 'bcrypt'
import authConfig from '../config/auth'

class SessionController {
    async create(req, res) {
        const { email, password } = req.body

        const userExists = await User.findOne({ email })

        if (!userExists) {
            return res.status(401).json({ error: "User / Password Invalid" })
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, userExists.password)

        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "User / Password Invalid" })
        }
        try {
            const { id } = userExists
            return res.json({
                user: {
                    id,
                    email
                },
                token: jwt.sign({ id: userExists._id }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn
                })
            })
        } catch (err) {
            return res.status(404).json({ error: err })
        }
    }
}

export default new SessionController()