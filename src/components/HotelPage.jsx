import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/HotelPage.css";
import Header from "./Header";
import Footer from "./Footer";
import BookingModal from "./BookingModal";

const placeholderImage =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/45ff273a72d53cc3bb861e50cb0df036f0ae53012144356bb75566c79b1bf47e?placeholderIfAbsent=true&apiKey=a8dc494f9c0e460f8f3293610f9c1677";

export default function HotelPage() {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.gocomet.com/api/assignment/hotels/${hotelId}`
        );
        const data = await response.json();
        console.log("Fetched data: ", data);
        setHotel(data.hotel);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  const handleBookNow = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!hotel) {
    return <div className="error">Hotel details could not be fetched.</div>;
  }

  return (
    <div className="hotelPage">
      <Header />
      <main className="mainContent1">
        <div className="hotelBackground">
          <h1 className="hotelName1">{hotel.name}</h1>
          <div className="hotelLocation1">
            {hotel.city} {hotel.country}
          </div>
          <div className="hotelRating1">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a0edd4f4840f66e94fd23ed72b509da98580c5bcf8e564feb4d05c383cf0dbc?placeholderIfAbsent=true&apiKey=a8dc494f9c0e460f8f3293610f9c1677"
              alt="Rating star"
              className="ratingIcon1"
            />
            <span>{hotel.rating}</span>
          </div>
          <img
            src={placeholderImage}
            alt={`${hotel.name} hotel`}
            className="hotelBackgroundImage"
          />
        </div>
        {hotel.rooms && hotel.rooms.length > 0 ? (
          <div className="roomList">
            {hotel.rooms.map((room) => (
              <div key={room.id} className="room">
                <img
                  src={
                    room.image_urls && room.image_urls.length > 0
                      ? room.image_urls[0]
                      : placeholderImage
                  }
                  alt={room.name}
                  className="roomImage"
                />
                <div className="roomDetails">
                  <div className="roomName">{room.name}</div>
                  <div className="roomPrice">
                    ₹{room.price} / <span className="light">night</span>
                  </div>

                  <div className="buttonGroup">
                    <button
                      className="viewFacilitiesButton"
                      onClick={() =>
                        console.log("View facilities for room:", room)
                      }
                    >
                      View facilities
                    </button>
                    <button
                      className="bookNowButton"
                      onClick={() => handleBookNow(room)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="error">No rooms available.</div>
        )}

        <div className="hotelDescription">
          <h2>About {hotel.name}</h2>
          <p>{hotel.description}</p>
        </div>
      </main>
      <Footer />

      {showModal && (
        <BookingModal
          hotel={hotel}
          room={selectedRoom}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
