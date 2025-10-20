import express from "express";
import apiController from "../controllers/apiController";
const router = express.Router();

const initApiRoutes = (app) => {

    router.get("/test-api", apiController.testApi);
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.get("/", (req, res) => {
        return res.send("Hello World");
    })

    return app.use("/api/v1", router);
}

export default initApiRoutes;