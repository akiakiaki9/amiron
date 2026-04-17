"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { restaurantInfo } from "@/app/utils/data";
import "./navbar.css";

export default function Navbar({ onBookingClick }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const mobileMenuRef = useRef(null);
    const menuButtonRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Блокировка скролла при открытом меню и обработка клика вне меню
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";

            // Обработчик клика вне меню
            const handleClickOutside = (event) => {
                if (
                    mobileMenuRef.current &&
                    !mobileMenuRef.current.contains(event.target) &&
                    menuButtonRef.current &&
                    !menuButtonRef.current.contains(event.target)
                ) {
                    setIsMobileMenuOpen(false);
                }
            };

            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
                document.body.style.overflow = "auto";
            };
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMobileMenuOpen]);

    const navItems = [
        { name: "Главная", href: "/" },
        { name: "Свадебный зал", href: "/wedding-hall" },
        { name: "Общий зал", href: "/common-hall" },
        { name: "Терраса", href: "/terrace" },
        { name: "VIP залы", href: "/vip-halls" },
        { name: "Контакты", href: "/contacts" },
    ];

    return (
        <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
            <div className="nav-container">
                <Link href="/" className="logo">
                    <div className="logo-icon">
                        <img
                            src="/images/logo.png"
                            alt="Amiron Logo"
                            className="logo-img"
                        />
                    </div>
                    <div className="logo-text">
                        <span className="logo-name">{restaurantInfo.name}</span>
                        <span className="logo-tagline">{restaurantInfo.tagline}</span>
                    </div>
                </Link>

                <div
                    ref={mobileMenuRef}
                    className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}
                >
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`nav-link ${pathname === item.href ? "active" : ""}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="nav-actions">
                    <div className="nav-phones">
                        {restaurantInfo.phones.map((phone) => (
                            <a
                                key={phone}
                                href={`tel:${phone}`}
                                className="nav-phone"
                                onMouseEnter={(e) => {
                                    e.target.style.transform = "translateX(5px)";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = "translateX(0)";
                                }}
                            >
                                {phone}
                            </a>
                        ))}
                    </div>
                    <button className="booking-btn" onClick={onBookingClick}>
                        Бронировать
                    </button>
                    <button
                        ref={menuButtonRef}
                        className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </nav>
    );
};