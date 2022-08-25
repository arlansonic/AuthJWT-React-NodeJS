import { Router } from "express";
import Server from "./controllers/ServerIsRunningController";
import UsersController from "./controllers/UsersController";
import RepositoriesController from "./controllers/RepositoriesController";
import auth from "./middlewares/auth";
const routes = new Router()

// Teste Server
routes.get('/server', Server.handle)
routes.use(auth)

// RestFull
routes.get('/users', UsersController.index)
routes.get('/users/:id', UsersController.search)
routes.post('/users', UsersController.create)
routes.put('/users/:id', UsersController.update)
routes.delete('/users/:id', UsersController.delete)

// RepositoRy
routes.get('/users/:user_id/repositories', RepositoriesController.index)
routes.post('/users/:user_id/repositories', RepositoriesController.create)
routes.delete('/users/:user_id/repositories', RepositoriesController.delete)


export default routes