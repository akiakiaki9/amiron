"use client";
import { useState } from "react";
import {
    FiStar,
    FiSend,
    FiCheckCircle,
    FiAlertCircle,
    FiLoader,
    FiUser,
    FiPhone,
    FiFileText,
    FiMessageSquare,
    FiThumbsUp
} from "react-icons/fi";
import { FaTelegram } from "react-icons/fa";
import "./HomeReview.css";

export default function HomeReview() {
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
                    message: "Спасибо за ваш отзыв! Мы ценим ваше мнение."
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
                message: "Произошла ошибка. Пожалуйста, попробуйте позже."
            });
        } finally {
            setIsSubmitting(false);

            setTimeout(() => {
                setFormStatus(prev => ({ ...prev, submitted: false }));
            }, 5000);
        }
    };

    // Компонент звездного рейтинга
    const StarRating = ({ rating, onRatingChange, onHover, hoveredRating }) => {
        return (
            <div className="home-star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className={`home-star-btn ${star <= (hoveredRating || rating) ? 'active' : ''}`}
                        onClick={() => onRatingChange(star)}
                        onMouseEnter={() => onHover(star)}
                        onMouseLeave={() => onHover(0)}
                    >
                        <FiStar />
                    </button>
                ))}
                <span className="home-rating-label">
                    {rating === 5 && "Отлично!"}
                    {rating === 4 && "Хорошо"}
                    {rating === 3 && "Нормально"}
                    {rating === 2 && "Плохо"}
                    {rating === 1 && "Ужасно"}
                </span>
            </div>
        );
    };

    return (
        <section className="home-review-section">
            <div className="container">
                <div className="home-review-header">
                    <span className="home-review-badge">
                        <FiMessageSquare />
                        Оставить отзыв
                    </span>
                    <h2>Ваше мнение важно для нас</h2>
                    <p>Поделитесь впечатлениями о нашем ресторане</p>
                </div>

                <div className="home-review-wrapper">
                    <div className="home-review-info">
                        <div className="home-review-stats">
                            <div className="home-rating-circle">
                                <div className="home-rating-number">4.8</div>
                                <div className="home-rating-stars">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <FiStar key={star} className="star-filled" />
                                    ))}
                                </div>
                                <div className="home-rating-text">Средняя оценка</div>
                            </div>
                            <div className="home-review-count">
                                <FiThumbsUp />
                                <span>128 отзывов</span>
                            </div>
                        </div>
                        <div className="home-review-features">
                            <h3>Почему оставляют отзывы у нас?</h3>
                            <ul>
                                <li>
                                    <FiCheckCircle />
                                    <span>Быстрая обратная связь</span>
                                </li>
                                <li>
                                    <FiCheckCircle />
                                    <span>Шеф-повар читает все отзывы</span>
                                </li>
                                <li>
                                    <FiCheckCircle />
                                    <span>Ваше мнение помогает нам стать лучше</span>
                                </li>
                                <li>
                                    <FiCheckCircle />
                                    <span>Анонимно или с указанием имени</span>
                                </li>
                            </ul>
                            <div className="home-review-note">
                                <FaTelegram />
                                <span>Отзыв отправляется напрямую администратору в Telegram</span>
                            </div>
                        </div>
                    </div>

                    <div className="home-review-form-wrapper">
                        <form className="home-review-form" onSubmit={handleSubmit}>
                            <div className="home-form-group">
                                <label htmlFor="home-name">
                                    <FiUser className="home-label-icon" />
                                    Ваше имя
                                </label>
                                <input
                                    type="text"
                                    id="home-name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Иван Иванов"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="home-form-group">
                                <label htmlFor="home-phone">
                                    <FiPhone className="home-label-icon" />
                                    Телефон (необязательно)
                                </label>
                                <input
                                    type="tel"
                                    id="home-phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="+998 90 123 45 67"
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="home-form-group">
                                <label>
                                    <FiStar className="home-label-icon" />
                                    Ваша оценка
                                </label>
                                <StarRating
                                    rating={formData.rating}
                                    onRatingChange={handleRatingChange}
                                    onHover={setHoveredRating}
                                    hoveredRating={hoveredRating}
                                />
                            </div>

                            <div className="home-form-group">
                                <label htmlFor="home-message">
                                    <FiFileText className="home-label-icon" />
                                    Ваш отзыв
                                </label>
                                <textarea
                                    id="home-message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Расскажите о вашем визите: что понравилось, какие блюда особенно запомнились..."
                                    rows="4"
                                    required
                                    disabled={isSubmitting}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="home-submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <FiLoader className="home-btn-icon spin" />
                                        Отправка...
                                    </>
                                ) : (
                                    <>
                                        <FiSend className="home-btn-icon" />
                                        Отправить отзыв
                                    </>
                                )}
                            </button>

                            {formStatus.submitted && (
                                <div className={`home-form-message ${formStatus.success ? "success" : "error"}`}>
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
    );
}