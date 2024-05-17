import React from "react";
import styles from "./Callout.module.css";

const Callout = (props: { children: any }) => {
  return <div className={styles.callout}>{props.children}</div>;
};

export default Callout;
