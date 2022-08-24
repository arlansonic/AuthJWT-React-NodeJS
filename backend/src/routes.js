import { Router } from "express";
import Server from "./controllers/ServerIsRunningController";

const routes = new Router()

routes.get('/server', Server.handle)

export default routes