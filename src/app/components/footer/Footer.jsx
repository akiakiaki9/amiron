"use client";
import Link from "next/link";
import {
    FiMapPin,
    FiClock,
    FiInstagram,
    FiPhone,
    FiChevronRight,
    FiHeart,
    FiStar
} from "react-icons/fi";
import {
    GiKnifeFork,
    GiSunrise,
    GiChefToque
} from "react-icons/gi";
import { FaWhatsapp } from "react-icons/fa";
import { FaChampagneGlasses } from "react-icons/fa6";
import { restaurantInfo } from "@/app/utils/data";
import "./footer.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const hallLinks = [
        { name: "Свадебный зал", href: "/wedding-hall", icon: <FaChampagneGlasses /> },
        { name: "Банкетный зал", href: "/banquet-hall", icon: <GiKnifeFork /> },
        { name: "Терраса", href: "/terrace", icon: <GiSunrise /> }
    ];

    const openWhatsApp = (phone) => {
        const cleanPhone = phone.replace(/[^0-9]/g, '');
        window.open(`https://wa.me/${cleanPhone}`, '_blank');
    };

    return (
        <footer className="footer">
            <div className="footer-wave">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
                    <path fill="rgba(255,255,255,0.05)" d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,96C960,107,1056,117,1152,112C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
            </div>

            <div className="footer-container">
                <div className="footer-grid">
                    {/* Brand Section */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <div className="footer-logo-icon">
                                <GiChefToque />
                            </div>
                            <span className="footer-logo-name">{restaurantInfo.name}</span>
                        </div>
                        <p className="footer-description">{restaurantInfo.description}</p>
                        <div className="footer-badges">
                            <span className="footer-badge">
                                <FiStar /> {restaurantInfo.chef}
                            </span>
                            <span className="footer-badge">
                                <FiHeart /> {restaurantInfo.vibe}
                            </span>
                        </div>
                    </div>

                    {/* Halls Section */}
                    <div className="footer-section">
                        <h4 className="footer-section-title">
                            <GiKnifeFork className="section-icon" />
                            Наши залы
                        </h4>
                        <div className="footer-links">
                            {hallLinks.map((hall) => (
                                <Link key={hall.href} href={hall.href} className="footer-link">
                                    <span className="link-icon">{hall.icon}</span>
                                    {hall.name}
                                    <FiChevronRight className="link-arrow" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Hours Section */}
                    <div className="footer-section">
                        <h4 className="footer-section-title">
                            <FiClock className="section-icon" />
                            Часы работы
                        </h4>
                        <div className="footer-hours">
                            <p>{restaurantInfo.workingHours}</p>
                            <div className="social-links">
                                <h4 className="social-title">Соцсети</h4>
                                <a
                                    href={restaurantInfo.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-link instagram"
                                >
                                    <FiInstagram />
                                    Instagram
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="footer-section">
                        <h4 className="footer-section-title">
                            <FiPhone className="section-icon" />
                            Контакты
                        </h4>
                        <div className="footer-contact">
                            {restaurantInfo.phones.map((phone) => (
                                <div key={phone} className="contact-item">
                                    <a href={`tel:${phone}`} className="footer-phone">
                                        <FiPhone className="contact-icon" />
                                        {phone}
                                    </a>
                                    <button
                                        onClick={() => openWhatsApp(phone)}
                                        className="whatsapp-btn"
                                        aria-label="Написать в WhatsApp"
                                    >
                                        <FaWhatsapp />
                                    </button>
                                </div>
                            ))}
                            <div className="footer-address">
                                <FiMapPin className="contact-icon" />
                                <span>{restaurantInfo.address}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="footer-bottom">
                    <p>© {currentYear} {restaurantInfo.name}. Все права защищены.</p>
                    <p className="developer-credit">
                        Разработано{" "}
                        <a href="https://akbarsoft.uz" target="_blank" rel="noopener noreferrer" className="developer-link">
                            Akbar Soft
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}