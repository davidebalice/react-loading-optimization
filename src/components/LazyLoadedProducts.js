import React, { useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import ProductCard from "./ProductCard";

const LazyLoadedProducts = ({ fetchData }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await fetchData();
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [fetchData]);

  return (
    <>
      {!loading && (
        <>
          {products.map((product) => (
            <Col
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={product.id}
              className="text-center"
            >
              <ProductCard product={product} />
            </Col>
          ))}
        </>
      )}
    </>
  );
};

export default LazyLoadedProducts;
