import styles from "./Essay.module.css";

import React, { useState } from "react";
import Image from "next/image";
import { getIdFromHeader } from "../../util/hooks";

const Divider = (props: { belowHeader?: boolean }) => (
  <div
    className={
      styles.divider + " " + (props.belowHeader ? styles.belowHeader : "")
    }
  >
    ---
  </div>
);

// Email templating:
const EmailTemplate = (props: { children: any }) => (
  <div className={styles.emailTemplate}>{props.children}</div>
);

const Caption = (props: { children: any }) => (
  <span className={styles.emailTemplateCaption}>({props.children})</span>
);

const PlaceHolder = (props: { children: any }) => (
  <span className={styles.placeholder}>
    <span>&#123;</span>
    {props.children}
    <span>&#125;</span>
  </span>
);

// https://stackoverflow.com/a/71096113 - I once again owe a debt of gratitude to fellow developers.
const CustomImage = (props: { src: string; caption?: string }) => {
  const [paddingTop, setPaddingTop] = useState("0");
  return (
    <div className={styles.outerImageContainer}>
      <div className={styles.imageContainer} style={{ paddingTop }}>
        <Image
          src={props.src}
          fill={true}
          alt={props.src}
          objectFit="contain"
          onLoad={({ target }) => {
            const { naturalWidth, naturalHeight } = target as HTMLImageElement;
            setPaddingTop(`calc(100% / (${naturalWidth} / ${naturalHeight})`);
          }}
        />
      </div>
      {props.caption && (
        <span className={styles.imageCaption}>{props.caption}</span>
      )}
    </div>
  );
};

const ExternalLink = (props: { src: string; children: any }) => (
  <a href={props.src} target="_blank">
    {props.children}
  </a>
);

const FootnoteNumber = (props: { number: number }) => {
  return <span className={styles.footnoteNumber}>{props.number}</span>;
};

const Footnote = (props: { number: number; children: any }) => {
  return (
    <div id={"ref_" + props.number} className={styles.footnote}>
      <a href={"#inline_" + props.number}>
        <FootnoteNumber number={props.number} />
      </a>
      <div className={styles.footnoteParas}>{props.children}</div>
    </div>
  );
};

const FootnoteReference = (props: { number: number }) => {
  return (
    <a
      id={"inline_" + props.number}
      href={"#ref_" + props.number}
      className={styles.footnoteReference}
    >
      <FootnoteNumber number={props.number} />
    </a>
  );
};

const Footnotes = (props: { children: any }) => {
  return <div className={styles.footnoteContainer}>{props.children}</div>;
};

export const essayComponents = {
  Image,
  Divider,
  EmailTemplate,
  Caption,
  PlaceHolder,
  CustomImage,
  Footnotes,
  aside: (props) => {
    return <div>POOOP</div>;
  },
  h2: (props) => {
    const label = props.children;
    return <h2 id={getIdFromHeader(label)} variant="h2" {...props} />;
  },
  h3: (props) => {
    const label = props.children;
    return <h3 id={getIdFromHeader(label)} variant="h3" {...props} />;
  },
  a: (props) => <ExternalLink src={props.href}>{props.children}</ExternalLink>,
  hr: (props) => <Divider />,
  Footnote,
  FootnoteReference,
};
