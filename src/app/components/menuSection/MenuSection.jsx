import "./menuSection.css";

export default function MenuSection({ title, description, menu }) {
    return (
        <section className="menu-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-tag">Наше меню</span>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </div>
                <div className="menu-categories">
                    {menu.map((category, idx) => (
                        <div key={idx} className="menu-category">
                            <div className="category-header">
                                <h3>{category.category}</h3>
                                <div className="category-line"></div>
                            </div>
                            <div className="menu-items">
                                {category.items.map((item, itemIdx) => (
                                    <div key={itemIdx} className="menu-item">
                                        <div className="menu-item-info">
                                            <div className="menu-item-name">
                                                <span>{item.name}</span>
                                                {item.spicy && <span className="spicy-badge">🌶️</span>}
                                            </div>
                                            <div className="menu-item-description">
                                                {item.description}
                                            </div>
                                        </div>
                                        <div className="menu-item-price">
                                            {item.price} сум
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}