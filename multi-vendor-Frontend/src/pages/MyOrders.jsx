import { useEffect, useState } from "react";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetch(
      `http://localhost:8080/api/orders/user/${user.id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load orders");
        }

        return response.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Orders error:", error);
        setLoading(false);
      });
  }, [user?.id]);

  if (!user) {
    return (
      <div className="orders-page">
        <div className="orders-container">
          <h1>My Orders</h1>
          <p>Please login to view your orders.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-container">
          <h1>My Orders</h1>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">

        <h1>My Orders</h1>

        {orders.length === 0 ? (
          <div className="no-orders">
            <h2>No orders found</h2>
            <p>
              Your orders will appear here after checkout.
            </p>
          </div>
        ) : (
          <div className="orders-list">

            {orders.map((order) => (
              <div
                className="order-card"
                key={order.id}
              >
                <div className="order-header">

                  <h2>
                    Order #{order.id}
                  </h2>

                  <span className="order-status">
                    {order.status}
                  </span>

                </div>

                <div className="order-details">

                  <p>
                    <strong>Order ID:</strong>{" "}
                    {order.id}
                  </p>

                  <p>
                    <strong>Total Amount:</strong>{" "}
                    ₹
                    {Number(
                      order.totalAmount
                    ).toLocaleString("en-IN")}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {order.status}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default MyOrders;