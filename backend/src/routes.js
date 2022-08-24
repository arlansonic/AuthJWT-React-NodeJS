import { Router } from "express";
import Server from "./controllers/ServerIsRunningController";
import UsersController from "./controllers/UsersController";
const routes = new Router()

routes.get('/server', Server.handle)

// RestFull
routes.get('/users', UsersController.index)
routes.get('/users/:id', UsersController.search)
routes.post('/users', UsersController.create)
routes.put('/users/:id', UsersController.update)
routes.delete('/users/:id', UsersController.delete)

export default routes