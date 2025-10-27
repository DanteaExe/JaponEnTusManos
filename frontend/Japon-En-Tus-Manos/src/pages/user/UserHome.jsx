import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/products";
import ProductCard from "../../components/ProductCard";
import Navbar from "../../components/Navbar";
import "../../styles/ProductCard.css";

function UserHome() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const handleBuy = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(p => p.ProductId === product.ProductId);
      if (existing) {
        return prevCart.map(p =>
          p.ProductId === product.ProductId
            ? { ...p, Quantity: p.Quantity + 1 }
            : p
        );
      } else {
        return [...prevCart, { ...product, Quantity: 1, UnitPrice: product.Price }];
      }
    });
  };

  if (!user) return <p style={{ textAlign: "center", marginTop: "50px" }}>Por favor inicia sesión</p>;

  return (
    <div>
      <Navbar cart={cart} userName={user.Name} />
      <div className="products-container">
        {products.length > 0 ? (
          products.map(p => (
            <ProductCard key={p.ProductId} product={p} onBuy={handleBuy} />
          ))
        ) : (
          <p style={{ color: "gray", marginTop: "50px" }}>No hay productos disponibles</p>
        )}
      </div>
    </div>
  );
}

export default UserHome;
