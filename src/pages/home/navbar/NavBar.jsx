import React from "react";
import styles from "./NavBar.module.css";
import linkList from "../../../data/navBar.json";
import NavList from "../../../components/navlink/NavList";
import { useContext } from "react";
import AuthContext from "../../../store/authConext";
import { useNavigate } from "react-router-dom";

// Create NavBar component
const NavBar = (props) => {
  const authCtx = useContext(AuthContext);
  const { user, isLoggedIn, onLogout, onSignupMode, onLoginMode } = authCtx;
  // console.log("CHECK DATE TIME: ", new Date("2023-03-31T14:21:50.741+00:00"));

  const nav = useNavigate();
  const loginHandler = () => {
    onLoginMode();

    if (isLoggedIn) {
      onLogout();
      nav("/");
    } else {
      nav("/login");
    }
  };
  const signupHandler = () => {
    if (!isLoggedIn) {
      onSignupMode();
      nav("/signup");
      return;
    }
    nav("/transaction");
  };
  const goHomeHandler = () => {
    nav("/");
  };
  return (
    // Render header of navbar, Booking website & button
    <div className={styles["nav-container"]}>
      <div className={styles["nav-head"]}>
        <div className={styles.title}>
          <label className={styles["booking-website"]} onClick={goHomeHandler}>
            Booking website
          </label>
        </div>
        <div className={styles.btns}>
          {isLoggedIn ? <label>{user.email}</label> : ""}
          <button className={styles.register} onClick={signupHandler}>
            {isLoggedIn ? "Transactions" : "Sign up"}
          </button>
          <button className={styles.login} onClick={loginHandler}>
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </div>
      {/* Render NavList and pass props */}
      <NavList linkList={linkList} />
    </div>
  );
};

export default React.memo(NavBar);
