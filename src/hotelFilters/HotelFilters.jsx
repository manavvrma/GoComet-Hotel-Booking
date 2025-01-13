// import styles from "./HotelFilters.module.css";

// export default function HotelFilters({ filters, onChange }) {
//   const priceRanges = [
//     { id: "price1", label: "Up to Rs. 1000", value: [0, 1000] },
//     { id: "price2", label: "Rs. 1001 to Rs. 2000", value: [1001, 2000] },
//     { id: "price3", label: "Rs. 2001 to Rs. 5000", value: [2001, 5000] },
//     { id: "price4", label: "Above Rs. 5000", value: [5001, Infinity] },
//   ];

//   const ratings = [
//     { id: "rating1", label: "0 - 1 Star", value: [0, 1] },
//     { id: "rating2", label: "1 - 2 Star", value: [1, 2] },
//     { id: "rating3", label: "2 - 3 Star", value: [2, 3] },
//     { id: "rating4", label: "3 - 4 Star", value: [3, 4] },
//     { id: "rating5", label: "4 - 5 Star", value: [4, 5] },
//   ];

//   const cities = [
//     { id: "city1", label: "Mumbai" },
//     { id: "city2", label: "Kolkata" },
//     { id: "city3", label: "Bangalore" },
//     { id: "city4", label: "Jaipur" },
//   ];

//   return (
//     <div className={styles.filters}>
//       <div className={styles.divider} />
//       <div className={styles.section}>
//         <h3 className={styles.title}>PRICE RANGE</h3>
//         <div className={styles.filterGroup}>
//           {priceRanges.map((range) => (
//             <label key={range.id} className={styles.filterItem}>
//               <div
//                 className={`${styles.checkbox} ${
//                   filters.price === range.value ? styles.checked : ""
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   checked={filters.price === range.value}
//                   onChange={() => onChange("price", range.value)}
//                   className="visually-hidden"
//                 />
//               </div>
//               {range.label}
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className={styles.divider} />
//       <div className={styles.section}>
//         <h3 className={styles.title}>RATING</h3>
//         <div className={styles.filterGroup}>
//           {ratings.map((rating) => (
//             <label key={rating.id} className={styles.filterItem}>
//               <div
//                 className={`${styles.checkbox} ${
//                   filters.rating === rating.value ? styles.checked : ""
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   checked={filters.rating === rating.value}
//                   onChange={() => onChange("rating", rating.value)}
//                   className="visually-hidden"
//                 />
//               </div>
//               {rating.label}
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className={styles.divider} />
//       <div className={styles.section}>
//         <h3 className={styles.title}>CITY</h3>
//         <div className={styles.filterGroup}>
//           {cities.map((city) => (
//             <label key={city.id} className={styles.filterItem}>
//               <div
//                 className={`${styles.checkbox} ${
//                   filters.city === city.label ? styles.checked : ""
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   checked={filters.city === city.label}
//                   onChange={() => onChange("city", city.label)}
//                   className="visually-hidden"
//                 />
//               </div>
//               {city.label}
//             </label>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import PropTypes from "prop-types";
import styles from "./HotelFilters.module.css";

export default function HotelFilters({ filters, onChange }) {
  const priceRanges = [
    { id: "price1", label: "Up to Rs. 1000", value: [0, 1000] },
    { id: "price2", label: "Rs. 1001 to Rs. 2000", value: [1001, 2000] },
    { id: "price3", label: "Rs. 2001 to Rs. 5000", value: [2001, 5000] },
    { id: "price4", label: "Above Rs. 5000", value: [5001, Infinity] },
  ];

  const ratings = [
    { id: "rating1", label: "0 - 1 Star", value: [0, 1] },
    { id: "rating2", label: "1 - 2 Star", value: [1, 2] },
    { id: "rating3", label: "2 - 3 Star", value: [2, 3] },
    { id: "rating4", label: "3 - 4 Star", value: [3, 4] },
    { id: "rating5", label: "4 - 5 Star", value: [4, 5] },
  ];

  const cities = [
    { id: "city1", label: "Mumbai" },
    { id: "city2", label: "Kolkata" },
    { id: "city3", label: "Bangalore" },
    { id: "city4", label: "Jaipur" },
  ];

  return (
    <div className={styles.filters}>
      <div className={styles.divider} />
      <div className={styles.section}>
        <h3 className={styles.title}>PRICE RANGE</h3>
        <div className={styles.filterGroup}>
          {priceRanges.map((range) => (
            <label key={range.id} className={styles.filterItem}>
              <div
                className={`${styles.checkbox} ${
                  filters.price === range.value ? styles.checked : ""
                }`}
              >
                <input
                  type="radio"
                  checked={filters.price === range.value}
                  onChange={() => onChange("price", range.value)}
                  className="visually-hidden"
                />
              </div>
              {range.label}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.divider} />
      <div className={styles.section}>
        <h3 className={styles.title}>RATING</h3>
        <div className={styles.filterGroup}>
          {ratings.map((rating) => (
            <label key={rating.id} className={styles.filterItem}>
              <div
                className={`${styles.checkbox} ${
                  filters.rating === rating.value ? styles.checked : ""
                }`}
              >
                <input
                  type="radio"
                  checked={filters.rating === rating.value}
                  onChange={() => onChange("rating", rating.value)}
                  className="visually-hidden"
                />
              </div>
              {rating.label}
            </label>
          ))}
        </div>
      </div>

      <div className={styles.divider} />
      <div className={styles.section}>
        <h3 className={styles.title}>CITY</h3>
        <div className={styles.filterGroup}>
          {cities.map((city) => (
            <label key={city.id} className={styles.filterItem}>
              <div
                className={`${styles.checkbox} ${
                  filters.city === city.label ? styles.checked : ""
                }`}
              >
                <input
                  type="radio"
                  checked={filters.city === city.label}
                  onChange={() => onChange("city", city.label)}
                  className="visually-hidden"
                />
              </div>
              {city.label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

HotelFilters.propTypes = {
  filters: PropTypes.shape({
    price: PropTypes.arrayOf(PropTypes.number),
    rating: PropTypes.arrayOf(PropTypes.number),
    city: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};
