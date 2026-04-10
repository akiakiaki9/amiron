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
    FiLoader
} from "react-icons/fi";
import { FaWhatsapp, FaTelegram, FaTiktok } from "react-icons/fa";
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
        message: ""
    });
    const [formStatus, setFormStatus] = useState({
        submitted: false,
        success: false,
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Telegram администратора (замените на реальный username)
    const TELEGRAM_ADMIN = "akbarsoftowner"; // Username администратора в Telegram
    // Или можно использовать номер телефона (но лучше username)
    // const TELEGRAM_PHONE = "998900830707";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Форматирование сообщения для Telegram
    const formatTelegramMessage = () => {
        const currentDate = new Date().toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        return `📞 НОВОЕ СООБЩЕНИЕ С САЙТА!

👤 Имя: ${formData.name}
📱 Телефон: ${formData.phone}
💬 Сообщение: ${formData.message}
🕐 Время: ${currentDate}

📍 Отправлено с сайта Amiron Restaurant
🌐 Страница: Контакты / Обратная связь`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const messageText = formatTelegramMessage();

            // Отправка в Telegram через username администратора
            const telegramUrl = `https://t.me/${TELEGRAM_ADMIN}?text=${encodeURIComponent(messageText)}`;

            // Открываем Telegram с готовым сообщением
            window.open(telegramUrl, '_blank');

            setFormStatus({
                submitted: true,
                success: true,
                message: "Сообщение отправлено! Мы свяжемся с вами в ближайшее время."
            });

            // Очищаем форму
            setFormData({ name: "", phone: "", message: "" });

            // Скрываем сообщение через 5 секунд
            setTimeout(() => {
                setFormStatus({ submitted: false, success: false, message: "" });
            }, 5000);

        } catch (error) {
            console.error('Ошибка отправки:', error);
            setFormStatus({
                submitted: true,
                success: false,
                message: "Произошла ошибка. Пожалуйста, позвоните нам по телефону."
            });
        } finally {
            setIsSubmitting(false);
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
            icon: <FaWhatsapp />,
            title: "WhatsApp",
            items: restaurantInfo.phones.map(phone => ({
                value: phone,
                link: "#",
                action: "Написать",
                onClick: () => openWhatsApp(phone)
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
                                <span>Свяжитесь с нами</span>
                            </div>
                            <h1>Контакты</h1>
                            <p>Мы всегда на связи и готовы ответить на ваши вопросы</p>
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

                {/* Feedback Form Section */}
                <section className="feedback-section">
                    <div className="container">
                        <div className="feedback-wrapper">
                            <div className="feedback-info">
                                <div className="feedback-info-content">
                                    <div className="info-badge">
                                        <GiKnifeFork />
                                        <span>Обратная связь</span>
                                    </div>
                                    <h2>Остались вопросы?</h2>
                                    <p>Заполните форму и мы свяжемся с вами в ближайшее время</p>
                                    <div className="info-features">
                                        <div className="info-feature">
                                            <FiCheckCircle />
                                            <span>Быстрый ответ</span>
                                        </div>
                                        <div className="info-feature">
                                            <FiCheckCircle />
                                            <span>Консультация специалиста</span>
                                        </div>
                                        <div className="info-feature">
                                            <FiCheckCircle />
                                            <span>Лучшие предложения</span>
                                        </div>
                                    </div>
                                    <div className="info-note">
                                        <FaTelegram />
                                        <span>Сообщение будет отправлено администратору в Telegram</span>
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
                                            Телефон
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="+998 90 123 45 67"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">
                                            <FiFileText className="label-icon" />
                                            Сообщение
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Ваш вопрос или пожелание..."
                                            rows="4"
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
                                                Отправка...
                                            </>
                                        ) : (
                                            <>
                                                <FiSend className="btn-icon" />
                                                Отправить сообщение
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