import PropTypes from "prop-types";
import styles from "./CityItem.module.css";
import { useNavigate } from "react-router-dom";
export default function CityItem({
  cityName,
  emoji,
  date,
  id,
  position,
  onClick,
  currentId,
}) {
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
      onClick={handleClick}
    >
      <span className={styles.emoji}>{emoji}</span>
      <div className={styles.name}>{cityName}</div>
      <div className={styles.date}>{formatDate(date)}</div>
      <div className={styles.deleteBtn}> &times;</div>
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
