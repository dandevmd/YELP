import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/typedHooks";
import { getRestaurantById } from "../../store/reducers/restaurant/restaurantReducer";
import { useParams } from "react-router-dom";

import ReviewsCart from "../../components/ReviewsCart";
import AddReview from "../../components/AddReview";
import StarRating from "../../components/StarRating";

import { Review } from "../../appTypes";

const DetailsPage = () => {
  const { restaurant, reviews, isSuccess, isError, message } = useAppSelector(
    (state) => state.restaurant
  );
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [resDetails, setResDetails] = useState({
    name: "",
    location: "",
    price_range: 0,
  });

  useEffect(() => {
    dispatch(getRestaurantById(Number(id)));
  }, []);

  useEffect(() => {
    if (restaurant) {
      setResDetails({
        name: restaurant && restaurant.name,
        location: restaurant && restaurant.location,
        price_range: restaurant && restaurant.price_range,
      });
    }
  }, [restaurant]);

  const calcTheAvg = (reviews: Review[]) => {
    let rat: number = 0;
    let avg: number = 0;

    reviews &&
      reviews.map((review: Review) => {
        rat += review.rating;
        avg = rat / reviews.length;
      });

    return avg;
  };

  const AVG = calcTheAvg(reviews);

  return (
    <>
      <div className="d-flex flex-wrap justify-content-center my-3 ">
        <div className="flex-column">
          <h1>{restaurant.name}</h1>
          <div>
            <StarRating rating={AVG} /> <span>({reviews.length})</span>
          </div>
        </div>
      </div>
      <div className="d-flex m-3">
        {reviews &&
          reviews.map((review: Review) => (
            <ReviewsCart key={review.id} review={review} />
          ))}
      </div>

      <AddReview />
    </>
  );
};

export default DetailsPage;
