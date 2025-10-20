import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from 'body-parser';
import connection from "./config/connectDB";
import initApiRoutes from "./routes/api";
import configCORS from "./config/cors";

const app = express();
const PORT = process.env.PORT || 8080;

configCORS(app);

configViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connection();

initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
    console.log("App is running on PORT", PORT);
})