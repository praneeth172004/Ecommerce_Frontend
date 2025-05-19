import React, { useState } from "react";

export default function AddressBook() {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
    {
      id: 2,
      name: "Jane Smith",
      street: "456 Oak Ave",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  // Add new address to list
  const handleAddAddress = (e) => {
    e.preventDefault();

    // Simple validation: check required fields
    if (
      !newAddress.name ||
      !newAddress.street ||
      !newAddress.city ||
      !newAddress.state ||
      !newAddress.zip
    ) {
      alert("Please fill all fields");
      return;
    }

    setAddresses((prev) => [
      ...prev,
      { id: Date.now(), ...newAddress },
    ]);

    // Reset form
    setNewAddress({
      name: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    });
  };

  // Delete address by id
  const handleDelete = (id) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id));
  };

  return (
    <div className="text-black w-full">
      <h2 className="text-2xl font-semibold mb-4">Address Book</h2>

      {/* List of addresses */}
      <div className="mb-6 space-y-4 max-h-64 overflow-y-auto border p-4 rounded shadow-sm">
        {addresses.length === 0 && <p>No addresses added yet.</p>}

        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="border-b pb-2 last:border-none flex justify-between items-start"
          >
            <div>
              <p className="font-semibold">{addr.name}</p>
              <p>
                {addr.street}, {addr.city}, {addr.state} - {addr.zip}
              </p>
            </div>
            <button
              onClick={() => handleDelete(addr.id)}
              className="text-red-600 hover:text-red-800 font-semibold"
              title="Delete Address"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Add new address form */}
      <form onSubmit={handleAddAddress} className="space-y-3 max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={newAddress.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="street"
          placeholder="Street Address"
          value={newAddress.street}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={newAddress.city}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={newAddress.state}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={newAddress.zip}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-amber-500 text-black py-2 px-4 rounded hover:bg-amber-600 font-semibold"
        >
          Add Address
        </button>
      </form>
    </div>
  );
}
