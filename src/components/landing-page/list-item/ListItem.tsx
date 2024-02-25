import Link from "next/link";
import { Essay } from "..";
import { protoMono } from "../../../fonts";

import styles from "./ListItem.module.css";

const ContentItem = (props: { essay: Essay }) => (
  <div className={styles.container}>
    <div className={styles.title}>
      {props.essay.title}
      <div className={styles.date + " " + protoMono.className}>
        {props.essay.date}
      </div>
    </div>
  </div>
);

export const ListItem = (props: { essay: Essay }) => {
  const item = <ContentItem essay={props.essay} />;

  if (props.essay.link)
    return (
      <a href={props.essay.link} target="_blank">
        {item}
      </a>
    );

  return (
    <Link
      href={`/${props.essay.link ? props.essay.link : props.essay.id}`}
      style={{ textDecoration: "none" }}
    >
      {item}
    </Link>
  );
};
