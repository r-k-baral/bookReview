import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Book from "./pages/Book"
import Register from "./pages/Register"
import ProtectedLogin from "./protected"
import SearchBooks from "./pages/Search"


function App() {
  

  return (
   <>
    <Navbar/>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:isbn" element={<Book />} />
        <Route path="/books" element={<SearchBooks />} />
       <Route path="/login" element={<ProtectedLogin />} />
        <Route path="/register" element={<Register />} />
      </Routes>
   </>
  )
}
export default App

