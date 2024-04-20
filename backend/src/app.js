import express from "express";
import cors from "cors";

//import ItemRoute from "./routes/itemRoute.js";
//import MemberRoute from "./routes/memberRoute.js";
import ResultRoute from "./routes/resultRoute.js";
const app = express();

// body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// allow request from other origin (Frontend which is at different port)
app.use(cors());

// use routes
//app.use("/items", ItemRoute);
app.use("/results", ResultRoute);

export default app;
