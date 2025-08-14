"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://ticketsystem-3.onrender.com/api/users/login",
        formData
      );

      if (response.status === 200) {
        const user = response.data;
        localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userRole", user.role);

        if (user.role === "USER") {
          router.push("/Userdashboard");
        } else if (user.role === "SUPPORT_AGENT") {
          router.push("/Supportagentdashboard");
        } else {
          router.push("/AdminDashboard");
        }
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Welcome to Ticket Raiser You can ask for solution of any problem you observe </h1>
      <div style={styles.card}>
        <h2 style={styles.title}>🎫Login</h2>
        <p style={styles.subtitle}>
          Welcome back! Please log in to continue.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button
            style={{
              ...styles.button,
              backgroundColor: loading ? "#555" : "#0070f3",
              cursor: loading ? "not-allowed" : "pointer",
            }}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.signupText}>
          Don&apos;t have an account?{" "}
          <span
            style={styles.signupLink}
            onClick={() => router.push("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
     background: 'linear-gradient(135deg, #89f7fe, #66a6ff)',
  },
  card: {
    background: "#fff",
    padding: "40px",
    margin:"50px",
    borderRadius: "12px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
    width: "100%",
    maxWidth: "380px",
    textAlign: "center",
    animation: "fadeIn 0.5s ease-in-out",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "8px",
    color: "#333",
  },
  subtitle: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "bold",
    fontSize: "14px",
    color: "#444",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "14px",
    transition: "all 0.3s ease",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "background-color 0.3s ease",
  },
  signupText: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#555",
  },
  signupLink: {
    color: "#0070f3",
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "underline",
  },
};
