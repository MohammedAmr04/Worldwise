import PropTypes from "prop-types";
import styles from "./Button.module.css";

export default function Button({ onClick = () => {}, type, children }) {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};
