"use client";
import { useState, useRef, useEffect } from "react";
import {
    FiUsers,
    FiMaximize2,
    FiCheck,
    FiStar,
    FiShare2,
    FiZoomIn,
    FiPlay,
    FiPause,
    FiX,
    FiUser,
    FiPhone,
    FiCalendar,
    FiClock,
    FiUsers as FiUsersIcon,
    FiSend,
    FiCheckCircle,
    FiAlertCircle,
    FiMessageCircle
} from "react-icons/fi";
import "./vipHallCard.css";

export default function VipHallCard({ hall, onBookingClick }) {
    const [isHovered, setIsHovered] = useState(false);
    const [showGallery, setShowGallery] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [currentImage, setCurrentImage] = useState(0);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
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
        hall: hall.title,
        message: ""
    });

    // Автоматическое воспроизведение видео при наведении
    useEffect(() => {
        if (isHovered && videoRef.current && hall.video) {
            videoRef.current.play().catch(e => console.log("Video play error:", e));
            setIsVideoPlaying(true);
        } else if (!isHovered && videoRef.current && hall.video) {
            videoRef.current.pause();
            setIsVideoPlaying(false);
        }
    }, [isHovered, hall.video]);

    // Блокировка скролла при открытой модалке
    useEffect(() => {
        if (showBookingModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showBookingModal]);

    const openGallery = (index) => {
        setCurrentImage(index);
        setShowGallery(true);
        document.body.style.overflow = "hidden";
    };

    const closeGallery = () => {
        setShowGallery(false);
        document.body.style.overflow = "auto";
    };

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % hall.gallery.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + hall.gallery.length) % hall.gallery.length);
    };

    const toggleVideo = (e) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (isVideoPlaying) {
                videoRef.current.pause();
                setIsVideoPlaying(false);
            } else {
                videoRef.current.play();
                setIsVideoPlaying(true);
            }
        }
    };

    // Функция для копирования ссылки
    const handleShare = async (e) => {
        e.stopPropagation();
        const url = window.location.href;
        const shareText = `🌟 VIP зал "${hall.title}" в ресторане Amiron!\n\n${hall.description}\n\nЗабронируйте сейчас: ${url}`;

        if (navigator.share) {
            // Для мобильных устройств с Web Share API
            try {
                await navigator.share({
                    title: `VIP зал ${hall.title} - Amiron Restaurant`,
                    text: hall.description,
                    url: window.location.href,
                });
            } catch (error) {
                console.log("Share cancelled:", error);
            }
        } else {
            // Для десктопа - копируем в буфер обмена
            try {
                await navigator.clipboard.writeText(shareText);
                alert("Ссылка скопирована в буфер обмена!");
            } catch (error) {
                console.error("Copy failed:", error);
                alert("Не удалось скопировать ссылку");
            }
        }
    };

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
                    message: `🏆 VIP зал: ${bookingData.hall}\n📆 Дата: ${bookingData.date}\n⏰ Время: ${bookingData.time}\n👥 Гостей: ${bookingData.guests}\n💬 Доп. информация: ${bookingData.message || "нет"}`,
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

    const handleBookingSubmit = async (e) => {
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
            const result = await sendToAPI(formData);

            if (result.success) {
                setFormStatus({
                    success: true,
                    message: result.message || "Заявка успешно отправлена! Мы свяжемся с вами."
                });

                // Очистка формы
                setFormData({
                    name: "",
                    phone: "",
                    date: "",
                    time: "",
                    guests: "2",
                    hall: hall.title,
                    message: ""
                });

                // Закрыть модалку через 2 секунды
                setTimeout(() => {
                    setShowBookingModal(false);
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

    const openBookingModal = () => {
        setShowBookingModal(true);
        if (onBookingClick) onBookingClick();
    };

    const closeBookingModal = () => {
        setShowBookingModal(false);
        setFormStatus(null);
    };

    // Получение минимальной даты (сегодня)
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    return (
        <>
            <div
                className="vip-hall-card"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="vip-hall-card-image">
                    {hall.video ? (
                        <>
                            <video
                                ref={videoRef}
                                className="vip-hall-video"
                                loop
                                muted
                                playsInline
                                poster={hall.image}
                                onLoadedData={() => setIsVideoLoaded(true)}
                            >
                                <source src={hall.video} type="video/mp4" />
                            </video>
                            {!isVideoLoaded && (
                                <div className="video-loader">
                                    <div className="loader-spinner"></div>
                                </div>
                            )}
                            <button
                                className="video-play-pause-btn"
                                onClick={toggleVideo}
                                aria-label={isVideoPlaying ? "Пауза" : "Воспроизвести"}
                            >
                                {isVideoPlaying ? <FiPause /> : <FiPlay />}
                            </button>
                        </>
                    ) : (
                        <img src={hall.image} alt={hall.title} />
                    )}
                    <div className="vip-hall-card-overlay"></div>
                    <button
                        className="vip-hall-gallery-btn"
                        onClick={() => openGallery(0)}
                    >
                        <FiZoomIn />
                        <span>Фото зала</span>
                    </button>
                </div>

                <div className="vip-hall-card-content">
                    <div className="vip-hall-badge">
                        <FiStar className="badge-icon" />
                        <span>VIP зал</span>
                    </div>

                    <h3 className="vip-hall-title">{hall.title}</h3>
                    <p className="vip-hall-description">{hall.description}</p>

                    <div className="vip-hall-stats">
                        <div className="vip-stat">
                            <FiUsers />
                            <span>{hall.capacity}</span>
                        </div>
                    </div>

                    <div className="vip-hall-features">
                        {hall.features.slice(0, 4).map((feature, idx) => (
                            <span key={idx} className="vip-feature">
                                <FiCheck />
                                {feature}
                            </span>
                        ))}
                        {hall.features.length > 4 && (
                            <span className="vip-feature-more">+{hall.features.length - 4}</span>
                        )}
                    </div>

                    <div className="vip-hall-actions">
                        <button className="vip-btn-primary" onClick={openBookingModal}>
                            Забронировать
                        </button>
                        <button className="vip-btn-secondary" onClick={handleShare}>
                            <FiShare2 />
                        </button>
                    </div>
                </div>
            </div>

            {/* Галерея модальное окно */}
            {showGallery && (
                <div className="gallery-modal" onClick={closeGallery}>
                    <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="gallery-close" onClick={closeGallery}>×</button>
                        <button className="gallery-nav prev" onClick={prevImage}>‹</button>
                        <div className="gallery-image-container">
                            <img src={hall.gallery[currentImage]} alt={`${hall.title} ${currentImage + 1}`} />
                        </div>
                        <button className="gallery-nav next" onClick={nextImage}>›</button>
                        <div className="gallery-counter">
                            {currentImage + 1} / {hall.gallery.length}
                        </div>
                    </div>
                </div>
            )}

            {/* Модальное окно бронирования */}
            {showBookingModal && (
                <div className="booking-modal-overlay" onClick={closeBookingModal}>
                    <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="booking-modal-close" onClick={closeBookingModal}>
                            <FiX />
                        </button>

                        <div className="booking-modal-header">
                            <div className="booking-modal-icon">
                                <FiStar />
                            </div>
                            <h2>Бронирование VIP зала</h2>
                            <p>{hall.title}</p>
                        </div>

                        <form className="booking-form" onSubmit={handleBookingSubmit}>
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
                                        <FiCalendar className="input-icon" />
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