"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const routes_1 = __importDefault(require("./routes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
//initialize port
const PORT = 3001;
//initialize express
const app = (0, express_1.default)();
//initialize middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
//initialize routes
app.use("/api", routes_1.default);
//run the server on port 3000
app.listen(PORT, () => {
    console.log(`Hello mazahaka. You are running on port ${PORT}`);
});
