import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/typedHooks";
import {
  resetInitialState,
  getRestaurants,
  deleteRestaurant,
} from "../store/reducers/restaurant/restaurantReducer";
import { Restaurant } from "../appTypes";
import StarRating from "./StarRating";
import { decryptUserId } from "../utils";

const RestaurantList = () => {
  const { restaurants } = useAppSelector((state) => state.restaurant);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let userId: string;
  if (user) {
    const { id } = decryptUserId(user.token);
    if (id) {
      userId = id;
    }
  }
  useEffect(() => {
    dispatch(getRestaurants());
  }, [deleteRestaurant]);

  useEffect(() => {
    resetInitialState();
  }, [deleteRestaurant, getRestaurants]);

  const editHandler = (id: number) => {
    navigate(`/restaurants/update/${id}`);
  };
  const deleteHandler = (id: number) => {
    dispatch(deleteRestaurant(id));
  };

  const handleSelect = (id: number) => {
    navigate(`/restaurants/${id}`);
  };

  return (
    <table className="table table-dark">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Location</th>
          <th scope="col">Rating</th>
          <th scope="col">Price Range</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {restaurants &&
          restaurants.map((restaurant: Restaurant) => {
            if (restaurant)
              return (
                <tr key={restaurant.id}>
                  <td scope="col">{restaurant.id}</td>
                  <td
                    scope="col"
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={() => handleSelect(restaurant.id)}
                  >
                    {restaurant.name}
                  </td>
                  <td scope="col">{restaurant.location}</td>
                  <td scope="col">
                    {restaurant.average_rating && (
                      <StarRating rating={Number(restaurant.average_rating)} />
                    )}
                  </td>
                  <td scope="col">{"$".repeat(restaurant.price_range)}</td>
                  <td scope="col">
                    {restaurant.user_id === userId ? (
                      <>
                        <button
                          className="btn btn-warning px-4 mr-5"
                          onClick={() => editHandler(restaurant.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger px-4"
                          onClick={() => deleteHandler(restaurant.id)}
                        >
                          Delete
                        </button>
                      </>
                    ) : null}
                  </td>
                </tr>
              );
          })}
      </tbody>
    </table>
  );
};

export default RestaurantList;
