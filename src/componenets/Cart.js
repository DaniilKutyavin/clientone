import React, { useEffect, useState, useContext } from "react";
import "../style/Cart.css";
import {
  getBasket,
  updateBasketItem,
  deleteBasketItem,
  createOreders,
} from "../http/productApi"; // Ensure you have deleteBasketItem imported
import { Context } from "..";

const Cart = ({ userId, onClose, onUpdateTotal }) => {
  const [basketItems, setBasketItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    city: "",
    email: "",
    promoCode: "",
    paymentMethod: "",
  });
  const { user } = useContext(Context);

  const fetchBasket = async () => {
    try {
      const data = await getBasket(userId);
      const products = data.basket_products || [];
      setBasketItems(products);
      const total = products.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalAmount(total);
      onUpdateTotal(total);
    } catch (error) {
      console.error("Error fetching basket:", error);
    }
  };

  useEffect(() => {
    fetchBasket();
  }, [userId]);

  const handleQuantityChange = async (item, action) => {
    let newQuantity =
      action === "increase" ? item.quantity + 1 : item.quantity - 1;
    if (newQuantity < 1) newQuantity = 1;

    const updatedBasketItems = basketItems.map((basketItem) =>
      basketItem.id === item.id
        ? { ...basketItem, quantity: newQuantity }
        : basketItem
    );

    setBasketItems(updatedBasketItems);
    const newTotal = updatedBasketItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalAmount(newTotal);
    onUpdateTotal(newTotal);

    try {
      await updateBasketItem(userId, item.product.id, {
        quantity: newQuantity,
      });
    } catch (error) {
      console.error("Error updating basket item:", error);
    }
  };

  const handleDeleteItem = async (productId) => {
    try {
      // Ensure productId is valid
      if (!productId) {
        console.error("Product ID is undefined or null.");
        return; // Exit if productId is invalid
      }

      await deleteBasketItem(productId);
      // Update local state by filtering out the deleted item
      const updatedBasketItems = basketItems.filter(
        (item) => item.product.id !== productId
      );
      setBasketItems(updatedBasketItems);
      const newTotal = updatedBasketItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalAmount(newTotal);
      onUpdateTotal(newTotal);
    } catch (error) {
      console.error("Error deleting basket item:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleOrder = async () => {
    const orderData = {
      userId,
      phone: userDetails.phone,
      paymentMethod: userDetails.paymentMethod,
    };

    try {
      const order = await createOreders(orderData);
      console.log("Order created:", order);
      alert("Ваш заказ успешно создан!");
      onClose();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Произошла ошибка при создании заказа. Попробуйте еще раз.");
    }
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-icon" onClick={onClose}>
          ✖
        </span>
        <h2 className="cart-title">Заказ</h2>

        {basketItems.length > 0 ? (
          basketItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <span
                className="delete-icon"
                onClick={() => handleDeleteItem(item.product.id)}
              >
                ✖
              </span>
              <div className="cart-item-info">
                <p className="product-title">{item.product.name}</p>
                <p className="product-description">
                  {item.product.description}
                </p>
                <p className="obem">{item.product.weight}</p>
                <div className="quantity-controls">
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(item, "decrease")}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleQuantityChange(item, "increase")}
                  >
                    +
                  </button>
                  <span className="price-cart">{item.price} ₽</span>
                </div>
              </div>
              <img
                src={process.env.REACT_APP_API_URL + item.product.img}
                alt="Product"
                className="cart-item-image"
              />
            </div>
          ))
        ) : (
          <p>Корзина пуста</p>
        )}

        <div className="sum-section">
          <p className="sum-label">Сумма:</p>
          <div className="sum-details non-cash">
            <span className="cash-amount">{totalAmount} ₽&ensp; </span>
            <span className="cash-method"> Наличный расчет</span>
          </div>
          <div className="sum-details non-cash">
            <span className="non-cash-amount">
              {(totalAmount * 1.05).toFixed(2)} ₽&ensp;{" "}
            </span>
            <span className="non-cash-method"> Безналичный расчет</span>
          </div>
        </div>

        <h3 className="section-title">Данные</h3>
        <label>ФИО</label>
        <input
          type="text"
          name="name"
          value={userDetails.name}
          onChange={handleInputChange}
          className="intext"
        />
        <label>Телефон</label>
        <input
          type="tel"
          name="phone"
          value={userDetails.phone}
          onChange={handleInputChange}
          className="intext"
        />

        <h3 className="section-title">Доставка</h3>
        <label>Город</label>
        <input
          type="text"
          name="city"
          value={userDetails.city}
          onChange={handleInputChange}
          className="intext"
        />
        <label>Почта</label>
        <input
          type="email"
          name="email"
          value={userDetails.email}
          onChange={handleInputChange}
          className="intext"
        />

        <h3 className="section-title">Способ оплаты</h3>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              onChange={handleInputChange}
            />{" "}
            Наличными курьеру
          </label>
          <label>
            <input
              type="radio"
              name="paymentMethod"
              value="bank"
              onChange={handleInputChange}
            />{" "}
            Банковский перевод
          </label>
        </div>

        <h3 className="section-title">Комментарий</h3>
        <label>Промокод</label>
        <input
          type="text"
          name="promoCode"
          value={userDetails.promoCode}
          onChange={handleInputChange}
          className="intext"
        />
        <button className="order-button" onClick={handleOrder}>
          Оформить
        </button>
      </div>
    </div>
  );
};

export default Cart;
