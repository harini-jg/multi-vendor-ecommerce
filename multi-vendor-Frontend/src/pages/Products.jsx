import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import "./Products.css";

function Products() {
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://multi-vendor-ecommerce-production-92e9.up.railway.app/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Product fetch error:", error);
        setError("Unable to load products");
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      icon: "🛍️",
    });

    alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="products-page">
        <div className="products-container">
          <div className="products-header">
            <h1>Our Products</h1>
            <p>Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="products-container">
          <div className="products-header">
            <h1>Our Products</h1>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-container">

        <div className="products-header">
          <h1>Our Products</h1>
          <p>Explore products from our trusted vendors.</p>
        </div>

        {products.length === 0 ? (
          <div className="products-header">
            <h2>No products available</h2>
            <p>Products will appear here when vendors add them.</p>
          </div>
        ) : (
          <div className="products-grid">

            {products.map((product) => (
              <div className="product-card" key={product.id}>

                <div className="product-image">
                  🛍️
                </div>

                <div className="product-info">

                  <span className="product-category">
                    {product.category}
                  </span>

                  <h2>{product.name}</h2>

                  <p className="product-vendor">
                    Sold by: {product.vendor}
                  </p>

                  <p>
                    {product.description}
                  </p>

                  <div className="product-price">
                    ₹{product.price.toLocaleString("en-IN")}
                  </div>

                  <p>
                    Stock: {product.stock}
                  </p>

                  <button
                    className="add-cart-btn"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock <= 0}
                  >
                    {product.stock > 0
                      ? "Add to Cart"
                      : "Out of Stock"}
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default Products;