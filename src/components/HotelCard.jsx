import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { FaRupeeSign, FaMapMarkerAlt } from "react-icons/fa";
import "../styles/HotelCard.css";
import defaultImage from "../assets/images/hotel_background.jpg";

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
          <div className="hotelLocation">
            <FaMapMarkerAlt /> {city}
          </div>
        </div>
        <div className="hotelRating">
          <AiFillStar />
          <div>{rating}</div>
        </div>
      </div>
      <div className="hotelFooter">
        <div className="hotelPrice">
          <FaRupeeSign />
          <span>
            {minPrice} - {maxPrice}
          </span>
        </div>
        <Link
          to={`/hotel/${id}`}
          className="viewButton"
          aria-label={`View details for ${name}`}
        >
          <div>View →</div>
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
