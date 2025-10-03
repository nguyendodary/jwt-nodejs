import express from "express";
import homeController, { handleHelloWorld, handleUserPage } from "../controllers/homeController";
const router = express.Router();

const initWebRoutes = (app) => {
    router.get("/hello", homeController.handleHelloWorld)
    router.get("/user", homeController.handleUserPage)
    router.get("/", (req, res) => {
        return res.send("Hello World!");
    })

    return app.use("/", router);
}

export default initWebRoutes;