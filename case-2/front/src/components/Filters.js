import { useState } from "react";
import { ImSearch } from "react-icons/im";
import { Offcanvas, Button } from "react-bootstrap";
import "../css/Filters.css";

function Filters({ filters, setFilters, handleChange, handleReset }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <div className="menu pt-5 container">
                <div className="filter-buttons row ml-3 d-flex">
                    <div className="d-flex justify-content-center">
                        <div className="d-flex mt-3 ps-2">
                            <span
                                className="input-group-text"
                                id="basic-addon1"
                            >
                                <ImSearch />
                            </span>
                            <input
                                className="form-control me-2 border-none"
                                id="search-input"
                                name="search"
                                type="text"
                                value={filters.search}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        search: e.target.value
                                    })
                                }
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="basic-addon1"
                            />
                        </div>
                        <div className="d-flex mt-3 ps-2">
                            <label className="input-group-text" htmlFor="sort">
                                <i className="fas fa-sort"></i>Сортировать по
                            </label>
                            <select
                                name="sort"
                                id="sort"
                                className="form-select border-none"
                                value={filters.sort}
                                onChange={(e) =>
                                    setFilters({
                                        ...filters,
                                        sort: e.target.value
                                    })
                                }
                            >
                                <option value="none">Рекомендации</option>
                                <option value="asc">Возрастания цены</option>
                                <option value="desc">Понижение цены</option>
                                <option value="desc">Автор</option>
                                <option value="desc">Год</option>
                            </select>
                        </div>
                        <div className="mt-3 text-center ps-2">
                            <Button
                                variant="primary"
                                onClick={handleShow}
                                className="me-2"
                            >
                                Фильтры
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <h3>Фильтры</h3>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <form action="/books" id="filter-form" method="get">
                        <fieldset
                            id="filter-category"
                            className="filter-category"
                        >
                            <h4>Категория:</h4>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Книга для детей"
                                    name="category"
                                    value="Книга для детей"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.category.indexOf(
                                            "Книга для детей"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Книга для детей</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Психология"
                                    name="category"
                                    value="Психология"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.category.indexOf(
                                            "Психология"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Психология</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Научная фантастика"
                                    name="category"
                                    value="Научная фантастика"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.category.indexOf(
                                            "Научная фантастика"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Научная фантастика</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Фантастика"
                                    name="category"
                                    value="Фантастика"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.category.indexOf("Фантастика") !==
                                        -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Фантастика</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Вымысел"
                                    name="category"
                                    value="Вымысел"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.category.indexOf("Вымысел") !==
                                        -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Вымысел</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Бизнес и экономика"
                                    name="category"
                                    value="Бизнес и экономика"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.category.indexOf(
                                            "Бизнес и экономика"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Бизнес и экономика</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Философия"
                                    name="category"
                                    value="Философия"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.category.indexOf(
                                            "Философия"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Философия</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Культура"
                                    name="category"
                                    value="Культура"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.category.indexOf("Культура") !==
                                        -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Культура</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Личное развитие"
                                    name="category"
                                    value="Личное развитие"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.category.indexOf(
                                            "Личное развитие"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Личное развитие</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Кулинария"
                                    name="category"
                                    value="Кулинария"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.category.indexOf("Кулинария") !==
                                        -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Кулинария</label>
                            </div>
                        </fieldset>
                        <fieldset
                            id="filter-price"
                            className="mt-2 filter-price"
                        >
                            <h4>Цена:</h4>
                            <div className="filter-item">
                                <input
                                    type="radio"
                                    name="price_range"
                                    id="range_0_20"
                                    value="0_20"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.price_range === "0_20"
                                            ? true
                                            : false
                                    }
                                />
                                <label> 0-20 RUB</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="radio"
                                    name="price_range"
                                    id="range_20_50"
                                    value="20_50"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.price_range === "20_50"
                                            ? true
                                            : false
                                    }
                                />
                                <label> 20-50 RUB</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="radio"
                                    name="price_range"
                                    id="range_50_"
                                    value="50"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.price_range === "50"
                                            ? true
                                            : false
                                    }
                                />
                                <label> Выше 50 RUB</label>
                            </div>
                        </fieldset>
                        <fieldset id="filter-rating" className="mt-2">
                            <h4>Минимум рейтинг:</h4>
                            <div className="filter-item">
                                <input
                                    type="number"
                                    value={filters.minimum_rating}
                                    onChange={(e) =>
                                        setFilters({
                                            ...filters,
                                            minimum_rating: e.target.value
                                        })
                                    }
                                    name="minimum_rating"
                                    id="minimum_rating"
                                    min="0"
                                    max="5"
                                />
                            </div>
                        </fieldset>
                        <fieldset id="filter-os" className="mt-2 filter-os">
                            <h4>Издательство:</h4>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Новая книга"
                                    name="publishing_house"
                                    value="Новая книга"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.publishing_house.indexOf(
                                            "Новая книга"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Новая книга</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Старая книга"
                                    name="publishing_house"
                                    value="Старая книга"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.publishing_house.indexOf(
                                            "Старая книга"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Старая книга</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Бабочка"
                                    name="publishing_house"
                                    value="Бабочка"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.publishing_house.indexOf(
                                            "Бабочка"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Бабочка</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Радуга"
                                    name="publishing_house"
                                    value="Радуга"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.publishing_house.indexOf(
                                            "Радуга"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Радуга</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Камень"
                                    name="publishing_house"
                                    value="Камень"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.publishing_house.indexOf(
                                            "Камень"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Камень</label>
                            </div>
                            <div className="filter-item">
                                <input
                                    type="checkbox"
                                    id="Лучшее"
                                    name="publishing_house"
                                    value="Лучшее"
                                    onChange={handleChange}
                                    defaultChecked={
                                        filters.publishing_house.indexOf(
                                            "Лучшее"
                                        ) !== -1
                                            ? true
                                            : false
                                    }
                                />
                                <label>Лучшее</label>
                            </div>
                        </fieldset>
                        <fieldset id="filter-stock" className="mt-2">
                            <h4>Распродажа:</h4>
                            <input
                                className="filter-item"
                                type="checkbox"
                                name="stock_yes"
                                id="stock_yes"
                                value="true"
                                onChange={handleChange}
                                defaultChecked={filters.stock_yes}
                            />
                            <label>Да</label>
                        </fieldset>
                        <div className="filter-form-buttons d-flex justify-content-between">
                            <input
                                type="reset"
                                id="reset"
                                className="mt-3 reset-input"
                                value="Reset filters"
                                onClick={handleReset}
                            />
                        </div>
                    </form>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default Filters;
