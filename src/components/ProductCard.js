import React from "react";
import Card from "react-bootstrap/Card";
import classes from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const integerPart = Math.floor(product.price).toLocaleString("it-IT", {
    currency: "EUR",
  });
  
  const decimalPart = (product.price % 1).toFixed(2).substring(2);

  return (
    <Card className={classes.card + " w-100"}>
      <Card.Img variant="top" src={product.photo} className={classes.img} />
      <Card.Body>
        <Card.Title className={classes.cardTitle}>
          {product.name}
        </Card.Title>
        <Card.Text className={classes.cardText}>
          {product.description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;