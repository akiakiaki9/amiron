"use client";
import { useState } from "react";
import { FiShoppingCart, FiHeart, FiEye } from "react-icons/fi";
import "./menuItem.css";

export default function MenuItem({ name, price, description, image, onOrder }) {
    const [isHovered, setIsHovered] = useState(false);

    // Форматирование цены
    const formatPrice = (price) => {
        if (!price) return "0 сум";
        const priceStr = String(price);
        // Убираем пробелы если есть и форматируем
        const cleanPrice = priceStr.replace(/\s/g, '');
        const numPrice = parseFloat(cleanPrice);
        if (isNaN(numPrice)) return priceStr;
        return numPrice.toLocaleString('ru-RU') + " сум";
    };

    return (
        <div
            className="menu-item"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="menu-item-image">
                <img src={image} alt={name} loading="lazy" />
                {isHovered && (
                    <div className="menu-item-overlay">
                        <button className="overlay-btn" onClick={onOrder}>
                            <FiShoppingCart />
                        </button>
                        <button className="overlay-btn">
                            <FiHeart />
                        </button>
                        <button className="overlay-btn">
                            <FiEye />
                        </button>
                    </div>
                )}
            </div>
            <div className="menu-item-info">
                <div className="menu-item-header">
                    <h4 className="menu-item-name">{name}</h4>
                    <span className="menu-item-price">{formatPrice(price)}</span>
                </div>
                <p className="menu-item-description">{description}</p>
                <button className="menu-item-order-btn" onClick={onOrder}>
                    Заказать
                </button>
            </div>
        </div>
    );
}