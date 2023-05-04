import classes from "./login-form.module.css";
import ButtonBorderRadius from "../../components/buttons/ButtonBorderRadius";
import { useRef, useState } from "react";
import { useContext } from "react";
import AuthContext from "../../store/authConext";
import { useEffect } from "react";
import { isEmail } from "../../util/function";

const LoginForm = (props) => {
  const [messageEmail, setMessageEmail] = useState();
  const emailRef = useRef();
  const passwordRef = useRef();
  const authCtx = useContext(AuthContext);
  const { user, signupMode } = authCtx;

  useEffect(() => {
    emailRef.current.value = "";
    passwordRef.current.value = "";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (!signupMode) {
    props.submit(emailRef.current.value, passwordRef.current.value);
    // }
  };

  /* check login fail */
  let showMessage = "";
  if (signupMode) {
    showMessage = "";
  } else if (user && user.ok === false) {
    showMessage =
      " Email, password is wrong or not exist email. Please try again!";
  }
  // check the format email is correct
  const isEmailHandler = (e) => {
    if (!isEmail(e.target.value)) {
      setMessageEmail("Please input correct format of email. E.x: abc@def.xyz");
      e.target.focus();
      return;
    }
    setMessageEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <input
        ref={emailRef}
        type="input"
        placeholder="email"
        onBlur={isEmailHandler}
      />
      <label> {messageEmail}</label>
      <input ref={passwordRef} type="password" placeholder="password" />
      <ButtonBorderRadius text={signupMode ? "Create Account" : "Login"} />
      <label> {showMessage}</label>
    </form>
  );
};
export default LoginForm;
