import express, { Express, Request, Response, NextFunction } from "express";
import "dotenv/config";
import routes from "./routes";
import morgan from "morgan";
import cors from "cors";

//initialize port
const PORT = 3001;

//initialize express
const app: Express = express();

//initialize middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

//initialize routes
app.use("/api", routes);


//run the server on port 3000
app.listen(PORT, () => {
  console.log(`Hello mazahaka. You are running on port ${PORT}`);
});
