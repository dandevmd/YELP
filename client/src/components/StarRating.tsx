import React from "react";

const StarRating = ({ rating }: { rating: number }) => {
  let star = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      star.push(<i key={Math.random()} className="fas fa-star text-warning" />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      star.push(<i key={Math.random()} className="fas fa-star-half-alt text-warning" />);
    } else {
      star.push(<i key={Math.random()} className="far fa-star text-warning" />);
    }
  }

  return <>{star}</>;
};

export default StarRating;
