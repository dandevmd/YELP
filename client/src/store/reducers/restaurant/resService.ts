import axios from "axios";
import { NewRestaurant } from "../../../appTypes";

export const API_URL = "http://localhost:3001/api/";

// get all restaurants from backend
const getRestaurants = async () => {
  const response = await axios.get(API_URL + "restaurants");
  return response.data;
};

// get restaurant by id from backend
const getRestaurantById = async (id: number) => {
  const response = await axios.get(API_URL + "restaurants/" + id);
  return response.data;
};

// create restaurant in backend
const createRestaurant = async (restaurant: NewRestaurant) => {
  const response = await axios.post(API_URL + "restaurants", restaurant);
  return response.data;
};

// update restaurant in backend
const updateRestaurant = async (restaurant: {
  id: number;
  name: string;
  location: string;
  price_range: number;
}) => {
  const response = await axios.put(
    API_URL + "restaurants/" + restaurant.id,
    restaurant
  );
  return response.data;
};

//delete restaurant in backend
const deleteRestaurant = async (id: number) => {
  const response = await axios.delete(API_URL + "restaurants/" + id);
  return response.data;
};

// add review to restaurant
const addReviewToRestaurant = async (review: {
  restaurant_id: number;
  review: {
    name: string;
    rating: number;
    review: string;
  };
}) => {
  const response = await axios.post(
    API_URL + "restaurants/" + review.restaurant_id + "/addReview",
    review.review
  );

  return response.data;
};

export const restaurantService = {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  addReviewToRestaurant,
};
