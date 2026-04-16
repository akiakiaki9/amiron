"use client";
import { useState } from "react";
import {
    FiPhone,
    FiMapPin,
    FiClock,
    FiSend,
    FiCheckCircle,
    FiAlertCircle,
    FiInstagram,
    FiUser,
    FiFileText,
    FiLoader,
    FiStar
} from "react-icons/fi";
import { FaTelegram, FaTiktok } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import BookingModal from "../components/bookingModal/BookingModal";
import { restaurantInfo } from "../utils/data";
import "./contacts.css";

export default function ContactsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        rating: 5,
        message: ""
    });
    const [hoveredRating, setHoveredRating] = useState(0);
    const [formStatus, setFormStatus] = useState({
        submitted: false,
        success: false,
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRatingChange = (rating) => {
        setFormData(prev => ({ ...prev, rating }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus({ submitted: false, success: false, message: "" });

        try {
            const response = await fetch('/api/send-review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setFormStatus({
                    submitted: true,
                    success: true,
                    message: data.message || "Спасибо за ваш отзыв! Мы ценим ваше мнение."
                });

                // Очищаем форму
                setFormData({
                    name: "",
                    phone: "",
                    rating: 5,
                    message: ""
                });
                setHoveredRating(0);
            } else {
                throw new Error(data.message || "Ошибка отправки");
            }
        } catch (error) {
            console.error('Ошибка отправки:', error);
            setFormStatus({
                submitted: true,
                success: false,
                message: "Произошла ошибка при отправке отзыва. Пожалуйста, попробуйте позже."
            });
        } finally {
            setIsSubmitting(false);

            // Скрываем сообщение через 5 секунд
            setTimeout(() => {
                setFormStatus(prev => ({ ...prev, submitted: false }));
            }, 5000);
        }
    };

    const openWhatsApp = (phone) => {
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        window.open(`https://wa.me/${cleanPhone}`, '_blank');
    };

    const openTelegramChat = (phone) => {
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        window.open(`https://t.me/${cleanPhone}`, '_blank');
    };

    // Компонент звездного рейтинга

    const StarRating = ({ rating, onRatingChange, onHover, hoveredRating }) => {
        return (
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className={`star-btn ${star <= (hoveredRating || rating) ? 'active' : ''}`}
                        onClick={() => onRatingChange(star)}
                        onMouseEnter={() => onHover(star)}
                        onMouseLeave={() => onHover(0)}
                    >
                        <FiStar />
                    </button>
                ))}
            </div>
        );
    };

    const contactCards = [
        {
            icon: <FiPhone />,
            title: "Телефоны",
            items: restaurantInfo.phones.map(phone => ({
                value: phone,
                link: `tel:${phone}`,
                action: "Позвонить"
            })),
            color: "green"
        },
        {
            icon: <FaTelegram />,
            title: "Telegram",
            items: [
                {
                    value: "@amiron_restaurant",
                    link: "https://t.me/amiron_restaurant",
                    action: "Написать",
                    onClick: () => window.open("https://t.me/amiron_restaurant", "_blank")
                }
            ],
            color: "red"
        },
        {
            icon: <FiMapPin />,
            title: "Адрес",
            items: [{ value: restaurantInfo.addressFull, link: restaurantInfo.googleMaps, action: "Построить маршрут" }],
            color: "red"
        },
        {
            icon: <FiClock />,
            title: "Режим работы",
            items: [{ value: restaurantInfo.workingHours, link: null, action: null }],
            color: "green"
        }
    ];

    const socialLinks = [
        { icon: <FiInstagram />, name: "Instagram", url: restaurantInfo.instagram, color: "#E4405F" },
        { icon: <FaTelegram />, name: "Telegram", url: "https://t.me/amiron_restaurant", color: "#26A5E4" },
        { icon: <FaTiktok />, name: "TikTok", url: "https://tiktok.com/@amiron_uz", color: "#000000" }
    ];

    return (
        <>
            <Navbar onBookingClick={() => setIsModalOpen(true)} />
            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <main>
                {/* Hero Section */}
                <section className="contacts-hero">
                    <div className="contacts-hero-bg">
                        <div className="contacts-hero-overlay"></div>
                    </div>
                    <div className="container">
                        <div className="contacts-hero-content">
                            <div className="hero-badge">
                                <FiSend />
                                <span>Оставьте отзыв</span>
                            </div>
                            <h1>Ваше мнение важно для нас</h1>
                            <p>Поделитесь впечатлениями о посещении ресторана</p>
                        </div>
                    </div>
                </section>

                {/* Contact Cards Section */}
                <section className="contact-cards-section">
                    <div className="container">
                        <div className="contact-cards-grid">
                            {contactCards.map((card, index) => (
                                <div key={index} className={`contact-card contact-card-${card.color}`}>
                                    <div className="contact-card-icon">{card.icon}</div>
                                    <h3>{card.title}</h3>
                                    <div className="contact-card-items">
                                        {card.items.map((item, idx) => (
                                            <div key={idx} className="contact-item">
                                                <span className="contact-value">{item.value}</span>
                                                {item.action && (
                                                    item.link ? (
                                                        <a
                                                            href={item.link}
                                                            target={item.link.startsWith('http') ? "_blank" : "_self"}
                                                            rel="noopener noreferrer"
                                                            className="contact-action"
                                                            onClick={item.onClick}
                                                        >
                                                            {item.action} →
                                                        </a>
                                                    ) : (
                                                        <span className="contact-action disabled">{item.action}</span>
                                                    )
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Map Section */}
                <section className="map-section">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">Наше местоположение</span>
                            <h2>Как нас найти</h2>
                            <p>Мы находимся в самом сердце Бухары</p>
                        </div>
                        <div className="map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.456789012345!2d64.428333!3d39.774167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f500f021106f38b%3A0x12bbfd05731895cb!2sAmiron!5e0!3m2!1sru!2s!4v1700000000000!5m2!1sru!2s"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Amiron Restaurant Location"
                            ></iframe>
                        </div>
                    </div>
                </section>

                {/* Review Form Section */}
                <section className="feedback-section">
                    <div className="container">
                        <div className="feedback-wrapper">
                            <div className="feedback-info">
                                <div className="feedback-info-content">
                                    <div className="info-badge">
                                        <GiKnifeFork />
                                        <span>Оставить отзыв</span>
                                    </div>
                                    <h2>Поделитесь впечатлениями</h2>
                                    <p>Ваше мнение помогает нам становиться лучше</p>
                                    <div className="info-features">
                                        <div className="info-feature">
                                            <FiCheckCircle />
                                            <span>Анонимно или с именем</span>
                                        </div>
                                        <div className="info-feature">
                                            <FiCheckCircle />
                                            <span>Быстрая обратная связь</span>
                                        </div>
                                        <div className="info-feature">
                                            <FiCheckCircle />
                                            <span>Все отзывы читает шеф-повар</span>
                                        </div>
                                    </div>
                                    <div className="info-note">
                                        <FaTelegram />
                                        <span>Отзыв будет отправлен администратору в Telegram</span>
                                    </div>
                                </div>
                            </div>

                            <div className="feedback-form-wrapper">
                                <form className="feedback-form" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">
                                            <FiUser className="label-icon" />
                                            Ваше имя
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="Иван Иванов"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="phone">
                                            <FiPhone className="label-icon" />
                                            Телефон (необязательно)
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+998 90 123 45 67"
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            <FiStar className="label-icon" />
                                            Ваша оценка
                                        </label>
                                        <StarRating
                                            rating={formData.rating}
                                            onRatingChange={handleRatingChange}
                                            onHover={setHoveredRating}
                                            hoveredRating={hoveredRating}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">
                                            <FiFileText className="label-icon" />
                                            Ваш отзыв
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Расскажите о вашем визите: что понравилось, что можно улучшить, какие блюда особенно запомнились..."
                                            rows="5"
                                            required
                                            disabled={isSubmitting}
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="submit-btn"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <FiLoader className="btn-icon spin" />
                                                Отправка отзыва...
                                            </>
                                        ) : (
                                            <>
                                                <FiSend className="btn-icon" />
                                                Отправить отзыв
                                            </>
                                        )}
                                    </button>

                                    {formStatus.submitted && (
                                        <div className={`form-message ${formStatus.success ? "success" : "error"}`}>
                                            {formStatus.success ? (
                                                <>
                                                    <FiCheckCircle />
                                                    {formStatus.message}
                                                </>
                                            ) : (
                                                <>
                                                    <FiAlertCircle />
                                                    {formStatus.message}
                                                </>
                                            )}
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Social Section */}
                <section className="social-section">
                    <div className="container">
                        <div className="social-wrapper">
                            <h2>Мы в социальных сетях</h2>
                            <p>Подписывайтесь и следите за нашими новостями</p>
                            <div className="social-grid">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-card"
                                        style={{ '--social-color': social.color }}
                                    >
                                        <div className="social-icon">{social.icon}</div>
                                        <span>{social.name}</span>
                                        <div className="social-hover-effect"></div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta-section">
                    <div className="container">
                        <div className="cta-content">
                            <h2>Забронируйте столик прямо сейчас</h2>
                            <p>Создайте незабываемый вечер в ресторане Amiron</p>
                            <button className="cta-button" onClick={() => setIsModalOpen(true)}>
                                Забронировать столик
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}