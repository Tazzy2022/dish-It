import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FilterPriceSearch = () => {
  const auth = useSelector((state) => state.auth);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const filterPriceSearch = () => {
    console.log("hi");
  };
  return (
    <form id="price-form" onSubmit={filterPriceSearch}>
      <p>Filter by price:</p>
      <section className="checkbox-container">
        <input type="checkbox" className="filter-price-checkbox" />
        <label>$</label>
        <input type="checkbox" className="filter-price-checkbox" />
        <label>$$</label>
        <input type="checkbox" className="filter-price-checkbox" />
        <label>$$$</label>
      </section>
      <button>update</button>
    </form>
  );
};

export default FilterPriceSearch;
