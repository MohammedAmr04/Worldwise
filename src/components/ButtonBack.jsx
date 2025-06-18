import styles from "./Button.module.css";
import { useNavigate } from "react-router-dom";

export default function ButtonBack() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={`${styles.btn} ${styles.back}`}
      onClick={() => navigate(-1)}
    >
      &#8592; Back
    </button>
  );
}
