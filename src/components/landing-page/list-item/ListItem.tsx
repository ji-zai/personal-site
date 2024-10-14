import Link from "next/link";
import { Essay } from "..";
import { protoMono } from "../../../fonts";

import styles from "./ListItem.module.css";

export const ListItem = (props: { essay: Essay }) => {
  return (
    <div className={styles.container}>
      <Link href={`/${props.essay.id}`}>{props.essay.title}</Link>
    </div>
  );
};
