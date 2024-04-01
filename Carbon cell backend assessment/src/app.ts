import express, {request, response} from "express";
const app = express();
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {config} from "dotenv";
config()

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports
import user from "./routes/user.routes";
import data from "./routes/data.routes";

app.use("/api/v1/user", user);
app.use("/api/v1/data", data);


export default app
