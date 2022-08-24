import { Router } from "express";
import Server from "./controllers/ServerIsRunningController";

const routes = new Router()

routes.get('/hello', Server.handle)

export default routes