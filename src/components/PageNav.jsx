import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
export default function PageNav() {
  return (
    <div className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to={"/pricing"}>pricing</NavLink>
        </li>
        <li>
          <NavLink to={"/product"}>product</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
