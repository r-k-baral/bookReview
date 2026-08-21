// 
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { token, user, logout } = useAuth();




  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkStyle = {
    margin: "8px 5px",
    padding: "8px 15px",
    textDecoration: "none",
    color: "black",
    backgroundColor: "#FFA500",
    borderRadius: "6px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <nav
      style={{
        backgroundColor: "#0096FF",
        padding: "5px 15px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Link style={linkStyle} to="/">
          Home
        </Link>

        <Link style={linkStyle} to="/books">
          Books
        </Link>

        {/* <Link style={linkStyle} to="/">
          Books
        </Link> */}

        {!token && (
          <Link style={linkStyle} to="/login">
            Login
          </Link>
        )}

        {user?.role === "admin" && (
          <Link style={linkStyle} to="/register">
            Register
          </Link>
        )}

        {token && (
          <>
            <span
              style={{
                color: "white",
                fontWeight: "bold",
                margin: "0 10px",
              }}
            >
             hi, {user?.username}
            </span>

            <button
              onClick={handleLogout}
              style={{
                margin: "8px 5px",
                padding: "8px 15px",
                color: "black",
                backgroundColor: "#FFA500",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;