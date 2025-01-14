import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { IoMdPeople } from "react-icons/io";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa"; // Importing the icons
import "../styles/HotelSearch.css";

export default function HotelSearch({ onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [dates, setDates] = useState({ checkIn: null, checkOut: null });
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHotels = async () => {
      if (searchTerm.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          "https://www.gocomet.com/api/assignment/hotels-name"
        );
        const data = await response.json();
        const filtered = data.filter(
          (hotel) =>
            hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setResults(filtered);
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchHotels, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const handleSelect = (hotel) => {
    setSelected(hotel);
    setSearchTerm(hotel.name);
    setResults([]);
    onSelect(hotel);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selected || !dates.checkIn || !dates.checkOut || guests < 1) {
      alert("Please fill in all required fields.");
      return;
    }

    navigate(`/hotel/${selected.id}`, {
      state: { checkIn: dates.checkIn, checkOut: dates.checkOut, guests },
    });
  };

  return (
    <form
      className="searchForm"
      onSubmit={handleSubmit}
      role="search"
      aria-label="Hotel search form"
    >
      <div className="searchInputContainer">
        <FaSearch className="searchIcon" aria-hidden="true" />
        <input
          type="text"
          className="searchInput"
          placeholder="Type city, place, or hotel name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search hotels"
        />
        <FaMapMarkerAlt className="endIcon" aria-hidden="true" />
        {results.length > 0 && (
          <div className="searchResults">
            <div className="resultsList">
              {results.map((hotel) => (
                <div
                  key={hotel.id}
                  className={`resultItem ${
                    selected?.id === hotel.id ? "selectedResult" : ""
                  }`}
                  onClick={() => handleSelect(hotel)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleSelect(hotel);
                    }
                  }}
                >
                  {hotel.name}
                  <div>{hotel.city}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        className="dateRangePickerContainer"
        role="group"
        aria-label="Date range selection"
      >
        <FaCalendarAlt className="calendarIcon" aria-hidden="true" />
        <div
          tabIndex="0"
          role="button"
          onClick={() => document.getElementById("checkInDate").showPicker()}
        >
          Check-in
        </div>
        <div className="dateDivider" aria-hidden="true" />
        <div
          tabIndex="0"
          role="button"
          onClick={() => document.getElementById("checkOutDate").showPicker()}
        >
          Check-out
        </div>
      </div>

      <input
        type="date"
        id="checkInDate"
        className="hiddenDateInput"
        value={dates.checkIn || ""}
        onChange={(e) => setDates({ ...dates, checkIn: e.target.value })}
        required
      />
      <input
        type="date"
        id="checkOutDate"
        className="hiddenDateInput"
        value={dates.checkOut || ""}
        onChange={(e) => setDates({ ...dates, checkOut: e.target.value })}
        required
      />

      <div className="guestsInputContainer">
        <IoMdPeople className="peopleIcon" />
        <input
          type="number"
          className="guestsInput"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          min="1"
          aria-label={`Select number of guests: ${guests} guest${
            guests !== 1 ? "s" : ""
          } selected`}
          required
        />
      </div>

      <button type="submit" className="searchButton" aria-label="Search hotels">
        Search
      </button>

      {loading && <div className="loading">Loading...</div>}
    </form>
  );
}

HotelSearch.propTypes = {
  onSelect: PropTypes.func.isRequired,
};
