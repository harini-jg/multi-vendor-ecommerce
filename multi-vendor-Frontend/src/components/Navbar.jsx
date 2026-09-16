import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    logout();
    alert("Logged out successfully!");
    navigate("/");
  };

  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <Link to="/">MultiVendor</Link>
      </div>

      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search products..."
        />
        <button>Search</button>
      </div>

      <div className="navbar-links">

        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        {user && user.role === "VENDOR" && (
          <Link to="/vendor-dashboard">
             Vendor Dashboard
          </Link>
        )}

        {user && (
          <Link to="/my-orders">My Orders</Link>
        )}

        {user ? (
          <>
            <span className="welcome-text">
              Welcome, {user.name}
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        <Link to="/cart">
          🛒 Cart ({cartCount})
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;