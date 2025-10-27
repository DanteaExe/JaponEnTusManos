import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createSale } from "../../services/sales";
import { decreaseStock } from "../../services/products";
import "../../styles/Cart.css"; // Creamos CSS aparte

function Cart() {
    const navigate = useNavigate();
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem("cart");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const total = cart.reduce(
        (sum, item) => sum + item.Quantity * item.UnitPrice,
        0
    );


    const handleCheckout = async () => {
        if (cart.length === 0) return alert("Carrito vacío");

        // Aquí iría la creación de la venta y la reducción de stock
        // ...
    };

    const handleClearCart = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };


    if (cart.length === 0)
        return (
            <div className="cart-empty">
                <h2>Tu carrito está vacío</h2>
                <p>Agrega productos desde la tienda.</p>
            </div>
        );

    return (
        <div className="cart-container">
            <h2>Tu Carrito</h2>
            <div className="cart-items">
                {cart.map((item) => (
                    <div className="cart-item" key={item.ProductID}>
                        <div className="item-info">
                            <img src={item.ImageURL} alt={item.ProductName} />
                            <div>
                                <h4>{item.ProductName}</h4>
                                <p>Cantidad: {item.Quantity}</p>
                                <p>Precio unitario: ${item.UnitPrice}</p>
                            </div>
                        </div>
                        <div className="item-total">${item.Quantity * item.UnitPrice}</div>
                    </div>
                ))}
            </div>
            <h3 className="cart-total">Total: ${total.toFixed(2)}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
                Pagar
            </button>

            <button
                className="clear-btn"
                onClick={handleClearCart}
            >
                Vaciar carrito
            </button>

        </div>
    );
}

export default Cart;
