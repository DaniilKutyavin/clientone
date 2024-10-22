import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CREATE_ROUTER,
  USER_ROUTER,
  ADRESS_ROUTER,
  NEWSADD_ROUTER,
  DELIVERYADD_ROUTER,
  GIFT_ROUTER,
  FOOTER_ROUTER,
  MANUFACTURERS_ROUTER,
  PRODUCTADD_ROUTER,
} from "../utils/consts";

import { getOrders } from "../http/productApi";

const Admin = () => {
  const [orders, setOrders] = useState([]);

  // Получаем данные о заказах при загрузке компонента
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Ошибка при получении заказов", error);
      }
    };

    fetchOrders();
  }, []);

  // Подсчет итоговой суммы
  const calculateTotal = (order) => {
    return order.order_products.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  return (
    <div className="admin-container" style={{ marginTop: 200 }}>
      <h1>Админка</h1>
      <div className="admin-buttons">
        <Link to={CREATE_ROUTER}>
          <button className="productBuyForm_addInfoButton">
            Создать продукт
          </button>
        </Link>
        <Link to={USER_ROUTER}>
          <button className="productBuyForm_addInfoButton">
            Управление пользователями
          </button>
        </Link>
        <Link to={ADRESS_ROUTER}>
          <button className="productBuyForm_addInfoButton">
            Управление адресами
          </button>
        </Link>
        <Link to={NEWSADD_ROUTER}>
          <button className="productBuyForm_addInfoButton">
            Добавить новость
          </button>
        </Link>
        <Link to={DELIVERYADD_ROUTER}>
          <button className="productBuyForm_addInfoButton">
            Добавить доставку
          </button>
        </Link>
        <Link to={GIFT_ROUTER}>
          <button className="productBuyForm_addInfoButton">
            Добавить подарок
          </button>
        </Link>
        <Link to={FOOTER_ROUTER}>
          <button className="productBuyForm_addInfoButton">
            Настройки футера
          </button>
        </Link>
        <Link to={MANUFACTURERS_ROUTER}>
          <button className="productBuyForm_addInfoButton">
            Управление производителями
          </button>
        </Link>
        <Link to={PRODUCTADD_ROUTER}>
          <button className="productBuyForm_addInfoButton">
            Добавить продукт
          </button>
        </Link>
      </div>
      <div className="orders-table-container" style={{ marginTop: "20px" }}>
        <h1>Все заказы</h1>
        <table
          className="orders-table"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                ID Заказа
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                ID Пользователя
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Телефон
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Метод оплаты
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Продукты
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Статус
              </th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                Итоговая сумма
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {order.id}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {order.userId}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {order.phone}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {order.paymentMethod}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <ul>
                    {order.order_products.map((product) => (
                      <li key={product.productId}>
                        {product.product?.name || "Product not found"} -{" "}
                        {product.quantity} шт. по {product.price}₽
                      </li>
                    ))}
                  </ul>
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {order.status}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  {calculateTotal(order)}₽
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
