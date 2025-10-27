import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSale } from "../../services/sales";
import { decreaseStock } from "../../services/products";


function Cart() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const storedCart = localStorage.getItem("cart");
    if (storedCart) setCart(JSON.parse(storedCart));
  }, []);

  // Guardar carrito
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const total = cart.reduce((sum, item) => sum + item.Quantity * item.UnitPrice, 0);

  if (!user)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Por favor inicia sesión</h2>
      </div>
    );

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("El carrito está vacío");

    try {
      await createSale({
        UserID: user.UserId,
        Total: total,
        PaymentStatus: "pending",
        PaymentMethod: paymentMethod,
        Items: cart.map((item) => ({
          ProductID: item.ProductId,
          Quantity: item.Quantity,
          UnitPrice: item.UnitPrice,
        })),
      });

      // Reducir stock
      for (let item of cart) {
        await decreaseStock(item.ProductId, { quantity: item.Quantity });
      }

      alert("Compra realizada correctamente!");
      setCart([]);
      localStorage.removeItem("cart");
      navigate("/UserHome");
    } catch (err) {
      console.error(err);
      alert("Error al realizar la compra");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tu carrito</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item.ProductId}
              style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}
            >
              <div>{item.ProductName} x {item.Quantity}</div>
              <div>${item.Quantity * item.UnitPrice}</div>
            </div>
          ))}
          <h3>Total: ${total}</h3>
          <div>
            <label>Método de pago: </label>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option>Credit Card</option>
              <option>PayPal</option>
            </select>
          </div>
          <button onClick={handleCheckout} style={{ marginTop: "20px" }}>
            Pagar
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
