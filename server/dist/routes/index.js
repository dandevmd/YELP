"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurantsRouter_1 = __importDefault(require("./restaurantsRouter"));
// initialize router
const routes = (0, express_1.Router)();
//define routes from controller
routes.use('/restaurants', restaurantsRouter_1.default);
exports.default = routes;
