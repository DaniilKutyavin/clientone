import React, { useEffect, useState } from 'react';
import '../style/newss.css';
import Store from '../componenets/Store';
import Shkal from '../componenets/Shkal';
import { observer } from 'mobx-react-lite';
import { getOrdersByUser } from '../http/productApi'; // Импортируйте ваш API-функцию

const Ls = () => {
  const [orders, setOrders] = useState([]); // Хранит заказы
  const [loading, setLoading] = useState(true); // Состояние загрузки

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrdersByUser(); // Получаем заказы пользователя
        setOrders(fetchedOrders); // Сохраняем заказы в состоянии
      } catch (error) {
        console.error('Ошибка при загрузке заказов:', error);
      } finally {
        setLoading(false); // Устанавливаем состояние загрузки в false
      }
    };

    fetchOrders(); // Вызов функции загрузки
  }, []); // Пустой массив зависимостей, чтобы запустить один раз при монтировании

  return (
    <>
     <div style={{ marginTop: '200px' }}>
        <h2>Мои Заказы</h2>
        {loading ? (
          <p>Загрузка...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID Заказа</th>
                <th>Дата</th>
                <th>Статус</th>
                <th>Товары</th>
                <th>Итого</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => {
                // Calculate total price for the order
                const totalPrice = order.order_products.reduce((total, product) => {
                  return total + (product.price * product.quantity);
                }, 0);

                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>{order.status}</td>
                    <td>
                      {order.order_products && order.order_products.length > 0 ? (
                        order.order_products.map(product => (
                          <div key={product.id}>
                            {product.product.name} (Количество: {product.quantity})
                          </div>
                        ))
                      ) : (
                        <div>Нет товаров</div> // Fallback if there are no products
                      )}
                    </td>
                    <td>{totalPrice} ₽</td> {/* Display the calculated total price */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
      <Store />
      <Shkal />
    </>
  );
};

export default observer(Ls);
