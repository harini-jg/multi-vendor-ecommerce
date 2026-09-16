import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">🛍️ Your One-Stop Marketplace</span>

          <h1>
            Shop Smarter.
            <br />
            Shop From <span>Multiple Vendors.</span>
          </h1>

          <p>
            Discover amazing products from trusted vendors,
            all in one convenient marketplace.
          </p>

          <Link to="/products" className="shop-btn">
            Shop Now →
          </Link>
        </div>

        <div className="hero-icon">
          🛒
        </div>
      </section>

      {/* Categories */}
      <section className="categories-section">
        <h2>Shop by Category</h2>
        <p className="section-subtitle">
          Explore products from different categories
        </p>

        <div className="category-grid">

          <div className="category-card">
            <div className="category-icon">📱</div>
            <h3>Electronics</h3>
            <p>Latest gadgets & devices</p>
          </div>

          <div className="category-card">
            <div className="category-icon">👕</div>
            <h3>Fashion</h3>
            <p>Trendy styles for everyone</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🏠</div>
            <h3>Home & Living</h3>
            <p>Everything for your home</p>
          </div>

          <div className="category-card">
            <div className="category-icon">🎧</div>
            <h3>Accessories</h3>
            <p>Useful everyday essentials</p>
          </div>

        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">

        <div className="section-heading">
          <div>
            <h2>Featured Products</h2>
            <p>Popular products you may like</p>
          </div>

          <Link to="/products" className="view-all">
            View All →
          </Link>
        </div>

        <div className="product-grid">

          {/* Product 1 */}
          <div className="product-card">
            <div className="product-image">
              📱
            </div>

            <div className="product-info">
              <span className="product-category">
                Electronics
              </span>

              <h3>Smartphone</h3>

              <p className="product-description">
                Latest smartphone with powerful performance.
              </p>

              <div className="product-bottom">
                <strong>₹25,999</strong>

                <button>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="product-card">
            <div className="product-image">
              🎧
            </div>

            <div className="product-info">
              <span className="product-category">
                Accessories
              </span>

              <h3>Wireless Headphones</h3>

              <p className="product-description">
                Enjoy high-quality sound with wireless freedom.
              </p>

              <div className="product-bottom">
                <strong>₹1,999</strong>

                <button>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="features-section">

        <h2>Why Choose MultiVendor?</h2>

        <div className="features-grid">

          <div className="feature-card">
            <div>🚚</div>
            <h3>Fast Delivery</h3>
            <p>Quick and reliable delivery to your doorstep.</p>
          </div>

          <div className="feature-card">
            <div>🔒</div>
            <h3>Secure Shopping</h3>
            <p>Your account and shopping experience stay protected.</p>
          </div>

          <div className="feature-card">
            <div>🏪</div>
            <h3>Multiple Vendors</h3>
            <p>Shop from different vendors in one marketplace.</p>
          </div>

          <div className="feature-card">
            <div>💳</div>
            <h3>Easy Payments</h3>
            <p>Simple and convenient payment experience.</p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;