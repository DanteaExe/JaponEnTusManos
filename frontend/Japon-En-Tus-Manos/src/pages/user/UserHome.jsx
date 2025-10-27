import React, { useEffect, useState } from "react";
import { getProducts } from "../../services/products";
import ProductCard from "../../components/ProductCard";
import Navbar from "../../components/Navbar";
import "../../styles/ProductCard.css";
import { updateUser } from "../../services/users";
import EditProfileModal from "../../components/EditProfileModal";

function UserHome() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Location: "",
    PasswordHash: "",
  });


  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const u = JSON.parse(stored);
      setUser(u);
      setFormData({
        Name: u.Name,
        Email: u.Email,
        Location: u.Location,
        PasswordHash: "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const updatedUser = {
        UserID: user.UserID,
        Name: formData.Name,
        Email: formData.Email,
        Location: formData.Location,
        ...(formData.PasswordHash && { PasswordHash: formData.PasswordHash }),
      };

      const updated = await updateUser(updatedUser);
      setUser(updated);
      localStorage.setItem("user", JSON.stringify(updated));
      setEditing(false);
      alert("Perfil actualizado con éxito 🎉");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar usuario");
    }
  };
  
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
  setCart(prevCart => {
    const existing = prevCart.find(p => p.ProductID === product.ProductID);
    if (existing) {
      return prevCart.map(p =>
        p.ProductID === product.ProductID 
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
            <ProductCard key={p.ProductID} product={p} onBuy={handleBuy} />
          ))
        ) : (
          <p style={{ color: "gray", marginTop: "50px" }}>No hay productos disponibles</p>
        )}
      </div>

      {/* 🔧 Botón para editar perfil */}
      <div style={{ textAlign: "center", margin: "20px" }}>
        <button
          onClick={() => setEditing(true)}
          style={{
            backgroundColor: "#e60039",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Editar Perfil ✏️
        </button>
      </div>
 {/* 🧾 Modal */}
      {editing && (
        <EditProfileModal
          formData={formData}
          onChange={handleChange}
          onSave={handleSave}
          onClose={() => setEditing(false)}
        />
      )}
    </div>
  );
}

export default UserHome;
