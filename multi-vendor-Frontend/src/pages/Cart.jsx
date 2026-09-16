import { useCart } from "../context/CartContext";
import "./Cart.css";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  const handleCheckout = async () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    alert("Please login before checkout.");
    return;
  }

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      "http://localhost:8080/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          totalAmount: total,
          status: "CONFIRMED",
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();

      alert(
        `Order placed successfully! Order ID: ${data.id}`
      );

      clearCart();
    } else {
      const error = await response.text();
      alert("Order failed: " + error);
    }
  } catch (error) {
    console.error("Checkout error:", error);
    alert("Backend connection failed");
  }
};

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">

          <h1>Shopping Cart</h1>

          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some products to your cart.</p>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">

      <div className="cart-container">

        <h1>Shopping Cart</h1>

        <div className="cart-content">

          {/* Cart Items */}

          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <div className="cart-item-image">
                  {item.icon || "🛍️"}
                </div>

                <div className="cart-item-details">

                  <h2>{item.name}</h2>

                  <p>
                    Category: {item.category}
                  </p>

                  <p className="cart-item-price">
                    ₹
                    {Number(item.price).toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      -
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

                <div className="cart-item-total">

                  ₹
                  {(
                    Number(item.price) *
                    item.quantity
                  ).toLocaleString("en-IN")}

                </div>

              </div>

            ))}

          </div>

          {/* Cart Summary */}

          <div className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">

              <span>
                Items
              </span>

              <span>
                {cart.reduce(
                  (total, item) =>
                    total + item.quantity,
                  0
                )}
              </span>

            </div>

            <div className="summary-row">

              <span>
                Total
              </span>

              <strong>
                ₹{total.toLocaleString("en-IN")}
              </strong>

            </div>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>

            <button
              className="clear-cart-btn"
              onClick={clearCart}
            >
              Clear Cart
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Cart;