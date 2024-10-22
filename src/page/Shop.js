import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../style/shop.css";
import { Link, useLocation } from "react-router-dom";
import Cart from '../componenets/Cart';
import videoSrc from "../img/main.gif";
import PopupInfo from '../componenets/PopupInfo';

import img1 from "../img/img1.jpg";
import img2 from "../img/img2.jpg";
import img3 from "../img/img3.jpg";
import img4 from "../img/img4.jpg";
import img5 from "../img/img5.jpg";
import img6 from "../img/img6.jpg";
import circle1 from "../img/кольцо1.svg";
import circle2 from "../img/кольцо2.svg";
import circle3 from "../img/кольцо3.svg";
import circle4 from "../img/Кольцо4.svg";
import kolos from "../img/Колос.svg"; // Ваш SVG слоган
import Store from "../componenets/Store";
import bask from '../img/корзина белая 1.svg';
import pod from '../img/подарок.svg';
import ScrollContainer from "../componenets/scroll";
const Shop = () => {
  const [isSticky, setIsSticky] = useState(false);
  const rewardScaleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!rewardScaleRef.current) return;
      const { top, bottom } = rewardScaleRef.current.getBoundingClientRect();
      const shopContainer = document.querySelector('.shop-container');
      const { bottom: shopBottom } = shopContainer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
  
      // Проверяем, когда нижняя граница блока достигает нижней границы экрана
      if (bottom <= viewportHeight && !isSticky) {
        setIsSticky(true);
      } 
      // Проверяем, когда верхняя граница блока достигает нижней границы shop-container
      else if (isSticky && top < shopBottom) {
        setIsSticky(false);
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Запускаем обработчик сразу, чтобы установить правильное состояние
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSticky]);

  const [isCartOpen, setIsCartOpen] = useState(false);

 

  const handleCartClick = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const [isGifVisible, setIsGifVisible] = useState(true);

  useEffect(() => {
    // Установите время в зависимости от продолжительности вашего GIF
    const gifDuration = 5000; // например, 5 секунд
    const timeout = setTimeout(() => {
      setIsGifVisible(false);
    }, gifDuration);

    return () => clearTimeout(timeout); // очистить таймаут при размонтировании компонента
  }, []);

  const [isPopupOpen, setIsPopupOpen] = useState(false); // Состояние для всплывающего окна
  const handleGiftClick = () => setIsPopupOpen(true); // Открытие всплывающего окна
  const closePopup = () => setIsPopupOpen(false); // Закрытие всплывающего окна
  return (
    <>
       {isGifVisible && (
        <div className="video-container">
          <img src={videoSrc} alt="Animated GIF" />
        </div>
      )}
      {/* Слайдер */}
      <div className="shop-container">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          loop={true}
          pagination={{ clickable: true }}
          className="shop-slider"
        >
          {[img1, img2, img3, img4, img5, img6].map((src, index) => (
            <SwiperSlide key={index} className="shop-slide">
              <img src={src} alt={`Slide ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="blur-overlay-container">
          <div className="blur-overlay-top">
            <Link to="/product" className="blur-block top-left">
              <p className="opis">163</p>
              <h4>ХСЗР</h4>
              <p >Обеспечте защиту ваших культур</p>
            </Link>
            <Link to="/product" className="blur-block top-right">
              <p className="opis">24</p>
              <h4>Удобрения</h4>
              <p>Потдерживайте почву необходимыми элементами питания</p>
            </Link>
          </div>
          <div className="blur-overlay-bottom">
            <Link to="/product" className="blur-block long bottom-right">
              <p className="opis">19</p>
              <h4>Посевной материал</h4>
              <p>Запаситесь качественными семенами заранее</p>
            </Link>
            <Link to="/product" className="blur-block short bottom-left">
              <p className="text-left opis">8</p>
              <img src={kolos} alt="Block 4 Image" className="block4-image" />
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`reward-scale ${isSticky ? "sticky" : ""}`}
        ref={rewardScaleRef}
      >
          <div className="gift-container">
            <img src={pod} alt="Gift" onClick={handleGiftClick}/>
            <div className="gift-text" onClick={handleGiftClick}>
              <h4>СЗР в подарок</h4>
              <p>Как это работает?</p>
            </div>
          </div>

          <div className="scale-container">
            <div className="scale-values">
              <span className="value-1">50 000</span>
              <span className="value-2">100 000</span>
              <span className="value-3">150 000</span>
            </div>
            <div className="scale-bars">
              <div className="bar bar-1"></div>
              <div className="bar bar-2"></div>
              <div className="bar bar-3"></div>
            </div>
          </div>

          <div className="cart-container">
            <img src={bask} alt="Cart" onClick={handleCartClick}  />
          </div>
        </div>
          
   
        <div style={{ width: '100%', overflow: 'hidden' }}>
    
    </div>
    {isCartOpen && <Cart onClose={closeCart} />}
      {isPopupOpen && <PopupInfo onClose={closePopup} />}
      <Store />
    </>
  );
};

export default Shop;
