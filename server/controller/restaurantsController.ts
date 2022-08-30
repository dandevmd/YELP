import { Request, Response } from "express";
import { pool } from "../db/index";

class RestaurantsController {
  createRestaurant = async (req: Request, res: Response) => {
    try {
      const { name, location, price_range } = req.body;
      const newRestaurant = await pool.query(
        "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
        [name, location, price_range]
      );
      res.status(201).json({
        message: "Restaurant created successfully",
        newRestaurant: newRestaurant.rows[0],
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message,
        });
      }
      console.log(error);
    }
  };
  getRestaurants = async (req: Request, res: Response) => {
    try {
      const result = await pool.query(
        "select * from restaurants left join (select restaurant_id,TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;      "
      );

      res.status(200).json({
        status: "success",
        results: result.rows.length,
        data: result.rows,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({
          status: "error",
          message: error.message,
        });
      }
    }
  };
  getRestaurant = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const restaurant = await pool.query(
        "SELECT * FROM restaurants WHERE id = $1",
        [id]
      );
      const reviews = await pool.query(
        "SELECT * FROM reviews WHERE restaurant_id = $1",
        [id]
      );
      res.status(200).json({
        status: "success",
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({
          status: "error",
          message: error.message,
        });
        console.log(error);
      }
    }
  };
  updateRestaurant = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, location, price_range } = req.body;
      const result = await pool.query(
        "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
        [name, location, price_range, id]
      );
      res.status(200).json({
        status: "success",
        data: result.rows[0],
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          status: "error",
          message: error.message,
        });
      }
    }
  };
  deleteRestaurant = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await pool.query(
        "DELETE FROM restaurants WHERE id = $1 RETURNING *",
        [id]
      );
      res.status(200).json({
        status: "success",
        data: result.rows[0],
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(404).json({
          status: "error",
          message: error.message,
        });
        console.log(error);
      }
    }
  };

  addReviewToRestaurant = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, rating, review } = req.body;
    try {
      const result = await pool.query(
        "INSERT INTO reviews (restaurant_id, name, rating, body) values ($1, $2, $3, $4) RETURNING *",
        [id, name, rating, review]
      );
      res.status(201).json({
        status: "Review added successfully",
        data: result.rows[0],
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({
          status: "'Adding review wasn't possible",
          message: error.message,
        });
      }
      console.log(error);
    }
  };
}

export const restaurantsController = new RestaurantsController();
