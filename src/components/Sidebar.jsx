import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <div className={styles.copyright}>
          © Copyright {new Date().getFullYear()} by WorldWise Inc.
        </div>
      </footer>
    </div>
  );
}
