import React, { useState, useContext, useEffect } from "react";
import "../style/Prod.css";
import bask from "../img/корзина белая 1.svg";
import iconProd from "../img/Образец ХСЗР на сайт.png";
import arrowDown from "../img/стрелка вниз.svg";
import lupa from "../img/лупа.svg";
import krest from "../img/крестик.svg";
import Store from "../componenets/Store";
import Shkal from "../componenets/Shkal";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { getProductsByType } from "../http/productApi";
import {
  getManufacturersByTypeOne,
  getManufacturersByTypeTwo,
  getManufacturersByTypeThree,
} from "../http/manufacturerApi";
import { useParams, useLocation } from "react-router-dom";

const Prod = observer(() => {
  const { id } = useParams();
  const { product } = useContext(Context);
  const [manufacturers, setManufacturers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    // Получение продуктов по типу
    getProductsByType(id).then((data) => {
      const productsWithCategory = data.map((product) => ({
        ...product,
      }));
      product.setProd(productsWithCategory);
    });

    // Получение производителей в зависимости от типа продукта
    const fetchManufacturers = async () => {
      try {
        let data;
        switch (id) {
          case "1":
            data = await getManufacturersByTypeOne();
            break;
          case "2":
            data = await getManufacturersByTypeTwo();
            break;
          case "3":
            data = await getManufacturersByTypeThree();
            break;
          default:
            data = [];
        }
        setManufacturers(data); // Сохраняем производителей в состоянии
      } catch (error) {
        console.error("Ошибка при получении производителей:", error);
      }
    };

    fetchManufacturers();
  }, [id, product]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Обновление строки поиска
  };

  const clearSearch = () => {
    setSearchQuery("");
  };
  const [isInfoBlockVisible, setIsInfoBlockVisible] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState({
    category: true,
    culture: true,
    manufacturer: true,
    fertilizers: true,
    way: true,
    ground: true,
  });
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    cultures: [],
    manufacturers: [],
    fertilizerss: [],
    ways: [],
    grounds: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(product.prod.length / itemsPerPage);

  const toggleFilter = (filter) => {
    setFiltersOpen({
      ...filtersOpen,
      [filter]: !filtersOpen[filter],
    });
  };

  const closeInfoBlock = () => {
    setIsInfoBlockVisible(false);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Filter products based on selected filters
  const filteredProducts = product.prod.filter((item) => {
    const matchesSearchQuery = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedFilters.categories.length === 0 ||
      selectedFilters.categories.includes(item.category);
    const matchesCulture =
      selectedFilters.cultures.length === 0 ||
      selectedFilters.cultures.includes(item.culture);
    const matchesManufacturer =
      selectedFilters.manufacturers.length === 0 ||
      selectedFilters.manufacturers.includes(item.manufacturer);
    const matchesFertilizers =
      selectedFilters.fertilizerss.length === 0 ||
      selectedFilters.fertilizerss.includes(item.fertilizers);
    const matchesWays =
      selectedFilters.ways.length === 0 ||
      selectedFilters.ways.includes(item.way);
    const matchesgraunds =
      selectedFilters.grounds.length === 0 ||
      selectedFilters.grounds.includes(item.ground);
    return (
      matchesSearchQuery &&
      matchesCategory &&
      matchesCulture &&
      matchesManufacturer &&
      matchesFertilizers &&
      matchesWays &&
      matchesgraunds
    );
  });

  // Определяем продукты для текущей страницы
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPageNumbers = () => {
    const totalPagesToShow = 5; // Количество страниц для отображения в пагинации
    const pages = [];

    if (totalPages <= totalPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const left = Math.max(2, currentPage - 1);
      const right = Math.min(totalPages - 1, currentPage + 1);

      // Добавляем первую страницу
      pages.push(1);

      // Многоточие перед текущим диапазоном
      if (left > 2) {
        pages.push("...");
      }

      // Добавляем страницы вокруг текущей
      for (let i = left; i <= right; i++) {
        pages.push(i);
      }

      // Многоточие после текущего диапазона
      if (right < totalPages - 1) {
        pages.push("...");
      }

      // Добавляем последнюю страницу
      pages.push(totalPages);
    }

    return pages;
  };

  // Handle filter selection
  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[filterType].includes(value)) {
        newFilters[filterType] = newFilters[filterType].filter(
          (item) => item !== value
        );
      } else {
        newFilters[filterType].push(value);
      }
      return newFilters;
    });
  };

  // Clear filters
  const clearFilters = () => {
    setSelectedFilters({
      categories: [],
      cultures: [],
      manufacturers: [],
      fertilizerss: [],
      ways: [],
      grounds: [],
    });
  };
  const location = useLocation();
  const isProductType1 = location.pathname === "/product/type/1";
  const isProductType2 = location.pathname === "/product/type/2";
  const isProductType3 = location.pathname === "/product/type/3";
  return (
    <>
      <div className="header">
        <div className="title-block">
          <h1>ХСЗР</h1>
          <p className="pod">Обеспечьте защиту Ваших культур</p>
        </div>

        {isInfoBlockVisible && (
          <div className="info-block">
            <span className="exclamation">!</span>
            <div className="info-text">
              <p>1.Бесплатная доставка от 35000 руб</p>
              <p>
                2.По безналичному расчету к стоимости ХСЗР добавляется 5% в
                корзине автоматически подтянутся суммы после добавления товара
              </p>
            </div>
            <button className="close-btn" onClick={closeInfoBlock}>
              <img src={krest}></img>
            </button>
          </div>
        )}
      </div>

      <div className="wrapperr">
        <div className="catalog-containerr full-width">
          {/* Левая секция с поиском и фильтрами */}
          <div className="left-section">
            {isProductType1 && (
              <div className="filter-block">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={handleSearchChange} // обработка ввода поиска
                    className="search-input"
                  />
                  <span className="search-icon">
                    <img src={lupa} alt="Search" />
                  </span>
                </div>
                <div className="filter-section">
                  <h2 onClick={() => toggleFilter("category")}>
                    Категория
                    <img
                      src={arrowDown}
                      alt="Arrow Down"
                      className={`filter-arrow ${
                        filtersOpen.category ? "open" : ""
                      }`}
                    />
                  </h2>
                  {filtersOpen.category && (
                    <div className="filter-content">
                      {[
                        "Гербициды",
                        "Инсектициды",
                        "Фунгициды",
                        "Протравители",
                      ].map((category, index) => (
                        <div key={index}>
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            id={`category-${index}`}
                            value={category}
                            checked={selectedFilters.categories.includes(
                              category
                            )}
                            onChange={() =>
                              handleFilterChange("categories", category)
                            }
                          />
                          <label htmlFor={`category-${index}`}>
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="filter-section">
                  <h2 onClick={() => toggleFilter("culture")}>
                    Культура
                    <img
                      src={arrowDown}
                      alt="Arrow Down"
                      className={`filter-arrow ${
                        filtersOpen.culture ? "open" : ""
                      }`}
                    />
                  </h2>
                  {filtersOpen.culture && (
                    <div className="filter-content">
                      {[
                        "Зерновые",
                        "Кукуруза",
                        "Подсолнечник",
                        "Сахарная свекла",
                      ].map((culture, index) => (
                        <div key={index}>
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            id={`culture-${index}`}
                            value={culture}
                            checked={selectedFilters.cultures.includes(culture)}
                            onChange={() =>
                              handleFilterChange("cultures", culture)
                            }
                          />
                          <label htmlFor={`culture-${index}`}>{culture}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="filter-section">
                  <h2 onClick={() => toggleFilter("manufacturer")}>
                    Производитель
                    <img
                      src={arrowDown}
                      alt="Arrow Down"
                      className={`filter-arrow ${
                        filtersOpen.manufacturer ? "open" : ""
                      }`}
                    />
                  </h2>
                  {filtersOpen.manufacturer && (
                    <div className="filter-content">
                      {manufacturers.map((manufacturer, index) => (
                        <div key={index}>
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            id={`manufacturer-${index}`}
                            value={manufacturer.name}
                            checked={selectedFilters.manufacturers.includes(
                              manufacturer.name
                            )}
                            onChange={() =>
                              handleFilterChange(
                                "manufacturers",
                                manufacturer.name
                              )
                            }
                          />
                          <label htmlFor={`manufacturer-${index}`}>
                            {manufacturer.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button className="filter-cancel-button" onClick={clearFilters}>
                  Очистить
                </button>
              </div>
            )}
            {isProductType2 && (
              <div className="filter-block">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={handleSearchChange} // обработка ввода поиска
                    className="search-input"
                  />
                  <span className="search-icon">
                    <img src={lupa} alt="Search" />
                  </span>
                </div>
                <div className="filter-section">
                  <h2 onClick={() => toggleFilter("fertilizers")}>
                    Виды удобрений
                    <img
                      src={arrowDown}
                      alt="Arrow Down"
                      className={`filter-arrow ${
                        filtersOpen.fertilizers ? "open" : ""
                      }`}
                    />
                  </h2>
                  {filtersOpen.fertilizers && (
                    <div className="filter-content">
                      {[
                        "Фосфорные P",
                        "Калийные K",
                        "Комплексные N+P+K",
                        "Водорастворимые",
                      ].map((fertilizers, index) => (
                        <div key={index}>
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            id={`fertilizers-${index}`}
                            value={fertilizers}
                            checked={selectedFilters.fertilizerss.includes(
                              fertilizers
                            )}
                            onChange={() =>
                              handleFilterChange("fertilizerss", fertilizers)
                            }
                          />
                          <label htmlFor={`fertilizers-${index}`}>
                            {fertilizers}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="filter-section">
                  <h2 onClick={() => toggleFilter("culture")}>
                    Культура
                    <img
                      src={arrowDown}
                      alt="Arrow Down"
                      className={`filter-arrow ${
                        filtersOpen.culture ? "open" : ""
                      }`}
                    />
                  </h2>
                  {filtersOpen.culture && (
                    <div className="filter-content">
                      {["Зерновые", "Масличные", "Зернобобовые", "Овощные"].map(
                        (culture, index) => (
                          <div key={index}>
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                              id={`culture-${index}`}
                              value={culture}
                              checked={selectedFilters.cultures.includes(
                                culture
                              )}
                              onChange={() =>
                                handleFilterChange("cultures", culture)
                              }
                            />
                            <label htmlFor={`culture-${index}`}>
                              {culture}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
                <div className="filter-section">
                  <h2 onClick={() => toggleFilter("way")}>
                    По способу внесения
                    <img
                      src={arrowDown}
                      alt="Arrow Down"
                      className={`filter-arrow ${
                        filtersOpen.way ? "open" : ""
                      }`}
                    />
                  </h2>
                  {filtersOpen.way && (
                    <div className="filter-content">
                      {[
                        "Основное внесение",
                        "Припосевное внесение",
                        "Листовые подкормки",
                        "Фертигация",
                      ].map((way, index) => (
                        <div key={index}>
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            id={`way-${index}`}
                            value={way}
                            checked={selectedFilters.ways.includes(way)}
                            onChange={() => handleFilterChange("ways", way)}
                          />
                          <label htmlFor={`way-${index}`}>{way}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="filter-section">
                  <h2 onClick={() => toggleFilter("ground")}>
                    Вид грунта
                    <img
                      src={arrowDown}
                      alt="Arrow Down"
                      className={`filter-arrow ${
                        filtersOpen.ground ? "open" : ""
                      }`}
                    />
                  </h2>
                  {filtersOpen.ground && (
                    <div className="filter-content">
                      {["Открытый", "Закрытый"].map((ground, index) => (
                        <div key={index}>
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            id={`ground-${index}`}
                            value={ground}
                            checked={selectedFilters.grounds.includes(ground)}
                            onChange={() =>
                              handleFilterChange("grounds", ground)
                            }
                          />
                          <label htmlFor={`ground-${index}`}>{ground}</label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="filter-section">
                  <h2 onClick={() => toggleFilter("manufacturer")}>
                    Производитель
                    <img
                      src={arrowDown}
                      alt="Arrow Down"
                      className={`filter-arrow ${
                        filtersOpen.manufacturer ? "open" : ""
                      }`}
                    />
                  </h2>
                  {filtersOpen.manufacturer && (
                    <div className="filter-content">
                      {manufacturers.map((manufacturer, index) => (
                        <div key={index}>
                          <input
                            type="checkbox"
                            className="custom-checkbox"
                            id={`manufacturer-${index}`}
                            value={manufacturer.name}
                            checked={selectedFilters.manufacturers.includes(
                              manufacturer.name
                            )}
                            onChange={() =>
                              handleFilterChange(
                                "manufacturers",
                                manufacturer.name
                              )
                            }
                          />
                          <label htmlFor={`manufacturer-${index}`}>
                            {manufacturer.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button className="filter-cancel-button" onClick={clearFilters}>
                  Очистить
                </button>
              </div>
            )}
          </div>
          {/* Правая секция с карточками продуктов */}
          <div className="right-section">
            <div className="product-grid">
              {currentProducts.map((item, index) => (
                <a
                  href={`/product/${item.id}`}
                  className="product-card"
                  key={index}
                >
                  <img
                    src={process.env.REACT_APP_API_URL + item.img}
                    alt="Product"
                    className="product-image"
                  />
                  <h4 className="product-title">{item.name}</h4>
                  <p className="product-description">{item.description_low}</p>
                  <p className="pod product-volume">{item.weight}</p>
                  <div className="price-container">
                    <span className="product-price">{item.price}₽</span>
                    <img src={bask} alt="Cart" className="cart-icon" />
                  </div>
                </a>
              ))}
            </div>

            {/* Пагинация */}
            <div className="pagination">
              <button
                className="pagination-arrow"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <img
                  src={arrowDown}
                  alt="Previous"
                  style={{ transform: "rotate(90deg)" }}
                />
              </button>

              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span key={index} className="pagination-ellipsis">
                    ...
                  </span>
                ) : (
                  <button
                    key={index}
                    className={`pagination-page ${
                      currentPage === page ? "active" : ""
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                className="pagination-arrow"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <img
                  src={arrowDown}
                  alt="Next"
                  style={{ transform: "rotate(-90deg)" }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Shkal />
      <Store />
    </>
  );
});

export default Prod;
