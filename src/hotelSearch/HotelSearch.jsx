// import { useState, useEffect } from "react";
// import styles from "./HotelSearch.module.css";

// export default function HotelSearch({ onSelect }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selected, setSelected] = useState(null);

//   useEffect(() => {
//     const fetchHotels = async () => {
//       if (searchTerm.length < 2) {
//         setResults([]);
//         return;
//       }

//       setLoading(true);
//       try {
//         const response = await fetch(
//           "https://www.gocomet.com/api/assignment/hotels-name"
//         );
//         const data = await response.json();
//         const filtered = data.filter(
//           (hotel) =>
//             hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             hotel.city.toLowerCase().includes(searchTerm.toLowerCase())
//         );
//         setResults(filtered);
//       } catch (error) {
//         console.error("Error fetching hotels:", error);
//         setResults([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const debounce = setTimeout(fetchHotels, 300);
//     return () => clearTimeout(debounce);
//   }, [searchTerm]);

//   const handleSelect = (hotel) => {
//     setSelected(hotel);
//     setSearchTerm(hotel.name);
//     setResults([]);
//     onSelect(hotel);
//   };

//   return (
//     <div>
//       <div className={styles.searchContainer}>
//         <img
//           src="https://cdn.builder.io/api/v1/image/assets/TEMP/65f9e3e1a91fbd0ee3d13250d2625379a6f4fe61810271a48a1269ff31df2bbe?placeholderIfAbsent=true&apiKey=a8dc494f9c0e460f8f3293610f9c1677"
//           alt="Search icon"
//           className={styles.searchIcon}
//         />
//         <input
//           type="text"
//           className={styles.searchInput}
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           placeholder="Type city, place, or hotel name"
//           aria-label="Search hotels"
//         />
//       </div>

//       {results.length > 0 && (
//         <div className={styles.searchResults}>
//           <div className={styles.resultsList}>
//             {results.map((hotel) => (
//               <div
//                 key={hotel.id}
//                 className={`${styles.resultItem} ${
//                   selected?.id === hotel.id ? styles.selectedResult : ""
//                 }`}
//                 onClick={() => handleSelect(hotel)}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter" || e.key === " ") {
//                     handleSelect(hotel);
//                   }
//                 }}
//               >
//                 {hotel.name}
//                 <div>{hotel.city}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./HotelSearch.module.css";

export default function HotelSearch({ onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

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

  return (
    <div>
      <div className={styles.searchContainer}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/65f9e3e1a91fbd0ee3d13250d2625379a6f4fe61810271a48a1269ff31df2bbe?placeholderIfAbsent=true&apiKey=a8dc494f9c0e460f8f3293610f9c1677"
          alt="Search icon"
          className={styles.searchIcon}
        />
        <input
          type="text"
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type city, place, or hotel name"
          aria-label="Search hotels"
        />
      </div>

      {loading && <div className={styles.loading}>Loading...</div>}

      {results.length > 0 && (
        <div className={styles.searchResults}>
          <div className={styles.resultsList}>
            {results.map((hotel) => (
              <div
                key={hotel.id}
                className={`${styles.resultItem} ${
                  selected?.id === hotel.id ? styles.selectedResult : ""
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
  );
}

HotelSearch.propTypes = {
  onSelect: PropTypes.func.isRequired,
};
