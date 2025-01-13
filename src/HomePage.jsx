// import { useState, useEffect } from "react";
// import styles from "./HomePage.module.css";
// import HotelSearch from "./hotelSearch/HotelSearch";
// import HotelCard from "./hotelCard/HotelCard";
// import HotelFilters from "./hotelFilters/HotelFilters";

// export default function HomePage() {
//   const [hotels, setHotels] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const [filters, setFilters] = useState({
//     price: null,
//     rating: null,
//     city: null,
//   });

//   useEffect(() => {
//     const fetchHotels = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           `https://www.gocomet.com/api/assignment/hotels?page=${page}&size=30`
//         );
//         const data = await response.json();
//         // Assuming the API returns an object with a "hotels" key
//         if (Array.isArray(data.hotels)) {
//           setHotels(data.hotels); // If it's an array, set it
//         } else {
//           console.error("Data received is not an array", data);
//           setHotels([]); // Default to an empty array in case of an error
//         }
//       } catch (error) {
//         console.error("Error fetching hotels:", error);
//         setHotels([]); // Ensure an empty array is set if there's an error
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHotels();
//   }, [page]);

//   const handleFilterChange = (type, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [type]: prev[type] === value ? null : value,
//     }));
//   };

//   const filteredHotels = Array.isArray(hotels)
//     ? hotels.filter((hotel) => {
//         if (
//           filters.price &&
//           (hotel.price < filters.price[0] || hotel.price > filters.price[1])
//         )
//           return false;
//         if (
//           filters.rating &&
//           (hotel.rating < filters.rating[0] || hotel.rating > filters.rating[1])
//         )
//           return false;
//         if (filters.city && hotel.city !== filters.city) return false;
//         return true;
//       })
//     : [];

//   return (
//     <div className={styles.homePage}>
//       <div className={styles.heroSection}>
//         <img
//           src="ttps://raw.githubusercontent.com/gocomet-india/frontend-hotel-assignment/main/hero-bg.jpg"
//           alt="Hotel background"
//           className={styles.heroBackground}
//         />
//         <header className={styles.header}>
//           <nav className={styles.nav}>
//             <div className={styles.logo}>
//               <span className={styles.logoHighlight}>Book</span>My
//               <span className={styles.logoHighlight}>Hotel</span>
//             </div>
//             <div>Home</div>
//             <div>Hotels</div>
//             <div>Places</div>
//           </nav>
//           <div>Sign in</div>
//         </header>

//         <div className={styles.heroContent}>
//           <h1 className={styles.heroTitle}>Find the Perfect deal, always.</h1>
//           <p className={styles.heroText}>
//             Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique
//             officia non corrupti pariatur aspernatur sint modi commodi cum
//             possimus blanditiis facilis beatae repellendus, autem voluptates
//             ratione delectus architecto quae dolore.
//           </p>
//         </div>

//         <div className={styles.searchSection}>
//           <HotelSearch
//             onSelect={(hotel) => console.log("Selected hotel:", hotel)}
//           />
//         </div>
//       </div>

//       <main className={styles.mainContent}>
//         <aside className={styles.filtersColumn}>
//           <HotelFilters filters={filters} onChange={handleFilterChange} />
//         </aside>

//         <section className={styles.hotelsColumn}>
//           <div className={styles.hotelGrid}>
//             {filteredHotels.map((hotel) => (
//               <HotelCard
//                 key={hotel.id}
//                 hotel={hotel}
//                 onView={(hotel) => console.log("View hotel:", hotel)}
//               />
//             ))}
//           </div>

//           <div className={styles.pagination}>
//             <button
//               className={`${styles.pageButton} ${
//                 page === 1 ? styles.pageButtonDisabled : ""
//               }`}
//               onClick={() => setPage((p) => Math.max(1, p - 1))}
//               disabled={page === 1}
//             >
//               Prev
//             </button>
//             {[1, 2, 3].map((p) => (
//               <button
//                 key={p}
//                 className={`${styles.pageButton} ${
//                   page === p ? styles.pageButtonActive : ""
//                 }`}
//                 onClick={() => setPage(p)}
//               >
//                 {p}
//               </button>
//             ))}
//             <button
//               className={`${styles.pageButton} ${
//                 page === 3 ? styles.pageButtonDisabled : ""
//               }`}
//               onClick={() => setPage((p) => Math.min(3, p + 1))}
//               disabled={page === 3}
//             >
//               Next
//             </button>
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import styles from "./HomePage.module.css";
import HotelSearch from "./hotelSearch/HotelSearch";
import HotelCard from "./hotelCard/HotelCard";
import HotelFilters from "./hotelFilters/HotelFilters";

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
          `https://www.gocomet.com/api/assignment/hotels?page=${page}&size=30`
        );
        const data = await response.json();
        if (Array.isArray(data.hotels)) {
          // Ensure rating is converted to a number
          const convertedHotels = data.hotels.map((hotel) => ({
            ...hotel,
            rating: Number(hotel.rating),
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
  }, [page]);

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
          (hotel.price < filters.price[0] || hotel.price > filters.price[1])
        )
          return false;
        if (
          filters.rating &&
          (hotel.rating < filters.rating[0] || hotel.rating > filters.rating[1])
        )
          return false;
        if (filters.city && hotel.city !== filters.city) return false;
        return true;
      })
    : [];

  return (
    <div className={styles.homePage}>
      <div className={styles.heroSection}>
        <img
          src="https://raw.githubusercontent.com/gocomet-india/frontend-hotel-assignment/main/hero-bg.jpg"
          alt="Hotel background"
          className={styles.heroBackground}
        />
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

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Find the Perfect deal, always.</h1>
          <p className={styles.heroText}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique
            officia non corrupti pariatur aspernatur sint modi commodi cum
            possimus blanditiis facilis beatae repellendus, autem voluptates
            ratione delectus architecto quae dolore.
          </p>
        </div>

        <div className={styles.searchSection}>
          <HotelSearch
            onSelect={(hotel) => console.log("Selected hotel:", hotel)}
          />
        </div>
      </div>

      <main className={styles.mainContent}>
        <aside className={styles.filtersColumn}>
          <HotelFilters filters={filters} onChange={handleFilterChange} />
        </aside>

        <section className={styles.hotelsColumn}>
          <div className={styles.hotelGrid}>
            {filteredHotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onView={(hotel) => console.log("View hotel:", hotel)}
              />
            ))}
          </div>

          <div className={styles.pagination}>
            <button
              className={`${styles.pageButton} ${
                page === 1 ? styles.pageButtonDisabled : ""
              }`}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`${styles.pageButton} ${
                  page === p ? styles.pageButtonActive : ""
                }`}
                onClick={() => setPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className={`${styles.pageButton} ${
                page === 3 ? styles.pageButtonDisabled : ""
              }`}
              onClick={() => setPage((p) => Math.min(3, p + 1))}
              disabled={page === 3}
            >
              Next
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
