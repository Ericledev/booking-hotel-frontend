import { useCallback, useEffect } from "react";
import { useState } from "react";
import verifyExpire from "../api/verify_expire.js";
import AuthContext from "./authConext.js";

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [signupMode, setSignupMode] = useState(false);

  useEffect(() => {
    // verify expires
    verifyExpire().then((data) => {
      if (data.message === "Invalid Token") {
        logoutHandler();
        return;
      }
    });
    const userStorage = JSON.parse(localStorage.getItem("user"));
    if (userStorage) {
      setIsLoggedIn(true);
      setUser(userStorage);
      setSignupMode(false);
    }
  }, []);

  const loginHandler = useCallback((userRes) => {
    //{message:"ok || fail", user:{email,isAdmin} || null}
    setIsLoggedIn(true);
    setUser(userRes);
    setSignupMode(false);
    localStorage.setItem("user", JSON.stringify(userRes));
  }, []);
  // logout app
  const logoutHandler = async () => {
    try {
      setIsLoggedIn(false);
      setUser(null);
      localStorage.clear();
    } catch (error) {
      console.log("CHECK ERROR: ", error);
    }
  };
  // if user or pass is wrong
  const setUserHandler = () => {
    setUser({ ok: false });
  };
  // Change the signup mode
  const signupHandler = () => {
    setSignupMode(true);
  };
  // Change the login mode
  const loginModeHandler = () => {
    setSignupMode(false);
    setUser(null);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        signupMode,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        onSetUserFail: setUserHandler,
        onSignupMode: signupHandler,
        onLoginMode: loginModeHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContextProvider;
