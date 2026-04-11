"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
    FiStar,
    FiCheck,
    FiCalendar,
    FiInstagram,
    FiHeart,
    FiChevronRight,
    FiAward,
    FiCoffee,
    FiSun
} from "react-icons/fi";
import { GiChefToque, GiPartyPopper } from "react-icons/gi";
import { FaChampagneGlasses } from "react-icons/fa6";
import { FaUtensils, FaGlassCheers } from "react-icons/fa";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import BookingModal from "./components/bookingModal/BookingModal";
import { restaurantInfo } from "./utils/data";
import "./styles/homelander.css";

export default function Homelander() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const halls = [
        {
            title: "Свадебный зал",
            description: "Роскошное пространство для самого важного дня в вашей жизни",
            icon: <FaChampagneGlasses />,
            href: "/wedding-hall",
            color: "red",
            features: ["до 200 гостей", "VIP зона", "Танцпол", "Светомузыка"],
            image: "https://zukhrotravel.com/wp-content/uploads/2024/12/2-5.jpg",
            price: "от 2 500 000 сум"
        },
        {
            title: "Банкетный зал",
            description: "Идеальное место для проведения банкетов и корпоративов",
            icon: <FaUtensils />,
            href: "/banquet-hall",
            color: "green",
            features: ["до 150 гостей", "Проектор", "Колонки", "Wi-Fi"],
            image: "https://www.centralasia-travel.com/upload/tiles/grand-bukhara-hotel-14.jpg",
            price: "от 1 800 000 сум"
        },
        {
            title: "Терраса",
            description: "Летняя терраса с неповторимой атмосферой",
            icon: <FiSun />,
            href: "/terrace",
            color: "red",
            features: ["до 80 гостей", "Кальян", "Подсветка", "Летний душ"],
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsb53Ymrd7WYV8d-2E9Z3PKJ8etyXf8SS0Xw&s",
            price: "от 1 200 000 сум"
        }
    ];

    const advantages = [
        {
            icon: <GiChefToque />,
            title: "Лучший шеф-повар",
            description: "Блюда от признанных мастеров кулинарии",
            color: "red"
        },
        {
            icon: <FiAward />,
            title: "Свежие продукты",
            description: "Только качественные и свежие ингредиенты",
            color: "green"
        },
        {
            icon: <FiCoffee />,
            title: "Уютная атмосфера",
            description: "Интерьер для вашего комфорта и настроения",
            color: "red"
        },
        {
            icon: <GiPartyPopper />,
            title: "Проведение мероприятий",
            description: "Организуем праздники любого формата",
            color: "green"
        }
    ];

    return (
        <>
            <Navbar onBookingClick={() => setIsModalOpen(true)} />
            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <main>
                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-video-wrapper">
                        <video className="hero-video" autoPlay loop muted playsInline>
                            <source src="/videos/hero.mp4" type="video/mp4" />
                        </video>
                        <div className="hero-overlay"></div>
                    </div>

                    <div className="hero-particles">
                        {[...Array(20)].map((_, i) => (
                            <div key={i} className="particle" style={{ '--i': i }}></div>
                        ))}
                    </div>

                    <div className={`hero-content ${isVisible ? "visible" : ""}`}>
                        <div className="hero-badge">
                            <FiStar className="hero-badge-icon" />
                            <span>{restaurantInfo.tagline}</span>
                        </div>
                        <h1 className="hero-title">
                            {restaurantInfo.name}
                            <span className="hero-title-accent">.</span>
                        </h1>
                        <p className="hero-description">{restaurantInfo.description}</p>
                        <div className="hero-features">
                            <div className="hero-feature">
                                <GiChefToque /> {restaurantInfo.chef}
                            </div>
                            <div className="hero-feature">
                                <FiHeart /> {restaurantInfo.vibe}
                            </div>
                        </div>
                        <div className="hero-buttons">
                            <button className="hero-btn-primary" onClick={() => setIsModalOpen(true)}>
                                <FiCalendar className="btn-icon" />
                                Забронировать столик
                            </button>
                            <a href={restaurantInfo.instagram} target="_blank" rel="noopener noreferrer" className="hero-btn-secondary">
                                <FiInstagram className="btn-icon" />
                                Instagram
                            </a>
                        </div>
                    </div>

                    <div className="hero-scroll-indicator">
                        <span>Листайте вниз</span>
                        <div className="scroll-mouse">
                            <div className="scroll-wheel"></div>
                        </div>
                    </div>
                </section>

                {/* Залы секция */}
                <section className="halls">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">Наши залы</span>
                            <h2>Идеальное пространство для вашего торжества</h2>
                            <p>Каждый зал имеет уникальную атмосферу и специальное меню</p>
                        </div>
                        <div className="halls-grid">
                            {halls.map((hall, index) => (
                                <Link key={hall.title} href={hall.href} className={`hall-card hall-card-${hall.color}`}>
                                    <div className="hall-card-image">
                                        <img src={hall.image} alt={hall.title} />
                                        <div className="hall-card-overlay-image"></div>
                                        <div className="hall-card-price">{hall.price}</div>
                                    </div>
                                    <div className="hall-card-content">
                                        <div className="hall-card-icon">{hall.icon}</div>
                                        <h3 className="hall-card-title">{hall.title}</h3>
                                        <p className="hall-card-description">{hall.description}</p>
                                        <div className="hall-card-features">
                                            {hall.features.map((feature, idx) => (
                                                <span key={idx} className="hall-feature">
                                                    <FiCheck className="feature-check" />
                                                    {feature}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="hall-card-footer">
                                            <span className="hall-card-link">
                                                Подробнее <FiChevronRight className="link-icon" />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="hall-card-bg-overlay"></div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Преимущества секция */}
                <section className="advantages">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">Почему выбирают нас</span>
                            <h2>Наши преимущества</h2>
                            <p>Мы создаем идеальные условия для вашего отдыха</p>
                        </div>
                        <div className="advantages-grid">
                            {advantages.map((adv, index) => (
                                <div key={index} className={`advantage-item advantage-item-${adv.color}`}>
                                    <div className="advantage-icon-wrapper">
                                        {adv.icon}
                                    </div>
                                    <h3>{adv.title}</h3>
                                    <p>{adv.description}</p>
                                    <div className="advantage-hover-effect"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Секция */}
                <section className="cta-section">
                    <div className="container">
                        <div className="cta-content">
                            <h2>Готовы создать незабываемый праздник?</h2>
                            <p>Свяжитесь с нами прямо сейчас и получите консультацию по организации мероприятия</p>
                            <button className="cta-button" onClick={() => setIsModalOpen(true)}>
                                <FaGlassCheers className="cta-icon" />
                                Забронировать мероприятие
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}