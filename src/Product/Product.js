import React, { useState, useEffect } from "react";
import { BsFillBagCheckFill } from "react-icons/bs";
import { SlSizeFullscreen } from "react-icons/sl";
import { AiFillStar, AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import "./Product.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Product() {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [idProducts, setIdProducts] = useState([]);
  const [cart, setCart] = useState(cartFromLocalStorage);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handlCheckIcon = (id) => {
    setIdProducts((pre) => {
      if (idProducts.includes(id)) {
        return idProducts.filter((item) => item !== id);
      } else {
        return [...pre, id];
      }
    });
  };
  const handleAddCart = (product) => {
    if (
      cart.length === 0 ||
      !cart.some((pro) => pro.productId === product.id)
    ) {
      setCart((preCart) => [
        ...preCart,
        { productId: product.id, quantity: 1 },
      ]);
    } else {
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].productId === product.id) {
          cart[i] = { ...cart[i], quantity: cart[i].quantity + 1 };
          setCart((pre) => {
            return [...pre];
          });
          break;
        }
      }
    }
    toast.success("Add to cart successfully!!", { autoClose: 2000 });
  };
  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products/")
      .then((res) => setProducts(res.data));
  }, []);
  return (
    <Container className="product-wrap">
      <Row>
        <button
          onClick={() => {
            navigate("cart");
          }}
        >
          View cart
        </button>
        {products.length > 0
          ? products.map((product) => (
              <Col xl={3} lg={4} md={6} sm={6} key={product.id}>
                <div className="product-card">
                  <div
                    className="product-card__img"
                    onClick={() => {
                      navigate(`product/${product.id}`);
                    }}
                  >
                    <img src={product.image} />
                    <div className="product-card__img--actions-wrap">
                      <div
                        className="img__add-cart"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddCart(product);
                        }}
                      >
                        <BsFillBagCheckFill className="img__icon" />
                        <span>Add to bag</span>
                      </div>
                      <div className="img__view-more">
                        <SlSizeFullscreen className="img__icon" />
                        <span>Quick view</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="product-card__like-btn"
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
                  <div
                    className="product-card__info"
                    onClick={() => {
                      navigate(`product/${product.id}`);
                    }}
                  >
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
        <ToastContainer />
      </Row>
    </Container>
  );
}
