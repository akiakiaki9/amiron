"use client"
import { useState, useEffect, useRef } from "react";
import {
    FiUsers,
    FiMaximize2,
    FiCheck,
    FiCalendar,
    FiStar,
    FiX,
    FiUser,
    FiPhone,
    FiCalendar as FiCalendarIcon,
    FiClock,
    FiUsers as FiUsersIcon,
    FiSend,
    FiCheckCircle,
    FiAlertCircle,
    FiMessageCircle
} from "react-icons/fi";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import "./hallHeader.css";

export default function HallHeader({ title, description, video, capacity, area, features, onBookingClick }) {
    const [isVisible, setIsVisible] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState(null);
    const videoRef = useRef(null);

    // Форма бронирования
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        date: "",
        time: "",
        guests: "2",
        hall: title,
        message: ""
    });

    useEffect(() => {
        setIsVisible(true);

        // Проверяем загрузку видео
        if (videoRef.current) {
            videoRef.current.addEventListener('canplay', () => {
                setIsVideoLoaded(true);
            });
        }
    }, []);

    // Блокировка скролла при открытой модалке
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Отправка данных в API
    const sendToAPI = async (bookingData) => {
        try {
            const response = await fetch('/api/send-review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: bookingData.name,
                    phone: bookingData.phone,
                    message: `📅 Зал: ${bookingData.hall}\n📆 Дата: ${bookingData.date}\n⏰ Время: ${bookingData.time}\n👥 Гостей: ${bookingData.guests}\n💬 Доп. информация: ${bookingData.message || "нет"}`,
                    rating: 5
                }),
            });

            const data = await response.json();
            return { success: data.success, message: data.message };
        } catch (error) {
            console.error('API error:', error);
            return { success: false, message: error.message };
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Валидация
        if (!formData.name || !formData.phone || !formData.date || !formData.time) {
            setFormStatus({
                success: false,
                message: "Пожалуйста, заполните все обязательные поля"
            });
            setIsSubmitting(false);
            return;
        }

        try {
            // Отправка в API
            const result = await sendToAPI(formData);

            if (result.success) {
                setFormStatus({
                    success: true,
                    message: result.message || "Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время."
                });

                // Очистка формы
                setFormData({
                    name: "",
                    phone: "",
                    date: "",
                    time: "",
                    guests: "2",
                    hall: title,
                    message: ""
                });

                // Закрыть модалку через 2 секунды
                setTimeout(() => {
                    setIsModalOpen(false);
                    setFormStatus(null);
                }, 2000);
            } else {
                setFormStatus({
                    success: false,
                    message: result.message || "Произошла ошибка. Пожалуйста, попробуйте позже."
                });
            }
        } catch (error) {
            setFormStatus({
                success: false,
                message: "Произошла ошибка. Пожалуйста, позвоните нам."
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
        if (onBookingClick) onBookingClick();
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setFormStatus(null);
    };

    // Получение минимальной даты (сегодня)
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    return (
        <>
            <section className="hall-header">
                <div className="hall-header-bg">
                    {video ? (
                        <>
                            <video
                                ref={videoRef}
                                className="hall-header-video"
                                autoPlay
                                loop
                                muted
                                playsInline
                                poster="/images/hall-poster.jpg"
                            >
                                <source src={video} type="video/mp4" />
                            </video>
                            {!isVideoLoaded && (
                                <div className="video-loader">
                                    <div className="loader-spinner"></div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="hall-header-fallback">
                            <div className="fallback-content">
                                <span>🎬</span>
                                <p>Видео загружается...</p>
                            </div>
                        </div>
                    )}
                    <div className="hall-header-overlay"></div>
                </div>

                <div className="hall-header-decoration">
                    <div className="decoration-line"></div>
                    <div className="decoration-circle"></div>
                </div>

                <div className="container">
                    <div className={`hall-header-content ${isVisible ? "visible" : ""}`}>
                        <div className="hall-header-badge">
                            <FiStar className="badge-icon" />
                            <span>Премиум класс</span>
                        </div>

                        <h1 className="hall-header-title">{title}</h1>
                        <p className="hall-header-description">{description}</p>

                        <div className="hall-header-stats">
                            <div className="stat-item">
                                <div className="stat-icon-wrapper">
                                    <FiUsers className="stat-icon" />
                                </div>
                                <div>
                                    <div className="stat-label">Вместимость</div>
                                    <div className="stat-value">{capacity}</div>
                                </div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-icon-wrapper">
                                    <HiOutlineEmojiHappy className="stat-icon" />
                                </div>
                                <div>
                                    <div className="stat-label">Настроение</div>
                                    <div className="stat-value">Праздничное</div>
                                </div>
                            </div>
                        </div>

                        <div className="hall-features">
                            {features.map((feature, idx) => (
                                <span key={idx} className="feature-tag">
                                    <FiCheck className="feature-icon" />
                                    {feature}
                                </span>
                            ))}
                        </div>

                        <div className="hall-header-actions">
                            <button className="action-btn primary" onClick={openModal}>
                                <FiCalendar className="btn-icon" />
                                Забронировать
                            </button>
                        </div>
                    </div>
                </div>

                <div className="hall-header-scroll-indicator">
                    <span>Листайте вниз</span>
                    <div className="scroll-mouse">
                        <div className="scroll-wheel"></div>
                    </div>
                </div>
            </section>

            {/* Модальное окно бронирования */}
            {isModalOpen && (
                <div className="booking-modal-overlay" onClick={closeModal}>
                    <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="booking-modal-close" onClick={closeModal}>
                            <FiX />
                        </button>

                        <div className="booking-modal-header">
                            <div className="booking-modal-icon">
                                <FiCalendar />
                            </div>
                            <h2>Бронирование зала</h2>
                            <p>Заполните форму и мы свяжемся с вами</p>
                        </div>

                        <form className="booking-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>
                                        <FiUser className="input-icon" />
                                        Ваше имя *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Иван Иванов"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>
                                        <FiPhone className="input-icon" />
                                        Телефон *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+998 90 123 45 67"
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>
                                        <FiCalendarIcon className="input-icon" />
                                        Дата *
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        min={getMinDate()}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>
                                        <FiClock className="input-icon" />
                                        Время *
                                    </label>
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        required
                                        disabled={isSubmitting}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>
                                        <FiUsersIcon className="input-icon" />
                                        Количество гостей
                                    </label>
                                    <select
                                        name="guests"
                                        value={formData.guests}
                                        onChange={handleInputChange}
                                        disabled={isSubmitting}
                                    >
                                        <option value="1">1 гость</option>
                                        <option value="2">2 гостя</option>
                                        <option value="3">3 гостя</option>
                                        <option value="4">4 гостя</option>
                                        <option value="5">5 гостей</option>
                                        <option value="6">6 гостей</option>
                                        <option value="7">7 гостей</option>
                                        <option value="8">8 гостей</option>
                                        <option value="9">9 гостей</option>
                                        <option value="10">10+ гостей</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>
                                        <FiStar className="input-icon" />
                                        Выбранный зал
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.hall}
                                        disabled
                                        className="hall-name-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group full-width">
                                <label>
                                    <FiMessageCircle className="input-icon" />
                                    Дополнительная информация
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Ваши пожелания, особые требования..."
                                    rows="3"
                                    disabled={isSubmitting}
                                ></textarea>
                            </div>

                            {formStatus && (
                                <div className={`form-status ${formStatus.success ? "success" : "error"}`}>
                                    {formStatus.success ? <FiCheckCircle /> : <FiAlertCircle />}
                                    <span>{formStatus.message}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="booking-submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>Отправка...</>
                                ) : (
                                    <>
                                        <FiSend />
                                        Отправить заявку
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}