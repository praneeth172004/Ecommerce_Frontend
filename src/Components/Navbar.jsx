import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBagSharpIcon from "@mui/icons-material/ShoppingBagSharp";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useCart } from "../ContextApi/AddtocartProvider";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const { cart } = useCart();

  let itemCount = cart.reduce((total, items) => total + items.quantity, 0);

  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
    { name: "Login", path: "/login" },
    { name: "Signup", path: "/signup" },
  ];

  const activeClass = "border-b-2 border-amber-500 text-amber-600 font-semibold";

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMenuOpen(false); // close mobile menu if open
    }
  };

  return (
    <div className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3 md:py-4 font-serif text-textcolor-100">
        {/* Brand */}
        <div
          className="text-[22px] sm:text-[25px] font-medium cursor-pointer"
          onClick={() => navigate("/")}
        >
          BuyAnything
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-[16px] sm:text-[18px] md:text-[20px]">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `cursor-pointer hover:border-b-2 hover:border-b-amber-100 ${
                  isActive ? activeClass : ""
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {/* Search Bar */}
         
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          
          <Link to="/cart">
            <div className="relative">
              <ShoppingBagSharpIcon fontSize="medium" className="cursor-pointer" />
              {itemCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {itemCount}
                </div>
              )}
            </div>
          </Link>
          <Link to="/profile">
            <AccountCircleIcon fontSize="medium" className="cursor-pointer" />
          </Link>
          <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
            {menuOpen ? <CloseIcon fontSize="medium" /> : <MenuIcon fontSize="medium" />}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 text-[16px] flex flex-col space-y-2 shadow-md">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `cursor-pointer hover:border-b-2 hover:border-b-amber-100 ${
                  isActive ? activeClass : ""
                }`
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </NavLink>
          ))}

          {/* Mobile Search */}
         
        </div>
      )}
    </div>
  );
}
