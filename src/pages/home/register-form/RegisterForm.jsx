import styles from "./RegisterForm.module.css";
import ButtonBorderRadius from "../../../components/buttons/ButtonBorderRadius";

// Create RegisterForm component, reuse ButtonBorderRadius component
const subcribeHandler = () => {};
const RegisterForm = () => {
  return (
    <div className={styles["register-container"]}>
      <div className={styles["register-content"]}>
        <h2>Save time, save money !</h2>
        <p>Sign up and we'll send the best deals to you.</p>
        <div className={styles["input-control"]}>
          <input type="text" placeholder="Your email" />
          <ButtonBorderRadius text="Subscribe" onClick={subcribeHandler} />
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;
