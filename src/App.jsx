import "./App.css";

import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/Singup";
import Login from "./Pages/Login";
import Footer from "./Components/Footer";
import Profile from "./Pages/Profile";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import About from "./Pages/About";

import Productdetails from "./Pages/Productdetails";
import Home from "./Pages/Home";
import CatergorieProduct from "./Pages/CatergorieProduct";



function App() {
  return (



    <div className="flex flex-col h-full">
      <Navbar />

      {/* Main Content */}
      <div className="">
      
       


            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
             
              <Route path="/productdetails" element={<Productdetails />} />
              <Route path="/categorie" element={<CatergorieProduct />} />
            </Routes>
      
        
      </div>

      {/* Footer at bottom */}
      <Footer />
    </div>

  );
}

export default App;
