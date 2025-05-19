import React, { useState } from "react";
import EditProfile from "../Components/EditProfile";
import AddressBook from "../Components/AddressBook";
import PaymentOption from "../Components/PaymentOption";
// You can create dummy components for other sections or import real ones


function MyOrders() {
  return <div className="text-black">View your Orders, Returns, Cancellations here.</div>;
}


export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");

  // Function to render content based on active tab
  function renderContent() {
    switch (activeTab) {
      case "profile":
        return <EditProfile />;
      case "address":
        return <AddressBook/>;
      case "payments":
        return <PaymentOption/>;
      case "orders":
        return <MyOrders />;
      default:
        return <EditProfile />;
    }
  }

  return (
    <main className="flex flex-col justify-center items-center text-white min-h-screen bg-gray-50">
      <div className="text-black mt-[100px] flex w-full pl-[50px] text-[20px]">
        Home / My Account
      </div>

      <div className="flex w-full max-w-[1140px] mt-6">
        {/* Sidebar */}
        <div className="w-[35%] p-4 bg-white rounded shadow-md">
          <div className="space-y-8">
            <div>
              <div className="text-black text-2xl font-semibold mb-4">
                Manage My Account
              </div>
              <ul className="space-y-2 text-gray-700 cursor-pointer">
                <li
                  className={`pl-3 py-1 rounded ${
                    activeTab === "profile"
                      ? "bg-amber-200 font-semibold text-black"
                      : ""
                  }`}
                  onClick={() => setActiveTab("profile")}
                >
                  My Profile
                </li>
                <li
                  className={`pl-3 py-1 rounded ${
                    activeTab === "address"
                      ? "bg-amber-200 font-semibold text-black"
                      : ""
                  }`}
                  onClick={() => setActiveTab("address")}
                >
                  Address Book
                </li>
                <li
                  className={`pl-3 py-1 rounded ${
                    activeTab === "payments"
                      ? "bg-amber-200 font-semibold text-black"
                      : ""
                  }`}
                  onClick={() => setActiveTab("payments")}
                >
                  My Payment Options
                </li>
              </ul>
            </div>

            <div>
              <div className="text-black text-2xl font-semibold mb-4">
                My Orders
              </div>
              <ul className="space-y-2 text-gray-700 cursor-pointer">
                <li
                  className={`pl-3 py-1 rounded ${
                    activeTab === "orders"
                      ? "bg-amber-200 font-semibold text-black"
                      : ""
                  }`}
                  onClick={() => setActiveTab("orders")}
                >
                  My Returns
                </li>
               
              </ul>
            </div>

           
          </div>
        </div>

        {/* Content Area */}
        <div className="w-[65%] p-6 bg-white rounded shadow-md ml-6 min-h-[500px]">
          {renderContent()}
        </div>
      </div>
    </main>
  );
}
