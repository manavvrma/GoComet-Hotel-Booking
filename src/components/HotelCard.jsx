import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../styles/HotelCard.css";

const defaultImage =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/45ff273a72d53cc3bb861e50cb0df036f0ae53012144356bb75566c79b1bf47e?placeholderIfAbsent=true&apiKey=a8dc494f9c0e460f8f3293610f9c1677";
const ratingStar =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/3a0edd4f4840f66e94fd23ed72b509da98580c5bcf8e564feb4d05c383cf0dbc?placeholderIfAbsent=true&apiKey=a8dc494f9c0e460f8f3293610f9c1677";
const priceIcon =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/23e2cfa82721186ddfbd00b6c2d4d4086b8a5543af529bb93e2526bb1147b36d?placeholderIfAbsent=true&apiKey=a8dc494f9c0e460f8f3293610f9c1677";
const viewIcon =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/5921be4bc17858168043ed16ec50312cdbc77ed1fbb9b9aaa9c34c82e91602e3?placeholderIfAbsent=true&apiKey=a8dc494f9c0e460f8f3293610f9c1677";

export default function HotelCard({ hotel }) {
  const { id, name, city, rating, minPrice = 0, maxPrice = 0, image } = hotel;

  return (
    <div className="hotelCard">
      <img
        src={image || defaultImage}
        alt={`${name} hotel`}
        className="hotelImage"
      />
      <div className="hotelContent">
        <div className="hotelInfo">
          <div className="hotelTitle">{name}</div>
          <div className="hotelLocation">{city}</div>
        </div>
        <div className="hotelRating">
          <img src={ratingStar} alt="Rating star" className="ratingIcon" />
          <div>{rating}</div>
        </div>
      </div>
      <div className="hotelFooter">
        <div className="hotelPrice">
          <img src={priceIcon} alt="Price icon" className="priceIcon" />
          <span>
            {minPrice} - {maxPrice}
          </span>
        </div>
        <Link
          to={`/hotel/${id}`}
          className="viewButton"
          aria-label={`View details for ${name}`}
        >
          <div>View</div>
          <img src={viewIcon} alt="" className="viewIcon" />
        </Link>
      </div>
    </div>
  );
}

HotelCard.propTypes = {
  hotel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    minPrice: PropTypes.number.isRequired,
    maxPrice: PropTypes.number.isRequired,
    image: PropTypes.string,
  }).isRequired,
};
