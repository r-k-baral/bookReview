import { useState } from "react";
import {  useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("")
const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     sendData()
  };
  const API = "http://localhost:5000/api/auth/login";
const sendData = async () => {
  try {
    setError("")
    const response = await fetch(API,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      }
    );

   

    const result = await response.json();
     if (!response.ok) {
      setError(result.message)
      return;
    }
   
    const token = result.token;

    localStorage.setItem("token", token);
     navigate("/")
  } catch (error) {
    console.error(error.message);
  }
};
  return (
    <div  style={{
      margin:'10px auto',
      border:" 1px solid black",
      height:'350px',
      width:"350px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      boxSizing:"border-box"
     
    }}>
      <h1  >Login</h1>
      {error && <p style={{color:"red"}} >{error}</p>}
      <form onSubmit={handleSubmit} >
        <div>
          <label style={{fontWeight:'bold', margin:"5px ", display:"block" }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            style={{width:"300px", height:"30px", borderRadius:"5px" ,border:'1px solid black'}}
          />
        </div>

        <div>
          <label style={{fontWeight:'bold', marginTop:"20px ",  display:"block" }} >Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
           style={{width:"300px", height:"30px", borderRadius:"5px" ,border:'1px solid black'}}
          />
        </div>

        <button style={{ marginTop:"30px", width:"200px", height:"30px", border:"none",borderRadius:"5px", backgroundColor: "#FFA500"}} type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;