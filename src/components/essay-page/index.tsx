import { Essay } from "../landing-page";
import { Navbar } from "../navbar";
import styles from "./Essay.module.css";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { MDXRemote } from "next-mdx-remote";
import { essayComponents } from "./EssayComponents";
import { protoMono } from "../../fonts";
import { XLink } from "../base/XLink";
import { logEvent } from "../../util/logging";
import { Asterix } from "./asterisk";
import { v4 as uuid } from "uuid";
import { Note } from "./note";
import { useScreenWidth } from "../../util/hooks";
import { constants } from "../../util/constants";

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
  const rightSpace = (screenWidth - constants.essayContainerMaxWidth) / 2;
  const isAnnotationInline = rightSpace < 332;

  async function hashString(string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(string); // Convert string to Uint8Array
    const hashBuffer = await crypto.subtle.digest("SHA-256", data); // Hash the data
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""); // Convert bytes to hex string
    return hashHex;
  }

  const WithAnnotation = (props: { line: string; markdown: string }) => {
    const [id, setId] = useState("");
    const componentRef = useRef(null); // Step 1: Create a ref
    const [componentYPosition, setComponentYPosition] = useState(0); // To store the Y position

    useEffect(() => {
      const poop = async () => {
        const hash = await hashString(props.line.substring(0, 15));
        setId(hash);
      };
      poop();

      if (componentRef.current) {
        const position =
          componentRef.current.getBoundingClientRect().top + window.scrollY; // Step 2: Read Y position
        setComponentYPosition(position);
      }
    }, []);

    return (
      <p ref={componentRef}>
        {props.line}
        <Asterix
          isSelected={activeAnnotation && activeAnnotation.id === id}
          onClick={() => {
            if (activeAnnotation && activeAnnotation.id == id)
              return setActiveAnnotation(null);

            setActiveAnnotation({
              id,
              markdown: props.markdown,
              y: componentYPosition,
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
        {activeAnnotation && !isAnnotationInline && (
          <div
            style={{
              position: "absolute",
              right: rightSpace - 300 - 16,
              top: activeAnnotation.y,
              width: 300,
            }}
          >
            <Note
              markdown={activeAnnotation.markdown}
              onHide={() => setActiveAnnotation(null)}
            />
          </div>
        )}
        <div
          className={styles.container}
          style={{
            maxWidth: constants.essayContainerMaxWidth,
          }}
        >
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
