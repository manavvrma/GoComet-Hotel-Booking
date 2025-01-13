import React, { useState } from "react";
import PropTypes from "prop-types";
import "../styles/BookingModel.css";

export default function BookingModal({ hotel, room, onClose }) {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numPersons, setNumPersons] = useState(1);
  const [error, setError] = useState("");

  const handleBook = () => {
    if (!checkInDate || !checkOutDate || numPersons < 1) {
      setError("All fields are required.");
      return;
    }
    setError("");
    // Handle booking logic here
    console.log("Booked:", {
      hotel,
      room,
      checkInDate,
      checkOutDate,
      numPersons,
    });
    onClose();
  };

  return (
    <div className="modalBackdrop">
      <div className="modalContent">
        <h2>
          Book {hotel.name} - {room.name}
        </h2>
        <div className="formGroup">
          <label>Check-in Date</label>
          <input
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label>Check-out Date</label>
          <input
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label>Number of Persons</label>
          <input
            type="number"
            value={numPersons}
            min="1"
            onChange={(e) => setNumPersons(Number(e.target.value))}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button className="bookButton" onClick={handleBook}>
          Book
        </button>
        <button className="closeButton" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

BookingModal.propTypes = {
  hotel: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
