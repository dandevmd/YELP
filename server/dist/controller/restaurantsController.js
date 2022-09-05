"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantsController = void 0;
const index_1 = require("../db/index");
class RestaurantsController {
    constructor() {
        this.createRestaurant = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, location, price_range, user_id } = req.body;
                console.log(user_id);
                const newRestaurant = yield index_1.pool.query("INSERT INTO restaurants (name, location, price_range, user_id) VALUES ($1, $2, $3,$4) RETURNING *", [name, location, price_range, user_id]);
                res.status(201).json({
                    message: "Restaurant created successfully",
                    newRestaurant: newRestaurant.rows[0],
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        message: error.message,
                    });
                }
                console.log(error);
            }
        });
        this.getRestaurants = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield index_1.pool.query("select * from restaurants left join (select restaurant_id,TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;      ");
                res.status(200).json({
                    status: "success",
                    results: result.rows.length,
                    data: result.rows,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(404).json({
                        status: "error",
                        message: error.message,
                    });
                }
            }
        });
        this.getRestaurant = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const restaurant = yield index_1.pool.query("SELECT * FROM restaurants WHERE id = $1", [id]);
                const reviews = yield index_1.pool.query("SELECT * FROM reviews WHERE restaurant_id = $1", [id]);
                res.status(200).json({
                    status: "success",
                    restaurant: restaurant.rows[0],
                    reviews: reviews.rows,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(404).json({
                        status: "error",
                        message: error.message,
                    });
                    console.log(error);
                }
            }
        });
        this.updateRestaurant = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, location, price_range } = req.body;
                const result = yield index_1.pool.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *", [name, location, price_range, id]);
                res.status(200).json({
                    status: "success",
                    data: result.rows[0],
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        status: "error",
                        message: error.message,
                    });
                }
            }
        });
        this.deleteRestaurant = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield index_1.pool.query("DELETE FROM restaurants WHERE id = $1 RETURNING *", [id]);
                res.status(200).json({
                    status: "success",
                    data: result.rows[0],
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(404).json({
                        status: "error",
                        message: error.message,
                    });
                    console.log(error);
                }
            }
        });
        this.addReviewToRestaurant = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, rating, review } = req.body;
            try {
                const result = yield index_1.pool.query("INSERT INTO reviews (restaurant_id, name, rating, body) values ($1, $2, $3, $4) RETURNING *", [id, name, rating, review]);
                res.status(201).json({
                    status: "Review added successfully",
                    data: result.rows[0],
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        status: "'Adding review wasn't possible",
                        message: error.message,
                    });
                }
                console.log(error);
            }
        });
    }
}
exports.restaurantsController = new RestaurantsController();
