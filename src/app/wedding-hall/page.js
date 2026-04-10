"use client";
import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import BookingModal from "../components/bookingModal/BookingModal";
import HallHeader from "../components/hallHeader/HallHeader";
import MenuItem from "../components/menuItem/MenuItem";
import { menuData } from "../utils/data";
import "./page.css";

export default function WeddingHallPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const data = menuData.weddingHall;

    return (
        <>
            <Navbar onBookingClick={() => setIsModalOpen(true)} />
            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <main>
                <HallHeader
                    title={data.title}
                    description={data.description}
                    image={data.image}
                    capacity={data.capacity}
                    area={data.area}
                    features={data.features}
                />

                <section className="hall-menu">
                    <div className="container">
                        <div className="section-header">
                            <span className="section-tag">Меню</span>
                            <h2>Свадебное меню</h2>
                            <p>Традиционные и авторские блюда для вашего торжества</p>
                        </div>

                        {data.menu.map((category, idx) => (
                            <div key={idx} className="menu-category-section">
                                <h3 className="category-title">{category.category}</h3>
                                <div className="menu-items-grid">
                                    {category.items.map((item, itemIdx) => (
                                        <MenuItem
                                            key={itemIdx}
                                            name={item.name}
                                            price={item.price}
                                            description={item.description}
                                            image={item.image}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}