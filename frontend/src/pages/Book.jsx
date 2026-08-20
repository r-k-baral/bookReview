import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookDetails() {
  const { isbn } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setreviews] = useState([]);
  const API = 'http://localhost:5000/api/books'
  const [addreview, setaddreview] = useState({
    rating:"",
    comment:""
  })
const token = localStorage.getItem("token");
    let role = null;
  
    if (token) {
      try {
        const decoded = jwtDecode(token);
        role = decoded.role;
      } catch (error) {
        console.log(`Invalid token: ${error.message}`);
      }
    }
  useEffect(() => {
    if (isbn) {
    const  books = async () => {
        try {
          const response = await fetch(
            `${API}/${isbn}`,
          );
          if (!response.ok) {
            throw new Error("Failed to fetch book");
          }
          const data = await response.json();
          if (!data) {
            throw new Error("We don't have data from backend");
          }
          setBook(data);
        } catch (error) {
          console.error(error);
        }
        // getReviews();
      };
       books()
    }
   

  }, [isbn]);

  useEffect(() => {
    if (isbn) {
    const dfc =async () => {
        try {
          const response = await fetch(
            `${API}/${isbn}/reviews`,
          );
          if (!response.ok) {
            throw new Error("Failed to fetch review");
          }
          const data = await response.json();
          if (!data) {
            throw new Error("We don't have data from backend");
          }

          setreviews(data);
        } catch (error) {
          console.error(error);
        }
      };
      dfc()
    }
  }, [isbn]);

  if (!isbn) {
    return <h1>ISBN is missing</h1>;
  }
  if (!book) {
    return <h1>Loading...</h1>;
  }
  return (
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
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          width: "350px",
          minHeight: "300px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <h1 style={{ color: "black" }}>Book Details</h1>

        <p>ISBN: {isbn}</p>

        <h2 style={{ color: "black" }}>{book.title}</h2>
        <p>{book.author}</p>
        <p>{book.description}</p>
      </div>

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
        {reviews.map((review) => (
          <div
            key={review._id}
            style={{
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
            }}
          >
            <div>
              <h2 style={{ color: "black" }}>{review.username}</h2>

              <p>
                <strong>rating:</strong> {review.rating}
              </p>

              <p>
                <strong>Comments: </strong>
                {review.comment}
              </p>
            </div>
          </div>
        ))}
      </div>
        {role === 'admin'|| role === "reviewer" ? (
  <form className="admin-form">
    <select style={{width:'80px', height:"30px" , border:"none", borderRadius:"10px", textAlign:"center", marginRight:"10px" , backgroundColor: "#FFA500", }}>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
    </select>
    <input type="text" placeholder="Comment"  style={{width:'200px', height:"30px", borderRadius:'6px', border:'1px solid black'}}/>
    <button type="submit" style={{width:'80px', height:"30px" , border:"none", borderRadius:"10px", textAlign:"center", marginLeft:"10px" , backgroundColor: "#FFA500"}}>Save</button>
  </form>
) : (
  <p>Want to review add ask admin to register your.</p>
)}

      
    </div>
  );
}
export default BookDetails;
