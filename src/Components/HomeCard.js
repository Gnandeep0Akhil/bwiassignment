import React, { useEffect, useState } from "react";

function HomeCard({
  updateBadge,
  thumbnail,
  discount,
  name,
  description,
  price,
  rating,
}) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const newStars = [];

    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        newStars.push(
          <span key={i} className="star filled">
            &#9733;
          </span>
        );
      } else if (i === Math.floor(rating) && rating % 1 !== 0) {
        newStars.push(
          <span key={i} className="star">
            &#9733;
          </span>
        );
      } else {
        newStars.push(
          <span key={i} className="star">
            &#9734;
          </span>
        );
      }
    }
    setStars(newStars);
  }, [rating]);

  const addToCart = (button) => {
    const item = {
      name: name,
      price: price,
      rating: rating,
    };
    updateBadge(item);
    button.innerText = "Added!";
    button.classList.add("added-to-cart");
    button.setAttribute("disabled", "disabled");
  };

  return (
    <div className="product-card">
      <div>
        <div className="thumbnail">
          <img src={thumbnail} alt="Product Thumbnail" />
        </div>
        <div className="add-to-cart-button">
          <button onClick={(e) => addToCart(e.target)}>Add to Cart</button>
        </div>
      </div>
      <div className="product-details">
        <div className="name">{name}</div>
        <div className="description">{description}</div>
        <div className="price">
          &#8377;{price}
          {"          "}
          {!!discount && (
            <span className="discount-label">{discount}% Off</span>
          )}
        </div>
        <div className="rating">
          <span className="numero">{Number(rating).toFixed(1)} </span>
          {"          "}
          {stars}
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
