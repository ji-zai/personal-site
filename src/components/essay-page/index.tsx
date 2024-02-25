import { Essay } from "../landing-page";
import { Navbar } from "../navbar";
import styles from "./Essay.module.css";
import React, { useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { essayComponents } from "./EssayComponents";
import { protoMono } from "../../fonts";
import { XLink } from "../base/XLink";

const EssayPage = (props: { essay: Essay; source: any }) => {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.header}>
          {props.essay.date && (
            <span className={styles.date + " " + protoMono.className}>{props.essay.date}</span>
          )}
          <h1 style={{ marginTop: 0 }}>
            {props.essay.title}
          </h1>
        </div>

        <div className={styles.content}>
          <MDXRemote {...props.source} components={essayComponents} />
        </div>
        <div className={styles.footer}>
        <XLink label="Discuss" onClick={() => window.open(props.essay.xLink)}/>
        </div>
      </div>
    </div>
  );
};

export default EssayPage;
