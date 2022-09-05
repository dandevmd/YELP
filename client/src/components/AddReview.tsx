import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/typedHooks";
import { addReview } from "../store/reducers/restaurant/restaurantReducer";

const AddReview = () => {
  const {user} = useAppSelector((state)=>state.user)
  const dispatch = useAppDispatch();
  const params = useParams();
  const [formInfo, setFormInfo] = useState({
    name: "",
    rating: 0,
    review: "",
  });
  const restaurantID = Number(params.id)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const reviewWithRestID = {
      review:{
        ...formInfo
      },
      restaurant_id:restaurantID
    }
    console.log(reviewWithRestID, 'reviewWithRestID')
    if (formInfo.name && formInfo.rating && formInfo.review) {
      dispatch(addReview(reviewWithRestID));
    } else {
      alert("Please fill out all fields");
    }
  };
  

  return  user && (<div
      style={{
        margin: "0 5%",
      }}
    >
      <form onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-group col-8">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name..."
              className="form-control"
              value={formInfo.name}
              onChange={(e) =>
                setFormInfo({ ...formInfo, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group col-4">
            <label htmlFor="rating">Rating</label>
            <select
              required
              value={formInfo.rating}
              onChange={(e) =>
                setFormInfo({ ...formInfo, rating: Number(e.target.value) })
              }
              id="rating"
              className="custom-select"
            >
              <option value="" selected hidden>
                Select Rating
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <div className="form-group" style={{ width: "100%" }}>
            <label htmlFor="Review">Review</label>
            <textarea
              name="review"
              id="review"
              className="form-control"
              style={{ resize: "none" }}
              value={formInfo.review}
              onChange={(e) =>
                setFormInfo({ ...formInfo, review: e.target.value })
              }
              placeholder="Enter your review..."
              required
            />
          </div>
        </div>

        <button className="btn btn-primary btn-lg" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
};

export default AddReview;
