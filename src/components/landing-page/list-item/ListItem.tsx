import Link from "next/link";
import { Essay } from "..";
import { protoMono } from "../../../fonts";

import styles from "./ListItem.module.css";

// const ContentItem = (props: { essay: Essay }) => (
//   <div className={styles.container}>
//     <div className={styles.title}>
//       {props.essay.title}
//       <div className={styles.date + " " + protoMono.className}>
//         {props.essay.date}
//       </div>
//     </div>
//   </div>
// );

export const ListItem = (props: { essay: Essay }) => {
  // const item = <ContentItem essay={props.essay} />;

  return <Link href={`/${props.essay.id}`}>{props.essay.title}</Link>;
};
