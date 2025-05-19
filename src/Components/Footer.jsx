import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <div className="flex ">
      <div className="bg-black text-white w-full flex flex-col items-center">
        {/* Main Content */}
        <div className="w-full max-w-screen-xl  px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Subscribe Section */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-xl font-bold">BuyAnything</h2>
            <p className="text-base font-semibold">Subscribe</p>
            <p className="text-sm">Get 10% off your first order</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="pl-3 py-2 h-[40px] w-full max-w-[250px] border border-white bg-transparent text-white placeholder-white rounded-md"
            />
            <button className="border border-white px-4 py-2 bg-white text-black font-semibold hover:bg-amber-300 transition rounded-md w-fit">
              Subscribe
            </button>
          </div>

          {/* Support Section */}
          <div className="flex flex-col space-y-3">
            <h2 className="text-xl font-bold">Support</h2>
            <p className="text-sm">
              Lingamaiah Colony, Lingampally <br />
              Hyderabad, Telangana, India
            </p>
            <p className="text-sm">sunnypraneeth311977@gmail.com</p>
            <p className="text-sm">+91 6303017456</p>
          </div>

          {/* Account Section */}
          <div className="flex flex-col space-y-3">
            <h2 className="text-xl font-bold">Account</h2>
            <a href="#" className="hover:underline text-sm">Login / Register</a>
            <a href="#" className="hover:underline text-sm">Cart</a>
            <a href="#" className="hover:underline text-sm">Wishlist</a>
            <a href="#" className="hover:underline text-sm">Shop</a>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col space-y-3">
            <h2 className="text-xl font-bold">Quick Link</h2>
            <a href="#" className="hover:underline text-sm">Privacy Policy</a>
            <a href="#" className="hover:underline text-sm">Terms Of Use</a>
            <a href="#" className="hover:underline text-sm">FAQ</a>
            <a href="#" className="hover:underline text-sm">Contact</a>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="w-full border-t border-white/20 py-4 flex justify-center">
          <div className="flex space-x-6 text-amber-500">
            <Facebook className="hover:text-white cursor-pointer transition" />
            <Instagram className="hover:text-white cursor-pointer transition" />
            <Twitter className="hover:text-white cursor-pointer transition" />
            <Youtube className="hover:text-white cursor-pointer transition" />
          </div>
        </div>
      </div>
    </div>
  );
}
