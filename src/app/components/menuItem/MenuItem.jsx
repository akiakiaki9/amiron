"use client";
import { FaPhoneAlt } from "react-icons/fa";
import "./menuItem.css";

export default function MenuItem({ name, price, description, image, onOrder, isHovered }) {
    // Форматирование цены
    const formatPrice = (price) => {
        return new Intl.NumberFormat('ru-RU').format(price);
    };

    return (
        <div className={`menu-item ${isHovered ? "hovered" : ""}`}>
            <div className="menu-item-image">
                <img src={image} alt={name} />
                <div className="menu-item-overlay">
                    <button onClick={onOrder} className="order-btn">
                        <FaPhoneAlt />
                        Заказать
                    </button>
                </div>
            </div>
            <div className="menu-item-content">
                <div className="menu-item-header">
                    <h4 className="menu-item-name">{name}</h4>
                    <span className="menu-item-price">{formatPrice(price)} сум</span>
                </div>
                <p className="menu-item-description">{description}</p>
                <button onClick={onOrder} className="mobile-order-btn">
                    <FaPhoneAlt />
                    Заказать
                </button>
            </div>
        </div>
    );
}