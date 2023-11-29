import React from "react";

const CategoriesCard = (props) => {
  let searchCategories;
  let searchtitles = [];

  if (props.category.length > 1) {
    for (const key in props.category) {
      searchtitles.push(props.category[key].title);
      searchCategories = searchtitles.join(", ").toString();
    }
  } else if (props.category.length > 0) {
    searchCategories = props.category.title;
  }

  return <p>{searchCategories}</p>;
};

export default CategoriesCard;
