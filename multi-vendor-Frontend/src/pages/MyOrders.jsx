import { useEffect, useState } from "react";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    fetch(
      `https://multi-vendor-ecommerce-production-92e9.up.railway.app/api/orders/user/${user.id}`,
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
      .then(async (data) => {
        const ordersWithItems = await Promise.all(
          data.map(async (order) => {
            const response = await fetch(
              `https://multi-vendor-ecommerce-production-92e9.up.railway.app/api/orders/${order.id}`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            if (!response.ok) {
              return {
                ...order,
                items: [],
              };
            }

            return response.json();
          })
        );

        setOrders(ordersWithItems);
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
            <p>You haven't placed any orders yet.</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                
                <div className="order-header">
                  <h2>Order #{order.id}</h2>

                  <span className="order-status">
                    {order.order?.status || order.status}
                  </span>
                </div>

                <div className="order-details">
                  <p>
                    <strong>Order ID:</strong>{" "}
                    {order.order?.id || order.id}
                  </p>

                  <p>
                    <strong>Total Amount:</strong> ₹
                    {Number(
                      order.order?.totalAmount || order.totalAmount
                    ).toLocaleString("en-IN")}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {order.order?.status || order.status}
                  </p>
                </div>

                {/* Products */}
                {order.items && order.items.length > 0 && (
                  <div className="order-products">
                    <h3>Products</h3>

                    {order.items.map((item) => (
                      <div
                        className="order-product"
                        key={item.id}
                      >
                        <div className="order-product-image">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.productName}
                            />
                          ) : (
                            <span>🛍️</span>
                          )}
                        </div>

                        <div className="order-product-details">
                          <h4>{item.productName}</h4>

                          <p>
                            Category: {item.category}
                          </p>

                          <p>
                            Price: ₹
                            {Number(item.price).toLocaleString(
                              "en-IN"
                            )}
                          </p>

                          <p>
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <div className="order-product-total">
                          ₹
                          {(
                            Number(item.price) *
                            Number(item.quantity)
                          ).toLocaleString("en-IN")}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;