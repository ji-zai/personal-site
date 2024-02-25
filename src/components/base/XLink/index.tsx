import Image from "next/image";
import X from "../../../public/twitter.svg"
import styles from "./XLink.module.css"

export const XLink = (props: { onClick: () => void, label?: string }) => (
    <div className={styles.container} onClick={props.onClick}>
        <Image
            src={"/twitter.svg"}
            width={24}
            height={24}
            alt="X"
        />
  </div>
);
