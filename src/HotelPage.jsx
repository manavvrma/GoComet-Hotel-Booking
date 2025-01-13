import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./HotelPage.module.css";

export default function HotelPage() {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.gocomet.com/api/assignment/hotels/${hotelId}`
        );
        const data = await response.json();
        setHotel(data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!hotel) {
    return (
      <div className={styles.error}>Hotel details could not be fetched.</div>
    );
  }

  return (
    <div className={styles.hotelPage}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <span className={styles.logoHighlight}>Book</span>My
            <span className={styles.logoHighlight}>Hotel</span>
          </div>
          <div>Home</div>
          <div>Hotels</div>
          <div>Places</div>
        </nav>
        <div>Sign in</div>
      </header>

      <main className={styles.mainContent}>
        <h1 className={styles.hotelName}>{hotel.name}</h1>
        <div className={styles.hotelLocation}>
          {hotel.city}, {hotel.country}
        </div>
        <div className={styles.hotelRating}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3a0edd4f4840f66e94fd23ed72b509da98580c5bcf8e564feb4d05c383cf0dbc?placeholderIfAbsent=true&apiKey=a8dc494f9c0e460f8f3293610f9c1677"
            alt="Rating star"
            className={styles.ratingIcon}
          />
          <span>{hotel.rating}</span>
        </div>

        {hotel.rooms ? (
          <div className={styles.roomList}>
            {hotel.rooms.map((room) => (
              <div key={room.id} className={styles.room}>
                <img
                  src={
                    room.image ||
                    "https://cdn.builder.io/api/v1/image/assets/TEMP/45ff273a72d53cc3bb861e50cb0df036f0ae53012144356bb75566c79b1bf47e?placeholderIfAbsent=true&apiKey=a8dc494f9c0e460f8f3293610f9c1677"
                  }
                  alt={room.name}
                  className={styles.roomImage}
                />
                <div className={styles.roomDetails}>
                  <div className={styles.roomName}>{room.name}</div>
                  <div className={styles.roomPrice}>₹{room.price} / night</div>
                  <button
                    className={styles.viewFacilitiesButton}
                    onClick={() =>
                      console.log("View facilities for room:", room)
                    }
                  >
                    View facilities
                  </button>
                  <button
                    className={styles.bookNowButton}
                    onClick={() => console.log("Book room:", room)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.error}>No rooms available.</div>
        )}

        <div className={styles.hotelDescription}>
          <h2>About {hotel.name}</h2>
          <p>{hotel.description}</p>
        </div>
      </main>
    </div>
  );
}
