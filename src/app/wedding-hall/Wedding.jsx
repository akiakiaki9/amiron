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
    FaFire
} from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import "./wedding.css";

export default function WeddingHallPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("all");
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const data = menuData.weddingHall;

    // Получаем все категории
    const categories = ["all", ...data.menu.map(item => item.category)];

    // Фильтруем меню по выбранной категории
    const getFilteredMenu = () => {
        if (activeCategory === "all") {
            return data.menu;
        }
        return data.menu.filter(item => item.category === activeCategory);
    };

    const filteredMenu = getFilteredMenu();

    // Функция звонка
    const handleOrderCall = () => {
        window.location.href = "tel:+998944444445";
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
    const totalDishes = data.menu.reduce((acc, category) => acc + category.items.length, 0);

    return (
        <>
            <Navbar onBookingClick={() => setIsModalOpen(true)} />
            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <main>
                <HallHeader
                    title={data.title}
                    description={data.description}
                    image={data.image}
                    capacity={data.capacity}
                    area={data.area}
                    features={data.features}
                />

                <section className="hall-menu">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">
                                <GiKnifeFork className="tag-icon" />
                                Наше меню
                            </span>
                            <h2>Свадебное меню</h2>
                            <p>Традиционные и авторские блюда для вашего торжества</p>
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
                                    <button onClick={handleOrderCall} className="sidebar-order-btn">
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
                                                    onHover={() => setHoveredItem(`${idx}-${itemIdx}`)}
                                                    onLeave={() => setHoveredItem(null)}
                                                    isHovered={hoveredItem === `${idx}-${itemIdx}`}
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

            {/* Плавающая кнопка заказа */}
            <button onClick={handleOrderCall} className="floating-order-btn">
                <FaPhoneAlt />
                <span>Заказать</span>
            </button>

            <Footer />
        </>
    );
}