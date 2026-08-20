import { useState } from "react";
import {  useNavigate } from "react-router-dom";



function SearchBooks() {

  const navigate = useNavigate()
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("title");
  const [message, setMessage] = useState("");
  const API = "http://localhost:5000/api";
  const searchBooks = async () => {
    if (!search.trim()) {
      setMessage("Enter something to search");
      return;
    }

    try {
      let url;

      if (type === "title") {
        url = `${API}/books/title/${search}`;
      } else if (type === "author") {
        url = `${API}/books/author/${search}`;
      } else {
        url = `${API}/books/${search}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        setBooks([]);
        setMessage(data.message);
        return;
      }

     setBooks(type === "isbn" ? [data] : data);
     
     setMessage("")
    } catch (error) {
      console.log(error);
      setMessage("Server error");
    }
  };

  return (
    <div>
      <h1>Search Books</h1>

      <select
        value={type}
        onChange={(e) => setType(e.target.value) }
        style={{width:'80px', height:"30px" , border:"none", borderRadius:"10px", textAlign:"center", marginRight:"10px" , backgroundColor: "#FFA500", }}
      >
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="isbn">ISBN</option>
      </select>

      <input
        type="text"
        value={search}
        placeholder={`Search by ${type}`}
        onChange={(e) => setSearch(e.target.value)}
        style={{width:'200px', height:"30px", borderRadius:'6px', border:'1px solid black'}}
      />

      <button onClick={searchBooks} style={{width:'80px', height:"30px" , border:"none", borderRadius:"10px", textAlign:"center", marginLeft:"10px" , backgroundColor: "#FFA500", }}>Search</button>

     {message && <p style={{color:"red"}} >{message}</p>}
        <div  style={{
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          width: "100%",
          margin: "20px auto",
        }}>
      {books.map((book) => (
        <div   style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              width: "350px",
              minHeight: "100px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxSizing: "border-box",
            }} key={book._id}>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>ISBN: {book.isbn}</p>
          <p>{book.description}</p>

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

          <hr />
        </div>
      ))}
      </div>

    </div>
  );
}

export default SearchBooks;