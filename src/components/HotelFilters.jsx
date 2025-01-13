// import PropTypes from "prop-types";
// import "../styles/HotelFilters.css";

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
//     { id: "city1", label: "Delhi" },
//     { id: "city2", label: "Bengaluru" },
//     { id: "city3", label: "Mumbai" },
//     { id: "city4", label: "Pune" },
//     { id: "city5", label: "Hyderabad" },
//   ];

//   const handleChange = (type, value) => {
//     const isSelected = JSON.stringify(filters[type]) === JSON.stringify(value);
//     onChange(type, isSelected ? null : value);
//   };

//   return (
//     <div className="filters">
//       <h2 className="filterHeading">Filters</h2>
//       <div className="divider" />
//       <div className="section">
//         <h3 className="title">PRICE RANGE</h3>
//         <div className="filterGroup">
//           {priceRanges.map((range) => (
//             <label key={range.id} className="filterItem">
//               <div
//                 className={`checkbox ${
//                   JSON.stringify(filters.price) === JSON.stringify(range.value)
//                     ? "checked"
//                     : ""
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   checked={
//                     JSON.stringify(filters.price) ===
//                     JSON.stringify(range.value)
//                   }
//                   onChange={() => handleChange("price", range.value)}
//                   className="visually-hidden"
//                 />
//               </div>
//               {range.label}
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className="divider" />
//       <div className="section">
//         <h3 className="title">RATING</h3>
//         <div className="filterGroup">
//           {ratings.map((rating) => (
//             <label key={rating.id} className="filterItem">
//               <div
//                 className={`checkbox ${
//                   JSON.stringify(filters.rating) ===
//                   JSON.stringify(rating.value)
//                     ? "checked"
//                     : ""
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   checked={
//                     JSON.stringify(filters.rating) ===
//                     JSON.stringify(rating.value)
//                   }
//                   onChange={() => handleChange("rating", rating.value)}
//                   className="visually-hidden"
//                 />
//               </div>
//               {rating.label}
//             </label>
//           ))}
//         </div>
//       </div>

//       <div className="divider" />
//       <div className="section">
//         <h3 className="title">CITY</h3>
//         <div className="filterGroup">
//           {cities.map((city) => (
//             <label key={city.id} className="filterItem">
//               <div
//                 className={`checkbox ${
//                   filters.city === city.label ? "checked" : ""
//                 }`}
//               >
//                 <input
//                   type="checkbox"
//                   checked={filters.city === city.label}
//                   onChange={() => handleChange("city", city.label)}
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

// HotelFilters.propTypes = {
//   filters: PropTypes.shape({
//     price: PropTypes.arrayOf(PropTypes.number),
//     rating: PropTypes.arrayOf(PropTypes.number),
//     city: PropTypes.string,
//   }).isRequired,
//   onChange: PropTypes.func.isRequired,
// };

import PropTypes from "prop-types";
import "../styles/HotelFilters.css";

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
    { id: "city1", label: "Delhi" },
    { id: "city2", label: "Bengaluru" },
    { id: "city3", label: "Mumbai" },
    { id: "city4", label: "Pune" },
    { id: "city5", label: "Hyderabad" },
  ];

  const handleChange = (type, value) => {
    const isSelected = JSON.stringify(filters[type]) === JSON.stringify(value);
    onChange(type, isSelected ? null : value);
  };

  const handleClearAll = () => {
    onChange("price", null);
    onChange("rating", null);
    onChange("city", null);
  };

  const getCheckedItems = () => {
    let checkedItems = [];

    if (filters.price) {
      priceRanges.forEach((range) => {
        if (JSON.stringify(filters.price) === JSON.stringify(range.value)) {
          checkedItems.push(range.label);
        }
      });
    }

    if (filters.rating) {
      ratings.forEach((rating) => {
        if (JSON.stringify(filters.rating) === JSON.stringify(rating.value)) {
          checkedItems.push(rating.label);
        }
      });
    }

    if (filters.city) {
      cities.forEach((city) => {
        if (filters.city === city.label) {
          checkedItems.push(city.label);
        }
      });
    }

    return checkedItems;
  };

  return (
    <div className="filters">
      <div className="filtersHeader">
        <h2 className="filterHeading">Filters</h2>
        <button className="clearButton" onClick={handleClearAll}>
          Clear All
        </button>
      </div>

      <div className="checkedItems">
        {getCheckedItems().map((item, index) => (
          <div key={index} className="checkedItem">
            {item}
          </div>
        ))}
      </div>

      <div className="divider" />
      <div className="section">
        <h3 className="title">PRICE RANGE</h3>
        <div className="filterGroup">
          {priceRanges.map((range) => (
            <label key={range.id} className="filterItem">
              <div
                className={`checkbox ${
                  JSON.stringify(filters.price) === JSON.stringify(range.value)
                    ? "checked"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={
                    JSON.stringify(filters.price) ===
                    JSON.stringify(range.value)
                  }
                  onChange={() => handleChange("price", range.value)}
                  className="visually-hidden"
                />
              </div>
              {range.label}
            </label>
          ))}
        </div>
      </div>

      <div className="divider" />
      <div className="section">
        <h3 className="title">RATING</h3>
        <div className="filterGroup">
          {ratings.map((rating) => (
            <label key={rating.id} className="filterItem">
              <div
                className={`checkbox ${
                  JSON.stringify(filters.rating) ===
                  JSON.stringify(rating.value)
                    ? "checked"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={
                    JSON.stringify(filters.rating) ===
                    JSON.stringify(rating.value)
                  }
                  onChange={() => handleChange("rating", rating.value)}
                  className="visually-hidden"
                />
              </div>
              {rating.label}
            </label>
          ))}
        </div>
      </div>

      <div className="divider" />
      <div className="section">
        <h3 className="title">CITY</h3>
        <div className="filterGroup">
          {cities.map((city) => (
            <label key={city.id} className="filterItem">
              <div
                className={`checkbox ${
                  filters.city === city.label ? "checked" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={filters.city === city.label}
                  onChange={() => handleChange("city", city.label)}
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
