import { useState } from "react";
import "../Login.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CUSTOMER");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://multi-vendor-ecommerce-production-92e9.up.railway.app/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            role: role,
          }),
        }
      );

      const data = await response.text();

      if (response.ok) {
        alert("Account created successfully!");

        setName("");
        setEmail("");
        setPassword("");
        setRole("CUSTOMER");

        window.location.href = "/login";
      } else {
        alert(data);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Create Account</h1>

        <form onSubmit={handleSignup}>
          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Account Type</label>

          <select
            className="auth-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="CUSTOMER">Customer</option>
            <option value="VENDOR">Vendor</option>
          </select>

          <button type="submit">
            Create Account
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;