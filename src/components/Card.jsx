import React from "react";

const Card = ({ image, title, price }) => {
  return (
    <div className="card-container">
      <div className="image- container">
        <img src={image} alt={title} className="product-image" />
      </div>
      <div className="product-title"> {title}</div>
      <div className="product-price"> {price}</div>
    </div>
  );
};

export default Card;
