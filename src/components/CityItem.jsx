import PropTypes from "prop-types";
import styles from "./CityItem.module.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CitiesContext } from "../context/CitiesContext";
export function emojiToCountryCode(emoji) {
  if (typeof emoji !== "string" || emoji.length < 2) {
    console.error("Invalid emoji input:", emoji);
    return "";
  }

  const codePoints = [...emoji].map((char) => char.codePointAt(0));
  return codePoints.map((cp) => String.fromCharCode(cp - 127397)).join("");
}

export default function CityItem({
  cityName,
  emoji,
  date,
  id,
  position,
  onClick,
  currentId,
}) {
  const { deleteCity } = useContext(CitiesContext);
  const navigate = useNavigate();
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  const handleClick = () => {
    onClick();
    navigate(`${id}?lat=${position.lat}&lng=${position.lng}`);
  };
  return (
    <li
      className={`${styles.cityItem} ${
        id === currentId && styles.cityItemActive
      } `}
      key={id}
    >
      <span className={styles.emoji} onClick={handleClick}>
        <img
          src={`https://flagcdn.com/${emojiToCountryCode(
            emoji
          ).toLowerCase()}.svg`}
          width={32}
          alt={emojiToCountryCode(emoji).toLowerCase()}
        />
      </span>
      <div className={styles.name} onClick={handleClick}>
        {cityName}
      </div>
      <div className={styles.date}>{formatDate(date)}</div>
      <div className={styles.deleteBtn} onClick={() => deleteCity(id)}>
        {" "}
        &times;
      </div>
    </li>
  );
}

CityItem.propTypes = {
  id: PropTypes.id,
  cityName: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  currentId: PropTypes.id,
  position: PropTypes.array,
};
