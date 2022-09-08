import { Router } from "express";
import Server from "./controllers/ServerIsRunningController";
import UsersController from "./controllers/UsersController";
import SessionController from './controllers/SessionsController'
import RepositoriesController from "./controllers/RepositoriesController";
import auth from "./middlewares/auth";
const routes = new Router()

// Teste Server
routes.post('/sessions', SessionController.create)
routes.get('/server', Server.handle)
routes.use(auth) //Middleware apartir daqui está tudo bloqueado

// RestFull
routes.get('/users', UsersController.index)
routes.get('/users/:id', UsersController.search)
routes.post('/users', UsersController.create)
routes.put('/users/:id', UsersController.update)
routes.delete('/users/:id', UsersController.delete)

// RepositoRy
routes.get('/users/:user_id/repositories', RepositoriesController.index)
routes.post('/users/:user_id/repositories', RepositoriesController.create)
routes.delete('/users/:user_id/repositories/:id', RepositoriesController.delete)

export default routes