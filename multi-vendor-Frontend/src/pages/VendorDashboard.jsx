import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./VendorDashboard.css";

function VendorDashboard() {
  const { user } = useAuth();
  if (!user || user.role !== "VENDOR") {
  return (
    <div className="vendor-page">
      <div className="vendor-container">
        <h1>Access Denied</h1>
        <p>Only vendors can access the Vendor Dashboard.</p>
      </div>
    </div>
  );
}

  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [vendor, setVendor] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");

  // Load all products
  const loadProducts = () => {
    fetch("http://localhost:8080/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load products");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Product loading error:", error);
      });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://localhost:8080/api/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name,
            price: Number(price),
            category: category,
            vendor: vendor,
            description: description,
            stock: Number(stock),
          }),
        }
      );

      if (response.ok) {
        alert("Product added successfully!");

        setName("");
        setPrice("");
        setCategory("");
        setVendor("");
        setDescription("");
        setStock("");

        setShowForm(false);

        loadProducts();
      } else {
        const error = await response.text();
        alert("Failed: " + error);
      }
    } catch (error) {
      console.error("Add product error:", error);
      alert("Backend connection failed");
    }
  };
  // Edit product
const handleEditProduct = async (product) => {
  const newName = window.prompt(
    "Enter product name:",
    product.name
  );

  if (newName === null) {
    return;
  }

  const newPrice = window.prompt(
    "Enter price:",
    product.price
  );

  if (newPrice === null) {
    return;
  }

  const newStock = window.prompt(
    "Enter stock:",
    product.stock
  );

  if (newStock === null) {
    return;
  }

  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      `http://localhost:8080/api/products/${product.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newName,
          price: Number(newPrice),
          category: product.category,
          vendor: product.vendor,
          description: product.description,
          stock: Number(newStock),
        }),
      }
    );

    if (response.ok) {
      alert("Product updated successfully!");
      loadProducts();
    } else {
      const error = await response.text();
      alert("Failed: " + error);
    }
  } catch (error) {
    console.error("Edit product error:", error);
    alert("Backend connection failed");
  }
};

  // Delete product
  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://localhost:8080/api/products/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        alert("Product deleted successfully!");

        loadProducts();
      } else {
        const error = await response.text();
        alert("Failed: " + error);
      }
    } catch (error) {
      console.error("Delete product error:", error);
      alert("Backend connection failed");
    }
  };

  // Total stock
  const totalStock = products.reduce(
    (total, product) =>
      total + Number(product.stock),
    0
  );

  // Total product value
  const totalValue = products.reduce(
    (total, product) =>
      total +
      Number(product.price) *
        Number(product.stock),
    0
  );

  return (
    <div className="vendor-page">

      <div className="vendor-container">

        <h1>Vendor Dashboard</h1>

        <p>
          Manage your products and inventory
        </p>

        {/* Statistics */}

        <div className="vendor-stats">

          <div className="stat-card">
            <h3>Total Products</h3>
            <strong>
              {products.length}
            </strong>
          </div>

          <div className="stat-card">
            <h3>Total Stock</h3>
            <strong>
              {totalStock}
            </strong>
          </div>

          <div className="stat-card">
            <h3>Products Value</h3>
            <strong>
              ₹{totalValue.toLocaleString("en-IN")}
            </strong>
          </div>

        </div>

        {/* Products Section */}

        <div className="vendor-products">

          <div className="vendor-products-header">

            <h2>My Products</h2>

            <button
              className="add-product-btn"
              onClick={() =>
                setShowForm(!showForm)
              }
            >
              + Add Product
            </button>

          </div>

          {/* Add Product Form */}

          {showForm && (

            <div className="vendor-card">

              <h2>Add New Product</h2>

              <form
                onSubmit={handleAddProduct}
              >

                <label>
                  Product Name
                </label>

                <input
                  type="text"
                  placeholder="Enter product name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  required
                />

                <label>
                  Price
                </label>

                <input
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                  required
                />

                <label>
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value)
                  }
                  required
                >

                  <option value="">
                    Select category
                  </option>

                  <option value="Electronics">
                    Electronics
                  </option>

                  <option value="Fashion">
                    Fashion
                  </option>

                  <option value="Home & Living">
                    Home & Living
                  </option>

                  <option value="Accessories">
                    Accessories
                  </option>

                </select>

                <label>
                  Vendor
                </label>

                <input
                  type="text"
                  placeholder="Enter vendor name"
                  value={vendor}
                  onChange={(e) =>
                    setVendor(e.target.value)
                  }
                  required
                />

                <label>
                  Description
                </label>

                <textarea
                  placeholder="Enter product description"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  required
                />

                <label>
                  Stock
                </label>

                <input
                  type="number"
                  placeholder="Enter stock quantity"
                  value={stock}
                  onChange={(e) =>
                    setStock(e.target.value)
                  }
                  required
                />

                <button type="submit">
                  Add Product
                </button>

              </form>

            </div>

          )}

          {/* Product Table */}

          {products.length === 0 ? (

            <p className="empty-products">
              No products available.
            </p>

          ) : (

            <div className="vendor-table-wrapper">

              <table className="vendor-table">

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>Product</th>

                    <th>Category</th>

                    <th>Price</th>

                    <th>Stock</th>

                    <th>Vendor</th>

                    <th>Actions</th>

                  </tr>

                </thead>

                <tbody>

                  {products.map(
                    (product) => (

                      <tr key={product.id}>

                        <td>
                          {product.id}
                        </td>

                        <td>
                          {product.name}
                        </td>

                        <td>
                          {product.category}
                        </td>

                        <td>
                          ₹
                          {Number(
                            product.price
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </td>

                        <td>
                          {product.stock}
                        </td>

                        <td>
                          {product.vendor}
                        </td>

                        <td>
                        
                        <button
                           className="edit-btn"
                           onClick={() => 
                            handleEditProduct(
                              product
                              )
                            }
                          >
                            Edit
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteProduct(
                                product.id
                              )
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default VendorDashboard;