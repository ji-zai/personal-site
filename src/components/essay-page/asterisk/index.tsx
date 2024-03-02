import Image from "next/image";
import styles from "./Asterisk.module.css";

export const Asterix = (props: {
  isSelected: boolean;
  onClick: () => void;
}) => (
  <span
    className={styles.container}
    onClick={props.onClick}
    style={{ background: props.isSelected ? "#eeeeee" : "" }}
  >
    <Image src={"/comment-text.svg"} width={17} height={17} alt="note" />
  </span>
);
