import React from "react";
import { Rating } from "react-simple-star-rating";

const StarRating = (ratings) => {
  const rating = Object.values(ratings).toString();
  return (
    <Rating
      initialValue={rating}
      readonly={true}
      allowFraction={true}
      fillColor="red"
      iconsCount={5}
      name="rating"
      size="15px"
    />
  );
};

export default StarRating;
