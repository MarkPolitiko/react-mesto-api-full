import logo from "../images/logo.svg";
import { Switch, Route, Link } from "react-router-dom";

function Header({ userEmail, onLogOut }) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Место Россия" />
      <Switch>
        <Route path="/signup">
          <Link className="header__link" to="/signin">
            Войти
          </Link>
        </Route>
        <Route path="/signin">
          <Link className="header__link" to="/signup">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__user-data">
            <p className="header__email">{userEmail}</p>
            <Link className="header__link" to="/signin" onClick={onLogOut}>
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
