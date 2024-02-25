import { Essay } from "../landing-page";
import { Navbar } from "../navbar";
import styles from "./Essay.module.css";
import React, { useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { essayComponents } from "./EssayComponents";

const EssayPage = (props: { essay: Essay; source: any }) => {
  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          {props.essay.date && (
            <span className={styles.date}>{props.essay.date}</span>
          )}
          <h1 style={{ marginTop: 0 }}>
            {props.essay.title}
          </h1>
          {props.essay.caption && (
            <span className={styles.caption}>{props.essay.caption}</span>
          )}
        </div>

        <div className={styles.content}>
          <MDXRemote {...props.source} components={essayComponents} />
        </div>

      </div>

    </div>
  );
};

export default EssayPage;
