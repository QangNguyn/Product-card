import axios from "axios";
import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";

export default function Cart() {
  const productInCart = JSON.parse(localStorage.getItem("cart"));
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products/").then((res) => {
      res.data.filter((pro) => {});
    });
  }, []);
  return (
    <Container>
      <Row>
        <h2>Shopping cart</h2>
        <hr />
      </Row>
    </Container>
  );
}
