import styles from "./Button.module.css";

const Button = (props) => {
  const onClickHandler = () => {
    try {
      props.onClick();
    } catch (error) {}
  };
  return (
    <button className={styles.style} onClick={onClickHandler}>
      {props.text}
    </button>
  );
};

export default Button;
