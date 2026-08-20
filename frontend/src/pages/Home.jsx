
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()
  const [books, setBooks] = useState([]);
    const token = localStorage.getItem("token");
    let role = null;
    let username = null;
  
    if (token) {
      try {
        const decoded = jwtDecode(token);
        role = decoded.role;
        username = decoded.username;
      } catch (error) {
        console.log(`Invalid token: ${error.message}`);
      }
    }
    useEffect(() => {
     const abc = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/books/");

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }
      const data = await response.json();
        if(!data){
            throw new Error("we dont have data from backend")
        }
      setBooks(data);
    } catch (error) {
      console.error(error);
    }}
    abc()
  }, []);

  return (
    <>
  
    <div
  style={{
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "20px",
      width: "100%",
      margin: "20px auto",
      
    }}
>
  {books.map((book) => (
      <div
      key={book._id}
      style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          width: "250px",
          minHeight: "300px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
         
          
        }}
        >
      <div>
        <h2>
         <strong>Title:</strong> {book.title}
          </h2>

        <p>
          <strong>Author:</strong> {book.author}
        </p>

        <p>{book.description}</p>

        <p>
          <strong>ISBN:</strong> {book.isbn}
        </p>
      </div>
      <button
        onClick={() => navigate(`/book/${book.isbn}`)}
        style={{
            padding: "10px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            backgroundColor:'#FFA500'
        }}
        >
        View Book
      </button>
       {role === "admin" || role ==="reviewer"&& (
          <button
           onClick={() => navigate(`/book/${book.isbn}`)}
           style={{
            padding: "10px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            backgroundColor:'#0096FF'
        }} >
            Add Review
          </button>
        )}

    </div>
  ))}
</div>
  </>

  );
}

export default Home;