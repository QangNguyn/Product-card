import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Detail.scss";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import { BsFillBagCheckFill } from "react-icons/bs";
import { AiFillStar, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import RelatedProduct from "./RelatedProduct";

export default function Detail() {
  const param = useParams();
  const [detailProduct, setDetailProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [isShowDes, setIsShowDes] = useState(false);
  const [count, setCount] = useState(0);
  const [isShowFAQ, setIsShowFAQ] = useState(false);
  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${param.id}`)
      .then((res) => setDetailProduct(res.data));
  }, []);
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data);
    });
  }, []);
  let relatedProductArr = products.filter(
    (product) =>
      product.category === detailProduct.category &&
      product.id !== detailProduct.id
  );
  return (
    <div>
      {Object.getOwnPropertyNames(detailProduct).length !== 0 ? (
        <Container>
          <Row className="product-detail mt-5">
            <Col xl={7}>
              <div className="product-detail__img">
                <img src={detailProduct.image} />
              </div>
            </Col>
            <Col xl={5}>
              <div className="product-detail__info">
                <h2 className="product-detail__info--name">
                  {detailProduct.title}
                </h2>
                <div className="product-detail__info--preview">
                  <div className="info__wrap">
                    <div className="info__price">${detailProduct.price}</div>
                    <div className="info__rating">
                      <AiFillStar className="star-icon" />
                      <span className="info__rating--rate">
                        {detailProduct.rating.rate}
                      </span>
                      <span className="info__rating--count">
                        <span>&#8901;</span>
                        <span>{detailProduct.rating.count} Reviews</span>
                      </span>
                    </div>
                  </div>
                  <div className="info__actions">
                    <div className="info__actions--count-btn">
                      <div>
                        <span>-</span>
                      </div>
                      <span>{count}</span>
                      <div
                        onClick={() => {
                          setCount(count + 1);
                        }}
                      >
                        <span>+</span>
                      </div>
                    </div>
                    <div className="info__actions--addcart-btn">
                      <BsFillBagCheckFill className="bag-icon" />
                      <span>Add to carrt</span>
                    </div>
                  </div>
                  <div className="info__description">
                    <div
                      className="info__description--btn"
                      onClick={() => {
                        setIsShowDes(!isShowDes);
                      }}
                    >
                      <span>Description</span>
                      <AiOutlinePlus
                        className={!isShowDes ? "btn-icon active" : "btn-icon"}
                      />
                      <AiOutlineMinus
                        className={isShowDes ? "btn-icon active" : "btn-icon"}
                      />
                    </div>
                    <div className="info__description--content">
                      <p className={isShowDes ? "active" : ""}>
                        {detailProduct.description}
                      </p>
                    </div>
                  </div>
                  <div className="info__FAQ">
                    <div
                      className="info__FAQ--btn"
                      onClick={() => {
                        setIsShowFAQ(!isShowFAQ);
                      }}
                    >
                      <span>FAQ</span>
                      <AiOutlinePlus
                        className={!isShowFAQ ? "btn-icon active" : "btn-icon"}
                      />
                      <AiOutlineMinus
                        className={isShowFAQ ? "btn-icon active" : "btn-icon"}
                      />
                    </div>
                    <ul
                      className={`info__FAQ--content ${
                        isShowFAQ ? "active" : ""
                      }`}
                    >
                      <li>
                        All full-priced, unworn items, with tags attached and in
                        their original packaging are eligible for return or
                        exchange within 30 days of placing your order.
                      </li>
                      <li>
                        Please note, packs must be returned in full. We do not
                        accept partial returns of packs.
                      </li>
                      <li>
                        Want to know our full returns policies? Here you go.
                      </li>
                      <li>
                        Want more info about shipping, materials or care
                        instructions? Here!
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <h2 className="title mt-5">Customers also purchased</h2>
          <div className="row">
            <RelatedProduct data={relatedProductArr} />
          </div>
        </Container>
      ) : (
        <div className="loading__wrap">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}
