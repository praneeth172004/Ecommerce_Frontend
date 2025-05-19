import React, { useState } from "react";

export default function PaymentOption() {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const validateCardNumber = (number) => {
    return /^\d{16}$/.test(number.replace(/\s+/g, ""));
  };

  const validateExpiry = (expiry) => {
    // Simple MM/YY format check
    return /^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry);
  };

  const validateCVV = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate inputs
    if (!validateCardNumber(paymentData.cardNumber)) {
      setError("Invalid card number. Must be 16 digits.");
      return;
    }
    if (!paymentData.cardName.trim()) {
      setError("Cardholder name is required.");
      return;
    }
    if (!validateExpiry(paymentData.expiry)) {
      setError("Expiry date must be in MM/YY format.");
      return;
    }
    if (!validateCVV(paymentData.cvv)) {
      setError("Invalid CVV.");
      return;
    }

    // Fake processing delay
    setTimeout(() => {
      setSuccess("Payment successful! Thank you for your purchase.");
      setPaymentData({ cardNumber: "", cardName: "", expiry: "", cvv: "" });
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md text-black">
      <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
      {error && <p className="text-red-600 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={paymentData.cardNumber}
            onChange={handleChange}
            maxLength={19}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Cardholder Name</label>
          <input
            type="text"
            name="cardName"
            placeholder="John Doe"
            value={paymentData.cardName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Expiry (MM/YY)</label>
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={paymentData.expiry}
              onChange={handleChange}
              maxLength={5}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-semibold">CVV</label>
            <input
              type="password"
              name="cvv"
              placeholder="123"
              value={paymentData.cvv}
              onChange={handleChange}
              maxLength={4}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-amber-500 text-black py-2 rounded hover:bg-amber-600 font-semibold"
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}
