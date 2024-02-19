import React, { useEffect, useState } from "react";
import HomeCard from "../Components/HomeCard";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

function ProductOutlet() {
  const [text, setText] = useState("");
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [updateBadge] = useOutletContext();

  const predefinedRanges = [
    { label: "All Prices", value: "" },
    { label: "Under 100", value: "0-100" },
    { label: "100 to 500", value: "100-500" },
    { label: "500 to 1000", value: "500-1000" },
    { label: "Above 1000", value: "1000-100000" },
  ];

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then(function (response) {
        setProducts([...response.data.products]);
        setFilteredProducts([...response.data.products]);
      })
      .catch(function (error) {
        console.log(error.response.data);
      });
  }, []);

  const handleFilter = () => {
    if (priceRange === "") {
      setFilteredProducts(products);
      return;
    }

    const range = priceRange.split("-");
    const filtered = products.filter(
      (product) =>
        product.price >= parseInt(range[0]) &&
        product.price <= parseInt(range[1])
    );
    setFilteredProducts(filtered);
  };

  const handleClick = () => {
    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleChange = (value) => {
    setText(value);
    value === "" && setFilteredProducts(products);
  };

  return (
    <div className="card-container">
      <div className="container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Product name"
            className="search-input"
            value={text}
            onChange={(e) => handleChange(e.target.value)}
          />
          <button className="search-button" onClick={handleClick}>
            Search
          </button>
        </div>
        <div className="filter">
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          >
            {predefinedRanges.map((range, index) => (
              <option key={index} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <button onClick={handleFilter}>Filter</button>
        </div>
      </div>
      {filteredProducts.map((item, index) => (
        <HomeCard
          updateBadge={updateBadge}
          thumbnail={item.thumbnail}
          discount={item.discountPercentage}
          name={item.title}
          description={item.description}
          price={item.price}
          rating={item.rating}
          key={item.id}
        />
      ))}
    </div>
  );
}

export default ProductOutlet;
