import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style/product.css";
import Store from "../componenets/Store";
import iconProd from "../img/Образец ХСЗР на сайт.png";
import arrowRight from "../img/стрелка вниз.svg"; // Import your custom arrow image
import bask from "../img/корзина белая 1.svg";
import Shkal from "../componenets/Shkal";
import { getProduct, addToBasket } from "../http/productApi";
import { observer } from "mobx-react-lite";
import Ls from "../img/человек 500.svg";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct(id)
      .then((data) => setProduct(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToBasket(product.id, 1);
      alert("Товар добавлен в корзину");
    } catch (error) {
      console.error("Ошибка при добавлении товара в корзину:", error);
    }
  };

  return (
    <>
      <div className="header">
        <div className="title-block">
          <h1>{product?.name}</h1>
          <p className="pod">Водный раствор ВР.</p>
        </div>
      </div>

      <div className="productPage">
        <div className="backgroundText">{product?.name}</div>

        <div className="productCard">
          <div className="productInfo">
            <div className="textContent">
              <p className="description">{product?.description}</p>
              <p className="highlightedInfo">{product?.description_low}</p>
              <div className="productVolume">
                <span className="pod">{product?.weight}</span>
                <p className="producer">Производитель:</p>
                <div className="sertif">
                  <p className="pdfLink">
                    <a
                      className="no-style-link"
                      href={`${process.env.REACT_APP_API_URL}${product?.presentation}`}
                    >
                      <spam className="dot "></spam> Презентация PDF
                    </a>
                  </p>
                  <p className="pdfLink">
                    <a
                      className="no-style-link"
                      href={`${process.env.REACT_APP_API_URL}${product?.certificate}`}
                    >
                      <spam className="dot "></spam> Свидетельство PDF
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="productImageAndPrice">
              <div className="productImage">
                <img
                  src={process.env.REACT_APP_API_URL + product?.img}
                  alt={product?.name}
                />
              </div>
            </div>
          </div>
          <div className="priceSection">
            <span className="price">{product?.price} ₽</span>
            <div className="separator" />
            <button className="addToCartButton" onClick={handleAddToCart}>
              <img src={bask} alt="Корзина" />
            </button>
          </div>

          <div className="accordionSection">
            {/* Common details */}

            {/* Render sections based on product type */}
            {product?.type === 1 && (
              <>
                <details className="accordion">
                  <summary>
                    Преимущества{" "}
                    <img
                      src={arrowRight}
                      alt="Arrow"
                      className="accordion-arrow"
                    />
                  </summary>
                  <ul className="advantages-list">
                    {product.adva.map((adv) => (
                      <li key={adv.id}>{adv.text}</li>
                    ))}
                  </ul>
                </details>
                <details className="accordion">
                  <summary>
                    Регламент применения{" "}
                    <img
                      src={arrowRight}
                      alt="Arrow"
                      className="accordion-arrow"
                    />
                  </summary>
                  <div
                    dangerouslySetInnerHTML={{ __html: product?.htmlTable }}
                  />
                  <div className="storage-content">
                    <div className="storage-item">
                      <img src={Ls} alt="Icon" className="storage-icon" />
                      <div className="storage-text">
                        <h3>Срок ожидания и кратность обработки</h3>
                        <p>{product?.waiting}</p>
                      </div>
                    </div>

                    <div className="storage-item textttt">
                      <img src={Ls} alt="Icon" className="storage-icon" />
                      <div className="storage-text">
                        <h3>Расход рабочей жидкости</h3>
                        <p>{product?.expenditure}</p>
                      </div>
                    </div>
                  </div>
                  {/* Add content for Регламент */}
                </details>
                <details className="accordion">
                  <summary>
                    Описание{" "}
                    <img
                      src={arrowRight}
                      alt="Arrow"
                      className="accordion-arrow"
                    />
                  </summary>
                  {product.desc.map((desc) => (
                    <>
                      <h3 key={desc.id}>{desc.title}</h3>
                      <p>{desc.text}</p>
                    </>
                  ))}
                </details>
                <details className="accordion">
                  <summary>
                    Упаковка и хранение{" "}
                    <img
                      src={arrowRight}
                      alt="Arrow"
                      className="accordion-arrow"
                    />
                  </summary>
                  {product?.htmlTable}
                  <div className="storage-content">
                    <div className="storage-item">
                      <img src={Ls} alt="Icon" className="storage-icon" />
                      <div className="storage-text">
                        <h3>Срок хранения</h3>
                        <p>{product?.shelf}</p>
                      </div>
                    </div>

                    <div className="storage-item textttt">
                      <img src={Ls} alt="Icon" className="storage-icon" />
                      <div className="storage-text">
                        <h3>Упаковка</h3>
                        <p>{product?.packaging}</p>
                      </div>
                    </div>

                    <div className="storage-item">
                      <img src={Ls} alt="Icon" className="storage-icon" />
                      <div className="storage-text">
                        <h3>Условия хранения</h3>
                        <p>{product?.conditions}</p>
                      </div>
                    </div>
                  </div>
                </details>
              </>
            )}
            {product?.type === 2 && (
              <>
                <details className="accordion">
                  <summary>
                    Описание{" "}
                    <img
                      src={arrowRight}
                      alt="Arrow"
                      className="accordion-arrow"
                    />
                  </summary>
                  {product?.descTwo}
                </details>
                <details className="accordion">
                  <summary>
                    Характеристики{" "}
                    <img
                      src={arrowRight}
                      alt="Arrow"
                      className="accordion-arrow"
                    />
                  </summary>
                  <ul className="advantages-list">
                    {product.adva.map((adv) => (
                      <li key={adv.id}>{adv.text}</li>
                    ))}
                  </ul>
                  {/* Add content for характеристики */}
                </details>
                <details className="accordion">
                  <summary>
                    Преимущества{" "}
                    <img
                      src={arrowRight}
                      alt="Arrow"
                      className="accordion-arrow"
                    />
                  </summary>
                  <ul className="advantages-list">
                    {product.specif.map((adv) => (
                      <li key={adv.id}>{adv.text}</li>
                    ))}
                  </ul>
                </details>
                <details className="accordion">
                  <summary>
                    Упаковка и хранение{" "}
                    <img
                      src={arrowRight}
                      alt="Arrow"
                      className="accordion-arrow"
                    />
                  </summary>

                  {product.keep.map((adv) => (
                    <p key={adv.id}>{adv.text}</p>
                  ))}
                </details>
              </>
            )}
            {product?.type === 3 && (
              <>
                <details className="accordion">
                  <summary>
                    Описание{" "}
                    <img
                      src={arrowRight}
                      alt="Arrow"
                      className="accordion-arrow"
                    />
                  </summary>
                  {product?.descThree}
                </details>
                <details className="accordion">
                  <summary>
                    Характеристики{" "}
                    <img
                      src={arrowRight}
                      alt="Arrow"
                      className="accordion-arrow"
                    />
                  </summary>
                  <ul className="advantages-list">
                    {product.adva.map((adv) => (
                      <li key={adv.id}>{adv.text}</li>
                    ))}
                  </ul>
                </details>
                <details className="accordion">
                  <summary>
                    Урожайность{" "}
                    <img
                      src={arrowRight}
                      alt="Arrow"
                      className="accordion-arrow"
                    />
                  </summary>
                  <ul className="advantages-list">
                    {product.stabil.map((adv) => (
                      <li key={adv.id}>{adv.text}</li>
                    ))}
                  </ul>
                </details>
                <details className="accordion">
                  <summary>
                    Устойчивость гибрида{" "}
                    <img
                      src={arrowRight}
                      alt="Arrow"
                      className="accordion-arrow"
                    />
                  </summary>
                  <ul className="advantages-list">
                    {product.productiv.map((adv) => (
                      <li key={adv.id}>{adv.text}</li>
                    ))}
                  </ul>
                </details>
              </>
            )}
          </div>
        </div>
      </div>
      <Store />
      <Shkal />
    </>
  );
};

export default observer(ProductPage);
