import React, { useState, useEffect } from "react";
import { BsFillBagCheckFill } from "react-icons/bs";
import { SlSizeFullscreen } from "react-icons/sl";
import { AiFillStar, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./Product.scss";
import { Container, Row, Col } from "react-bootstrap";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [idProducts, setIdProducts] = useState([]);
  const handlCheckIcon = (id) => {
    setIdProducts((pre) => {
      if (idProducts.includes(id)) {
        return idProducts.filter((item) => item !== id);
      } else {
        return [...pre, id];
      }
    });
  };
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  return (
    <Container className="product-wrap">
      <Row>
        {products.length > 0
          ? products.map((product) => (
              <Col xl={3} lg={4} md={6} sm={6} key={product.id}>
                <div className="product-card">
                  <div className="product-card__img">
                    <img src={product.image} />
                    <div className="product-card__img--actions-wrap">
                      <div className="img__add-cart">
                        <BsFillBagCheckFill className="img__icon" />
                        <span>Add to bag</span>
                      </div>
                      <div className="img__view-more">
                        <SlSizeFullscreen className="img__icon" />
                        <span>Quick view</span>
                      </div>
                    </div>
                    <div
                      className="product-card__img--like-btn"
                      onClick={() => {
                        handlCheckIcon(product.id);
                      }}
                    >
                      {idProducts.includes(product.id) ? (
                        <AiFillHeart style={{ color: "red" }} />
                      ) : (
                        <AiOutlineHeart style={{ color: "red" }} />
                      )}
                    </div>
                  </div>
                  <div className="product-card__info">
                    <p className="product-card__info-name">{product.title}</p>
                    <p className="product-card__info-category">
                      {product.category}
                    </p>
                    <div className="product-card__info-footer">
                      <div className="info__price">
                        <span>${product.price}</span>
                      </div>
                      <div className="info__rating">
                        <AiFillStar className="star-icon" />
                        <span>
                          {product.rating.rate} ({product.rating.count} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            ))
          : null}
      </Row>
    </Container>
  );
}
