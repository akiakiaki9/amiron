import { useState, useEffect } from "react";
import {
    FiUsers,
    FiMaximize2,
    FiCheck,
    FiCalendar,
    FiStar,
    FiHeart
} from "react-icons/fi";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import "./hallHeader.css";

export default function HallHeader({ title, description, image, capacity, area, features }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="hall-header">
            <div className="hall-header-bg">
                <img src="https://www.centralasia-travel.com/upload/tiles/grand-bukhara-hotel-14.jpg" className="hall-header-image" />
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
                                <FiMaximize2 className="stat-icon" />
                            </div>
                            <div>
                                <div className="stat-label">Площадь</div>
                                <div className="stat-value">{area}</div>
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
                        <button className="action-btn primary">
                            <FiCalendar className="btn-icon" />
                            Забронировать
                        </button>
                        <button className="action-btn secondary">
                            <FiHeart className="btn-icon" />
                            В избранное
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
    );
}