import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/typedHooks";
import { createRestaurant } from "../store/reducers/restaurant/restaurantReducer";
import { decryptUserId } from "../utils";


const AddRestaurant = () => {
  const { user } = useAppSelector((state) => state.user);
  const {id:userId} = decryptUserId(user.token);
  const dispatch = useAppDispatch();
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    location: "",
    price_range: 0,
    user_id: userId
  });

  const addNewRestaurant = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(newRestaurant.name && newRestaurant.location && newRestaurant.price_range) {
      dispatch(createRestaurant(newRestaurant));
    } else {
      alert("Please fill out all fields");
    }
  };


  return (
    <div className="mb-4">
      <form onSubmit={addNewRestaurant}>
        <div className="form-row">
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Restaurant Name"
              onChange={(e) =>
                setNewRestaurant({ ...newRestaurant, name: e.target.value })
              }
            />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              placeholder="Restaurant Location"
              onChange={(e) =>
                setNewRestaurant({ ...newRestaurant, location: e.target.value })
              }
            />
          </div>
          <div className="col">
            <select
              className="custom-select  mr-sm-2"
              onChange={(e) =>
                setNewRestaurant({
                  ...newRestaurant,
                  price_range: Number(e.target.value),
                })
              }
            >
              <option value="" selected disabled hidden>
                Choose here
              </option>{" "}
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <button className="btn btn-primary px-4" type="submit">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
