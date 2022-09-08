import User from "../models/User"
import Repository from '../models/Repository'


class RepositoriesController {
    async index(req, res) {
        try {
            const { user_id } = req.params
            const { q } = req.query

            const user = await User.findById(user_id)

            if (!user) {
                return res.status(404).json({ message: "User Not Found" })
            }            

            let query = {}
            if (q) {
                query = { url: { $regex: q } }
            }

            const repositories = await Repository.find({
                userId: user_id,
                ...query
            })

            return res.json(repositories);
        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: "Internal Server Error!!" })
        }
    }

    async create(req, res) {
        try {
            const { user_id } = req.params
            const { name, url } = req.body
            const users = await User.findById(user_id)
            if (!users) {
                return res.status(404).json({ message: "User Not Found" })
            }

            const repository = await Repository.findOne({
                userId: user_id,
                url
            })

            if (repository) {
                return res.status(422).json({ message: `Repository ${name} already exists` })
            }

            const newRepository = await Repository.create({
                name,
                url,
                userId: user_id
            })

            return res.status(201).json({ message: "Repository Created SuccessFuly", newRepository })

        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: "Internal Server Error!!" })
        }
    }

    async delete(req, res) {
        try {
            const { user_id, id } = req.params
            const users = await User.findById(user_id)

            if (!users) {
                return res.status(404).json({ message: "User Not Found" })
            }

            const repository = await Repository.findOne({
                userId: user_id,
                id
            })

            if (!repository) {
                return res.status(404).json({ message: "Repository Not Found" })
            }

            await repository.deleteOne()

            res.status(200).json({ message: 'Repository SuccessFuly Deleted' })

        } catch (err) {
            console.error(err)
            return res.status(500).json({ error: "Internal Server Error!!" })
        }
    }
}

export default new RepositoriesController()