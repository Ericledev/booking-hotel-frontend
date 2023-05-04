import { useContext } from "react";
import LoginForm from "../../components/login-form/login-form";
import AuthContext from "../../store/authConext";
import NavBar from "../home/navbar/NavBar";
import classes from "./login.module.css";
import useHTTP from "../../custom-hook/http";
import loginRequest from "../../api/login";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const { status, data, sendRequest } = useHTTP(loginRequest);
  const { onLogin, onSetUserFail } = useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    if (data && data.message === "ok") {
      onLogin(data.user);
      nav("/");
    } else if (data && data.message === "fail") {
      onSetUserFail();
    }
  }, [data, onLogin, nav, onSetUserFail]);

  const submitHandler = (email, password) => {
    sendRequest({ email, password });
  };
  return (
    <>
      <NavBar />
      <div className={classes.container}>
        <h1>Login</h1>
        <LoginForm submit={submitHandler} />
        {status === "pending" && <h4>Logining...</h4>}
      </div>
    </>
  );
};
export default Login;
