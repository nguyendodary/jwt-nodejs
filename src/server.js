require("dotenv").config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from 'body-parser';
import connection from "./config/connectDB";
import initApiRoutes from "./routes/api";
import configCORS from "./config/cors";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

configCORS(app);

app.options('*', cors());

configViewEngine(app);
connection();

app.use(cookieParser());

initWebRoutes(app);
initApiRoutes(app);

app.use((req,res)=>{
    return res.send("404 not found")
})

app.listen(PORT, () => {
    console.log("App is running on PORT", PORT);
});
