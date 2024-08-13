import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Loading from "../components/Loading";

const InfinityScroll = () => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const productsPerPage = 8;
  const loader = useRef(null);
  const scrollThreshold = 300;
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (
        !isScrolling &&
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - scrollThreshold
      ) {
        setIsScrolling(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!initialLoad) {
      fetchProducts();
      setInitialLoad(true);
    }
  }, [initialLoad]);

  useEffect(() => {
    if (initialLoad && page >= 2) {
      fetchProducts();
    }
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [hasMore]);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/v1/products?page=${page}&limit=${productsPerPage}`
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
      } else {
        setHasMore(false);
        console.log("No more products available.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="divFixed">Product loaded: {products.length} / 52</div>
      <Container className="mb-5">
        <Row>
          {products &&
            products.map((product, index) => (
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={index}
                className="text-center"
              >
                <ProductCard product={product} />
              </Col>
            ))}
        </Row>
      </Container>
      {loading && (
        <>
          <Loading />
        </>
      )}
      {hasMore && (
        <div ref={loader} style={{ marginTop: "20px", textAlign: "center" }}>
          {loading ? <p>Loading...</p> : null}
        </div>
      )}
      {!hasMore && <p className="message">All products are loaded</p>}
    </div>
  );
};

export default InfinityScroll;
