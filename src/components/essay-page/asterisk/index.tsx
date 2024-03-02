import Image from "next/image";
import styles from "./Asterisk.module.css";

export const Asterix = (props: {
  isSelected: boolean;
  onClick: () => void;
}) => (
  <span
    className={styles.container}
    style={{
      background: props.isSelected ? "#E8E5E5" : "default",
    }}
    onClick={props.onClick}
  >
    <Image src={"/comment-text.svg"} width={17} height={17} alt="note" />
  </span>
);
