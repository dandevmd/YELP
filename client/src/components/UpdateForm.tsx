import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/typedHooks";
import {
  getRestaurantById,
  resetInitialState,
  updateRestaurant,
} from "../store/reducers/restaurant/restaurantReducer";

const UpdateForm = () => {
  const { restaurant,  isSuccess, isError, message } = useAppSelector(
    (state) => state.restaurant
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    location: "",
    price_range: 0,
  });

  useEffect(() => {
    dispatch(getRestaurantById(Number(id)));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const withID = {
      ...newRestaurant,
      id: Number(id),
    };
    dispatch(updateRestaurant(withID));
    if (isSuccess) {
      alert("Restaurant updated successfully");
      navigate("/");
    }
    if (isError) {
      alert(message);
    }
  };

  useEffect(() => {
    resetInitialState();
  }, [handleSubmit]);

  useEffect(() => {
    if (restaurant) {
      setNewRestaurant({
        name: restaurant && restaurant.name,
        location: restaurant && restaurant.location,
        price_range: restaurant && restaurant.price_range,
      });
    }
  }, [restaurant]);
  

  return (
    <div className="container-xl my-5">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            value={newRestaurant.name}
            onChange={(e) =>
              setNewRestaurant({ ...newRestaurant, name: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            placeholder="Location"
            value={newRestaurant.location}
            onChange={(e) =>
              setNewRestaurant({ ...newRestaurant, location: e.target.value })
            }
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price_range">Price Range</label>
          <input
            type="number"
            className="form-control"
            id="price_range"
            placeholder="Price Range"
            min={0}
            max={5}
            value={newRestaurant.price_range}
            onChange={(e) =>
              setNewRestaurant({
                ...newRestaurant,
                price_range: Number(e.target.value),
              })
            }
            required
          />
        </div>
        <button type="submit" className="btn btn-primary px-4">
          UPDATE
        </button>
      </form>
    </div>
  );
};

export default UpdateForm;
