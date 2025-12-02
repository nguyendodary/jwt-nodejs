import cors from "cors";
require("dotenv").config();

const configCORS = (app) => {
    const origin = process.env.REACT_URL || "http://localhost:3000";

    console.log("CORS Origin:", origin);

    app.use(
        cors({
            origin: "http://localhost:3000",
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],

        })
    );
};

export default configCORS;