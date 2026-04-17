"use client";
import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import BookingModal from "../components/bookingModal/BookingModal";
import VipHallCard from "../components/vipHallCard/VipHallCard";
import { vipHallsData } from "../utils/data";
import { FiStar, FiShield, FiClock, FiUsers, FiAward } from "react-icons/fi";
import "./page.css";
import { IoDiamondOutline } from "react-icons/io5";

export default function VipHallsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const benefits = [
        { icon: <IoDiamondOutline />, title: "Премиум сервис", description: "Индивидуальный подход к каждому гостю" },
        { icon: <FiShield />, title: "Конфиденциальность", description: "Полная приватность мероприятия" },
        { icon: <FiClock />, title: "Круглосуточная поддержка", description: "Персональный менеджер 24/7" },
        { icon: <FiUsers />, title: "Эксклюзивность", description: "Только для избранных гостей" },
        { icon: <FiAward />, title: "Лучшие шеф-повара", description: "Авторское меню от топ-шефов" },
        { icon: <FiStar />, title: "Премиум бар", description: "Элитные напитки со всего мира" }
    ];

    return (
        <>
            <Navbar onBookingClick={() => setIsModalOpen(true)} />
            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <main>
                {/* Hero Section */}
                <section className="vip-hero">
                    <div className="vip-hero-bg">
                        <div className="vip-hero-overlay"></div>
                    </div>
                    <div className="container">
                        <div className="vip-hero-content">
                            <div className="vip-hero-badge">
                                <IoDiamondOutline />
                                <span>Эксклюзивные пространства</span>
                            </div>
                            <h1>{vipHallsData.title}</h1>
                            <p>{vipHallsData.description}</p>
                            <div className="vip-hero-features">
                                <span>✨ Отдельный вход</span>
                                <span>🍷 Премиум бар</span>
                                <span>👨‍🍳 Персональный шеф</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* VIP залы секция */}
                <section className="vip-halls-section">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">Наши VIP залы</span>
                            <h2>Роскошь и эксклюзивность</h2>
                            <p>Каждый VIP зал создан с особым вниманием к деталям</p>
                        </div>
                        <div className="vip-halls-grid">
                            {vipHallsData.vipHalls.map((hall) => (
                                <VipHallCard
                                    key={hall.id}
                                    hall={hall}
                                    onBookingClick={() => setIsModalOpen(true)}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Преимущества VIP секция */}
                <section className="vip-benefits">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">Преимущества</span>
                            <h2>Почему выбирают наши VIP залы</h2>
                            <p>Мы создали идеальные условия для вашего комфорта</p>
                        </div>
                        <div className="benefits-grid">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="benefit-card">
                                    <div className="benefit-icon">{benefit.icon}</div>
                                    <h3>{benefit.title}</h3>
                                    <p>{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Секция */}
                <section className="vip-cta">
                    <div className="container">
                        <div className="vip-cta-content">
                            <h2>Забронируйте VIP зал</h2>
                            <p>Создайте незабываемое событие в эксклюзивной атмосфере</p>
                            <button className="vip-cta-button" onClick={() => setIsModalOpen(true)}>
                                Забронировать VIP зал
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}