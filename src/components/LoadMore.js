import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Loading from "../components/Loading";

const LoadMore = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [finishLoad, setFinishLoad] = useState(false);
  const [page, setPage] = useState(1);
  const productsPerPage = 8;

  const fetchProducts = async (pageNum) => {
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/products?page=${pageNum}&limit=${productsPerPage}`
      );

      const newProducts = response.data.product;

      if (newProducts.length > 0) {
        const filteredNewProducts = newProducts.filter(
          (newProduct) =>
            !products.some(
              (existingProduct) => existingProduct.id === newProduct.id
            )
        );

        setProducts((prevProducts) => [
          ...prevProducts,
          ...filteredNewProducts,
        ]);
        setPage(pageNum + 1);
      } else {
        console.log("No more products available.");
        setFinishLoad(true);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, []);

  const handleLoadMore = () => {
    fetchProducts(page);
  };

  return (
    <div>
      <div className="divFixed">
        Product loaded: {products.length} / 52
      </div>
      <Container className="mb-5">
        <Row>
          {products && products.map((product, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={index} className="text-center">
              <ProductCard product={product}/>
            </Col>
          ))}
      </Row>
      </Container>
      {loading && <><Loading/></>}
      {!finishLoad && (
        <>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            {loading ? <p>Loading...</p> : null}         
          </div>
          <div className="buttonContainer">
            <button onClick={handleLoadMore} disabled={loading} className="buttonLoad">
              {loading ? 'Loading...' : 'Load more'}
            </button>
          </div>
        </>
      )} 
     
      {finishLoad && <p className="message">All products are loaded</p>}
    </div>
  );
};

export default LoadMore;
