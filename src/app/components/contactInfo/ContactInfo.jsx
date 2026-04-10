"use client";
import { restaurantInfo } from "@/app/utils/data";
import "./contactInfo.css";

export default function ContactInfo() {
    const openGoogleMaps = () => {
        window.open(restaurantInfo.googleMaps, "_blank");
    };

    return (
        <div className="contact-info">
            <div className="contact-grid">
                <div className="contact-card">
                    <div className="contact-icon">📞</div>
                    <h3>Телефоны</h3>
                    {restaurantInfo.phones.map((phone) => (
                        <a key={phone} href={`tel:${phone}`} className="contact-link">
                            {phone}
                        </a>
                    ))}
                </div>

                <div className="contact-card">
                    <div className="contact-icon">📍</div>
                    <h3>Адрес</h3>
                    <p>{restaurantInfo.addressFull}</p>
                    <button onClick={openGoogleMaps} className="contact-map-btn">
                        Открыть в Google Maps →
                    </button>
                </div>

                <div className="contact-card">
                    <div className="contact-icon">⏰</div>
                    <h3>Режим работы</h3>
                    <p>{restaurantInfo.workingHours}</p>
                </div>

                <div className="contact-card">
                    <div className="contact-icon">📧</div>
                    <h3>Email</h3>
                    <a href={`mailto:${restaurantInfo.email}`} className="contact-link">
                        {restaurantInfo.email}
                    </a>
                </div>
            </div>

            <div className="contact-social">
                <h3>Мы в соцсетях</h3>
                <a href={restaurantInfo.instagram} target="_blank" rel="noopener noreferrer" className="social-link instagram">
                    <span>📸</span> Instagram
                </a>
            </div>
        </div>
    );
}