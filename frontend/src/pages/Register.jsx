import { useState } from "react";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
    username: ""
  });
const [error, setError] = useState("")
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendData();
  };

  const sendData = async () => {
    try {
          setError(" ")
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        }
      );
    const result = await response.json();

 if (!response.ok) {
      setError(result.message)
      return;
    }
      setFormData(" ")
      console.log(result);

    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div style={{ border:"1px solid black" , margin:"20px auto", width:"500px", height:"400px"}}>
      <h1 style={{fontWeight:"bold"}}>Register</h1>
     
     {error && <p style={{color:"red"}}>{error}</p>}
      <form onSubmit={handleSubmit}>

        <div >
          <label style={{fontWeight:"bold", marginBottom:'2px', display:"block" }} >Username</label> 
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            style={{width:"350px", height:"30px", borderRadius:"5px" ,border:'1px solid black'}}

          />
        </div>

        <div>
          <label style={{fontWeight:"bold", marginTop:'10px', display:"block" }}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
             style={{width:"350px", height:"30px", borderRadius:"5px" ,border:'1px solid black'}}

          />
        </div>

        <div>
          <label style={{fontWeight:"bold", marginTop:'10px', display:"block" }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
             style={{width:"350px", height:"30px", borderRadius:"5px" ,border:'1px solid black'}}
          />
        </div>

        <div>
          <label style={{fontWeight:"bold", marginTop:'10px', display:"block" }} >Role</label> 
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Enter role"
             style={{width:"350px", height:"30px", borderRadius:"5px" ,border:'1px solid black'}}
          />
        </div>

        <button type="submit" style={{ marginTop:"20px", width:"200px", height:"30px", border:"none",borderRadius:"5px", backgroundColor: "#FFA500"}}>Register</button>

      </form>
    </div>
  );
}

export default Register;