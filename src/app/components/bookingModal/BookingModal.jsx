"use client";
import { useState, useEffect } from "react";
import { restaurantInfo } from "@/app/utils/data";
import "./bookingModal.css";

export default function BookingModal({ isOpen, onClose }) {
    const [copiedPhone, setCopiedPhone] = useState(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const copyToClipboard = (phone) => {
        navigator.clipboard.writeText(phone);
        setCopiedPhone(phone);
        setTimeout(() => setCopiedPhone(null), 2000);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>
                <div className="modal-icon">
                    <span>📞</span>
                </div>
                <h2>Бронирование столика</h2>
                <p>Позвоните нам для бронирования:</p>
                <div className="phone-list">
                    {restaurantInfo.phones.map((phone) => (
                        <div key={phone} className="phone-item">
                            <a href={`tel:${phone}`} className="phone-link">
                                {phone}
                            </a>
                            <button
                                className="copy-btn"
                                onClick={() => copyToClipboard(phone)}
                            >
                                {copiedPhone === phone ? "✓" : "Копировать"}
                            </button>
                        </div>
                    ))}
                </div>
                <p className="modal-note">
                    {restaurantInfo.workingHours}
                </p>
            </div>
        </div>
    );
}