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
import { generateTable, hashString, useScreenWidth } from "../../util/hooks";
import { constants } from "../../util/constants";
import { TableOfContents } from "./toc";

type Annotation = {
  id: string;
  markdown: string;
  y?: number;
};

const EssayPage = (props: { essay: Essay; source: any }) => {
  let [activeAnnotation, setActiveAnnotation] = useState<Annotation | null>(
    null
  );

  let [toc, setToc] = useState<{ id: string; label: string }[]>([]);

  useEffect(() => {
    const makeToc = async () => {
      const toc = generateTable(props.essay.source);
      setToc(toc);
    };
    makeToc();

    window.onload = function () {
      if (window.location.hash) {
        const hash = window.location.hash;
        window.location.hash = "";
        history.replaceState(null, null, hash);
      }
    };
  }, []);

  const screenWidth = useScreenWidth();
  const rightSpace = (screenWidth - constants.essayContainerMaxWidth) / 2;
  const isAnnotationInline = rightSpace < constants.marginNoteWidth + 32;

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
      <p ref={componentRef} style={{ position: "relative" }}>
        {props.line}
        <span
          style={
            !isAnnotationInline
              ? {
                  position: "absolute",
                  right: -32,
                  top: 0,
                }
              : {}
          }
        >
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
        </span>

        {isAnnotationInline &&
          activeAnnotation &&
          activeAnnotation.id === id && (
            <div style={{ marginTop: 8 }}>
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
              right: rightSpace - constants.marginNoteWidth - 16,
              top: activeAnnotation.y,
              width: constants.marginNoteWidth,
            }}
          >
            <Note
              markdown={activeAnnotation.markdown}
              onHide={() => setActiveAnnotation(null)}
            />
          </div>
        )}
        <div
          className={styles.header}
          style={{
            maxWidth: constants.essayContainerMaxWidth + 300,
            margin: "auto",
          }}
        >
          {props.essay.date && (
            <span className={styles.date + " " + protoMono.className}>
              {props.essay.date}
            </span>
          )}
          <h1 style={{ marginTop: 0 }}>{props.essay.title}</h1>
          {toc && <TableOfContents toc={toc} />}
        </div>

        <div
          className={styles.container}
          style={{
            maxWidth: constants.essayContainerMaxWidth,
          }}
        >
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
