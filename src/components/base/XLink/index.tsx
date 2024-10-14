import Image from "next/image";
import X from "../../../public/twitter.svg";
import styles from "./XLink.module.css";

export const XLink = (props: { onClick: () => void; label?: string }) => {
  const size = props.label ? 16 : 24;

  return (
    <div className={styles.container} onClick={props.onClick}>
      <span className={styles.logo}>𝕩</span>
      {props.label && <span>{props.label}</span>}
    </div>
  );
};
