import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ProductCard from "./ProductCard";
import axios from "axios";

const ProductContainer = ({ product }) => {
  const [products, setProducts] = useState([]);
  const url = "https://www.aroundweb.it/cart-react/products.json";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const productArray = response.data;
        setProducts(productArray.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const rows = [products.slice(0, 4), products.slice(4, 8)];

  return (
    <Container className="mb-5">
      {rows.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((item, colIndex) => (
            <Col xs={12} sm={6} md={4} lg={3} key={colIndex} className="text-center">
              <ProductCard product={item} key={item.id} />
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
};

export default ProductContainer;
