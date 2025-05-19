import React from 'react';
import sideimage from '../assets/about.png';
import image1 from "../assets/Group.png";
import delivery from "../assets/delivery.png";
import moneyback from "../assets/moneyback.png";
import service from "../assets/service.png";

export default function About() {
    const details = [
        { image: image1, Number: "10.5k", detail: "Sellers active on our site" },
        { image: image1, Number: "33k", detail: "Monthly Product Sales" },
        { image: image1, Number: "45.5k", detail: "Active Customers on our Site" },
        { image: image1, Number: "25k", detail: "Annual Gross Sales on our Site" }
    ];

    const other = [
        { image: delivery, title: "Free and Fast Delivery", data: "Free delivery for all orders above $120" },
        { image: service, title: "24/7 CUSTOMER SERVICE", data: "Friendly 24/7 Customer support" },
        { image: moneyback, title: "MONEY BACK GUARANTEE", data: "We return money within 30 days" }
    ];

    return (
        <div className="min-h-screen px-4 py-8">
            <main className="flex flex-col items-center">
                {/* Breadcrumb */}
                <div className="w-full text-[20px] text-black mt-10 mb-4 ml-[40px]">
                    Home / About
                </div>

                {/* Main Story Section */}
                <div className="w-full max-w-[1100px] p-6 flex flex-col md:flex-row items-center gap-6">
                    {/* Left Text Section */}
                    <div className="w-full md:w-[50%] flex flex-col gap-4">
                        <h1 className="text-3xl font-semibold">Our Story</h1>
                        <p className="text-gray-700">
                            Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data, and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.
                        </p>
                        <p className="text-gray-700">
                            Exclusive has more than 1 million products to offer and is growing very fast. It offers a diverse assortment in categories ranging from consumer electronics to fashion and beyond.
                        </p>
                    </div>

                    {/* Right Image Section */}
                    <div className="w-full md:w-[50%] flex justify-center items-center">
                        <img
                            src={sideimage}
                            alt="Ecommerce illustration"
                            className="max-w-full h-auto rounded-xl shadow-lg"
                        />
                    </div>
                </div>

                {/* Stats Section */}
                <div className="w-full max-w-[1100px] mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {details.map((info, index) => (
                        <div key={index} className="border-2 border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 shadow-md bg-white hover:shadow-xl transition duration-300">
                            <img src={info.image} alt="Stat icon" className="w-12 h-12 mb-4" />
                            <div className="text-2xl font-bold text-black">{info.Number}</div>
                            <div className="text-center text-gray-700 mt-1">{info.detail}</div>
                        </div>
                    ))}
                </div>

                {/* Services Section */}
                <div className="w-full max-w-[1100px] mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {other.map((data, index) => (
                        <div key={index} className="flex flex-col items-center text-center border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition duration-300">
                            <img src={data.image} alt={data.title} className="w-14 h-14 mb-4" />
                            <h3 className="font-semibold text-lg text-black">{data.title}</h3>
                            <p className="text-gray-600 mt-2">{data.data}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
