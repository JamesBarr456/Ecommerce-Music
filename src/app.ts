import express from "express";
import router from "./routes";

// const HOST = process.env.HOST || 'localhost'

const app = express();

app.use(express.json());

app.use("/api", router);
export default app;
