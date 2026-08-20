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
    let username = null;
  
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
    <input type="text" placeholder="Admin Settings" />
    <button type="submit">Save</button>
  </form>
) : (
  <p>You do not have access to this form.</p>
)}

      
    </div>
  );
}
export default BookDetails;
