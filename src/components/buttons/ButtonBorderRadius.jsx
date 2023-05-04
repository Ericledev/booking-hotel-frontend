import styles from "./ButtonBorderRadius.module.css";

const ButtonBorderRadius = (props) => {
  const onClickHandler = () => {
    if (!props.onClick) return;
    props.onClick();
  };
  return (
    <button
      className={styles.style}
      style={{ padding: `10px ${props.padding}px`, width: `${props.width}` }}
      onClick={onClickHandler}
    >
      {props.text}
    </button>
  );
};

export default ButtonBorderRadius;
