import css from "./Header.module.css";
import logo from "/logo/logo.jpg";
import { Link } from 'react-router-dom';
export default function Header() {

  return (
    <header className={css.header}>
      <div className={`container ${css.inner}`}>
        <Link to="/" className={css.logo}>
          <img src={logo} alt="Logo" />
          <span className={css.logoText}>Superheroes!</span>
        </Link>
      </div>
    </header>
  );
}
