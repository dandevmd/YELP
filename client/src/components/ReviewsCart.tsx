import React from "react";
import { Review } from "../appTypes";
import StarRating from "./StarRating";

interface ReviewCartProps {
  review:Review
}

const ReviewsCart:React.FC<ReviewCartProps> = ({review}) => {
  return (
    <div className="row row-col-3 mb-4 m-2">
      <div
        style={{ minWidth: "250px" }}
        className="card text-white bg-primary mr-2"
      >
        <div className="card-header d-flex justify-content-between mb-3">
          <span>{review.name}</span>
          <span>
            <StarRating rating={review.rating} />
          </span>
        </div>
        <div className="card-body">
          <p className="card-text">{review.body}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCart;
