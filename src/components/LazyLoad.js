import React, { Suspense, useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const LazyLoadedProducts = React.lazy(() => import("./LazyLoadedProducts"));

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const productsPerPage = 12;
  const seconds = 2000;
  const cycle = 4;

  useEffect(() => {
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      setTimeout(() => {
        setLoading(false);
      }, seconds);
    }
    return () => {};
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentIndex < cycle) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(timer);
      }
    }, seconds);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const fetchProducts = async (pageNum) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/products?page=${pageNum}&limit=${productsPerPage}`
      );

      const newProducts = response.data.product;

      const uniqueNewProducts = newProducts.filter(
        (newProduct) =>
          !products.some(
            (existingProduct) => existingProduct.id === newProduct.id
          )
      );

      if (uniqueNewProducts.length > 0) {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      }

      return response.data.product;
    } catch (error) {
      setError("Error fetching products.");
      return [];
    }
  };

  return (
    <div>
      <div className="divFixed">Product loaded: {products.length} / 48</div>
      {loading ? (
        <Loading />
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <Container className="mb-5">
          <Row>
            {[...Array(cycle)].map((_, index) =>
              index + 1 <= currentIndex ? (
                <>
                  <Suspense key={index + 1} fallback={<Loading />}>
                    <LazyLoadedProducts
                      fetchData={() => fetchProducts(index + 1)}
                    />
                  </Suspense>
                </>
              ) : null
            )}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Products;
