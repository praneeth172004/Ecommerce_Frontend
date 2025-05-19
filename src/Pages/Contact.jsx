import React, { useState } from "react";
import axios from "axios";
import { Loader } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContact = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/user/contact`, form);
      setForm({ name: "", email: "", subject: "", message: "" });
      setShowSuccess(true);
    } catch (err) {
      console.error("Contact form error:", err);
      alert("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center relative">
      <main className="flex flex-col text-white justify-center items-center px-4">
        {/* Breadcrumb */}
        <div className="text-black mt-[100px] w-full max-w-6xl text-[18px]">
          Home / My Account
        </div>

        {/* Contact Section */}
        <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 mt-6">
          {/* Left - Contact Info */}
          <div className="w-full md:w-1/3 bg-white text-black p-6 rounded-lg shadow-md flex flex-col gap-6">
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Call To Us</h2>
              <p>We are available 24/7, 7 days a week.</p>
              <p>Phone: +91 7801099620</p>
            </div>

            <div className="h-[1px] w-full bg-gray-600" />

            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Write To Us</h2>
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Email: customer@buyanything.com</p>
              <p>Email: support@buyanything.com</p>
            </div>
          </div>

          {/* Right - Contact Form or Loader */}
          {loading ? (
            <div className="w-full md:w-2/3 flex justify-center items-center">
              <Loader className="h-10 w-10 text-red-500 animate-spin" />
            </div>
          ) : (
            <form
              onSubmit={handleContact}
              className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md flex flex-col justify-center items-center space-y-5"
            >
              <div className="flex flex-col md:flex-row gap-3 w-full justify-center items-center flex-wrap text-black">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name *"
                  className="placeholder:text-gray-400 w-[300px] bg-gray-300 h-[40px] p-2 rounded-[10px]"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email *"
                  className="placeholder:text-gray-400 w-[300px] bg-gray-300 h-[40px] p-2 rounded-[10px]"
                  required
                />
                <input
                  type="text"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject *"
                  className="placeholder:text-gray-400 w-[300px] bg-gray-300 h-[40px] p-2 rounded-[10px]"
                  required
                />
              </div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full max-w-[700px] h-[200px] bg-gray-300 p-4 placeholder:text-gray-500 rounded-[20px] resize-none text-black"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className={`text-white px-6 py-2 rounded-[10px] transition ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </main>

      {/* ✅ Success Popup Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-sm w-full">
            <h2 className="text-xl font-bold text-green-600 mb-2">Message Sent!</h2>
            <p className="text-gray-700 mb-4">
              Thank you for reaching out. We'll get back to you shortly.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
