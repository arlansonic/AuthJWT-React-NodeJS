import port from "../server";

class HelloController {
    async handle(req, res) {
        return res.json({ message: `Server Is Running Port: ${port}` })
    }
}

export default new HelloController();