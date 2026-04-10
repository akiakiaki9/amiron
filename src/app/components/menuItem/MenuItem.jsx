import "./menuItem.css";

export default function MenuItem({ name, price, description, image }) {
    return (
        <div className="menu-item-card">
            <div className="menu-item-image">
                <img src={image} alt={name} loading="lazy" />
            </div>
            <div className="menu-item-details">
                <div className="menu-item-header">
                    <h4 className="menu-item-name">{name}</h4>
                    <span className="menu-item-price">{price} сум</span>
                </div>
                <p className="menu-item-description">{description}</p>
                <button className="menu-item-order">Заказать</button>
            </div>
        </div>
    );
}