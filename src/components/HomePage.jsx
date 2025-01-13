import { useState, useEffect } from "react";
import "../styles/HomePage.css";
import HotelSearch from "./HotelSearch";
import HotelCard from "./HotelCard";
import HotelFilters from "./HotelFilters";
import Header from "./Header";
import Footer from "./Footer";

const HOTELS_PER_PAGE = 6;

export default function HomePage() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    price: null,
    rating: null,
    city: null,
  });

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.gocomet.com/api/assignment/hotels?page=1&size=100`
        );
        const data = await response.json();
        if (Array.isArray(data.hotels)) {
          const convertedHotels = data.hotels.map((hotel) => ({
            ...hotel,
            rating: Number(hotel.rating),
            minPrice: Math.min(...hotel.rooms.map((room) => room.price)),
            maxPrice: Math.max(...hotel.rooms.map((room) => room.price)),
          }));
          setHotels(convertedHotels);
        } else {
          console.error("Data received is not an array", data);
          setHotels([]);
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? null : value,
    }));
  };

  const filteredHotels = Array.isArray(hotels)
    ? hotels.filter((hotel) => {
        if (
          filters.price &&
          (hotel.minPrice > filters.price[1] ||
            hotel.maxPrice < filters.price[0])
        ) {
          return false;
        }

        if (
          filters.rating &&
          (hotel.rating < filters.rating[0] || hotel.rating > filters.rating[1])
        ) {
          return false;
        }

        if (filters.city && hotel.city !== filters.city) {
          return false;
        }

        return true;
      })
    : [];

  const totalPages = Math.ceil(filteredHotels.length / HOTELS_PER_PAGE);
  const displayedHotels = filteredHotels.slice(
    (page - 1) * HOTELS_PER_PAGE,
    page * HOTELS_PER_PAGE
  );

  return (
    <div className="homePage">
      <Header />
      <div className="heroSection">
        <img
          src="https://raw.githubusercontent.com/gocomet-india/frontend-hotel-assignment/main/hero-bg.jpg"
          alt="Hotel background"
          className="heroBackground"
        />
        <div className="heroOverlay"></div>
        <div className="heroGradient"></div>
        <div className="heroContent">
          <h1 className="heroTitle">Find the Perfect deal, always.</h1>
          <p className="heroText">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique
            officia non corrupti pariatur aspernatur sint modi commodi cum
            possimus blanditiis facilis beatae repellendus, autem voluptates
            ratione delectus architecto quae dolore.
          </p>
        </div>
        <div className="searchSection">
          <HotelSearch
            onSelect={(hotel) => console.log("Selected hotel:", hotel)}
          />
        </div>
      </div>
      <h2 className="hotelHeading">Explore Hotels</h2>
      <main className="mainContent">
        <aside className="filtersColumn">
          <HotelFilters filters={filters} onChange={handleFilterChange} />
        </aside>

        <section className="hotelsColumn">
          <div className="hotelGrid">
            {displayedHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onView={(hotel) => console.log("View hotel:", hotel)}
              />
            ))}
          </div>

          <div className="pagination">
            <button
              className={`pageButton ${page === 1 ? "pageButtonDisabled" : ""}`}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`pageButton ${page === p ? "pageButtonActive" : ""}`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className={`pageButton ${
                page === totalPages ? "pageButtonDisabled" : ""
              }`}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
