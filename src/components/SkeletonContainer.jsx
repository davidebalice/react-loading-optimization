import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SkeletonCard from "./SkeletonCard";
import classes from "./ProductCard.module.css";
import classes2 from "./Skeleton.module.css";

const SkeletonContainer = ({cards}) => {
  return (
    <Container className="mb-5">
      {console.log(cards)}
      <Row>
        {[...Array(cards)].map((_, index) => (
           <Col xs={12} sm={6} md={4} lg={3} key={index} className="text-center">
            <SkeletonCard />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SkeletonContainer;
