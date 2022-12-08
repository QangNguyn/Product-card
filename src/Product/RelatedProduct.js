import React from "react";
import { BsFillBagCheckFill } from "react-icons/bs";
import { SlSizeFullscreen } from "react-icons/sl";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import "./Product.scss";
import { Col } from "react-bootstrap";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation } from "swiper";

import "swiper/css/pagination";
export default function RelatedProduct({ data }) {
  return (
    <>
      <Swiper
        breakpoints={{
          // when window width is >= 640px
          640: {
            width: 640,
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 2,
          },
          1200: {
            width: 1200,
            slidesPerView: 4,
          },
        }}
        slidesPerView={4}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {data.map((product) => (
          <SwiperSlide key={product.id} className="col-6">
            <div>
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
                </div>
                <div className="product-card__like-btn">
                  <AiOutlineHeart />
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
