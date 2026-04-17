"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import BookingModal from "../components/bookingModal/BookingModal";
import HallHeader from "../components/hallHeader/HallHeader";
import MenuItem from "../components/menuItem/MenuItem";
import { menuData } from "../utils/data";
import {
    FaUtensils,
    FaChevronRight,
    FaFilter,
    FaPhoneAlt,
    FaTimes,
    FaStar,
    FaFire,
    FaCalendarAlt,
    FaSun
} from "react-icons/fa";
import "./terrace.css";

export default function TerracePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("all");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    // Используем меню из commonHall (Общий зал)
    const hallData = menuData.terrace;
    const menuDataFromCommon = menuData.commonHall;

    // Получаем все категории из меню Общего зала
    const categories = ["all", ...menuDataFromCommon.menu.map(item => item.category)];

    // Фильтруем меню по выбранной категории
    const getFilteredMenu = () => {
        if (activeCategory === "all") {
            return menuDataFromCommon.menu;
        }
        return menuDataFromCommon.menu.filter(item => item.category === activeCategory);
    };

    const filteredMenu = getFilteredMenu();

    // Функция звонка
    const handleOrderCall = () => {
        window.location.href = "tel:+998900830707";
    };

    // Открытие модалки бронирования
    const handleBooking = () => {
        setIsModalOpen(true);
    };

    // Закрываем мобильное меню при выборе категории
    const handleCategorySelect = (category) => {
        setActiveCategory(category);
        setIsMobileFilterOpen(false);
    };

    // Блокировка скролла при открытом мобильном меню
    useEffect(() => {
        if (isMobileFilterOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileFilterOpen]);

    // Подсчет общего количества блюд
    const totalDishes = menuDataFromCommon.menu.reduce((acc, category) => acc + category.items.length, 0);

    return (
        <>
            <Navbar onBookingClick={() => setIsModalOpen(true)} />
            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <main>
                <HallHeader
                    title={hallData.title}
                    description={hallData.description}
                    video={hallData.video}
                    capacity={hallData.capacity}
                    area={hallData.area}
                    features={hallData.features}
                    onBookingClick={handleBooking}
                />

                <section className="hall-menu terrace-menu">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">
                                <FaSun className="tag-icon" />
                                Наше меню
                            </span>
                            <h2>Меню террасы</h2>
                            <p>Свежие и вкусные блюда для отличного настроения</p>
                            <div className="menu-stats">
                                <span className="stat-badge">
                                    <FaFire className="stat-icon" />
                                    {totalDishes} блюд
                                </span>
                                <span className="stat-badge">
                                    <FaStar className="stat-icon" />
                                    Авторская кухня
                                </span>
                            </div>
                        </div>

                        <div className="menu-layout">
                            {/* Боковое меню категорий */}
                            <aside className={`menu-sidebar ${isMobileFilterOpen ? "open" : ""}`}>
                                <div className="menu-sidebar-header">
                                    <FaUtensils className="sidebar-icon" />
                                    <h3>Категории меню</h3>
                                    <button
                                        className="mobile-close-btn"
                                        onClick={() => setIsMobileFilterOpen(false)}
                                    >
                                        <FaTimes />
                                    </button>
                                </div>

                                <div className="sidebar-info">
                                    <p>Выберите категорию чтобы увидеть блюда</p>
                                </div>

                                <ul className="menu-categories-list">
                                    {categories.map((category, idx) => (
                                        <li key={idx}>
                                            <button
                                                className={`category-btn ${activeCategory === category ? "active" : ""}`}
                                                onClick={() => handleCategorySelect(category)}
                                            >
                                                <FaChevronRight className={`category-icon ${activeCategory === category ? "active" : ""}`} />
                                                <span>
                                                    {category === "all" ? "🍽️ Все меню" : category}
                                                </span>
                                                {activeCategory === category && <span className="active-dot"></span>}
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <div className="sidebar-order">
                                    <button onClick={handleBooking} className="sidebar-order-btn">
                                        <FaCalendarAlt />
                                        Забронировать террасу
                                    </button>
                                    <button onClick={handleOrderCall} className="sidebar-call-btn">
                                        <FaPhoneAlt />
                                        Заказать звонок
                                    </button>
                                </div>
                            </aside>

                            {/* Основной контент меню */}
                            <div className="menu-content">
                                {/* Кнопка фильтра для мобильных устройств */}
                                <button
                                    className="mobile-filter-btn"
                                    onClick={() => setIsMobileFilterOpen(true)}
                                >
                                    <FaFilter /> Категории меню
                                </button>

                                {filteredMenu.map((category, idx) => (
                                    <div key={idx} className="menu-category-section">
                                        {activeCategory === "all" && (
                                            <div className="category-header">
                                                <h3 className="category-title">{category.category}</h3>
                                                <div className="category-count">
                                                    {category.items.length} блюд
                                                </div>
                                            </div>
                                        )}
                                        <div className="menu-items-grid">
                                            {category.items.map((item, itemIdx) => (
                                                <MenuItem
                                                    key={itemIdx}
                                                    name={item.name}
                                                    price={item.price}
                                                    description={item.description}
                                                    image={item.image}
                                                    onOrder={handleOrderCall}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Плавающая кнопка бронирования */}
            <button onClick={handleBooking} className="floating-order-btn terrace-floating-btn">
                <FaSun />
                <span>Забронировать</span>
            </button>

            <Footer />
        </>
    );
};