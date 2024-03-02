import { Essay } from "../landing-page";
import { Navbar } from "../navbar";
import styles from "./Essay.module.css";
import React, { useEffect, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { essayComponents } from "./EssayComponents";
import { protoMono } from "../../fonts";
import { XLink } from "../base/XLink";
import { logEvent } from "../../util/logging";
import { Asterix } from "./asterisk";
import { v4 as uuid } from "uuid";
import { Note } from "./note";
import { useScreenWidth } from "../../util/hooks";

type Annotation = {
  id: string;
  markdown: string;
  y?: number;
};

const EssayPage = (props: { essay: Essay; source: any }) => {
  let [activeAnnotation, setActiveAnnotation] = useState<Annotation | null>(
    null
  );

  const screenWidth = useScreenWidth();

  const rightSpace = (screenWidth - 600) / 2;
  const isAnnotationInline = rightSpace < 300;

  const WithAnnotation = (props: { line: string; markdown: string }) => {
    let id = "poop";
    return (
      <p>
        {props.line}
        <Asterix
          isSelected={activeAnnotation && activeAnnotation.id === id}
          onClick={() => {
            if (activeAnnotation && activeAnnotation.id == id)
              return setActiveAnnotation(null);

            setActiveAnnotation({
              id,
              markdown: props.markdown,
            });
          }}
        />

        {isAnnotationInline &&
          activeAnnotation &&
          activeAnnotation.id === id && (
            <div style={{ marginTop: 16 }}>
              <Note
                isInLine={isAnnotationInline}
                markdown={activeAnnotation.markdown}
                onHide={() => setActiveAnnotation(null)}
              />
            </div>
          )}
      </p>
    );
  };

  useEffect(() => {
    logEvent("essay/" + props.essay.id, null);
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          {activeAnnotation && !isAnnotationInline && (
            <div
              style={{
                position: "absolute",
                right: 16,
                width: rightSpace - 80,
              }}
            >
              <Note
                markdown={activeAnnotation.markdown}
                onHide={() => setActiveAnnotation(null)}
              />
            </div>
          )}
          <div className={styles.header}>
            {props.essay.date && (
              <span className={styles.date + " " + protoMono.className}>
                {props.essay.date}
              </span>
            )}
            <h1 style={{ marginTop: 0 }}>{props.essay.title}</h1>
          </div>

          <div className={styles.content}>
            <MDXRemote
              {...props.source}
              components={{ ...essayComponents, WithAnnotation }}
            />
          </div>
          <div className={styles.footer}>
            <XLink
              label="Discuss"
              onClick={() => window.open(props.essay.xLink)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EssayPage;
