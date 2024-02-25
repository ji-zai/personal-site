import styles from "./Essay.module.css";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";

const NavLink = (props: {
  title: string;
  href: string;
  direction: "next" | "previous";
}) => {
  const arrow = <span>{props.direction === "previous" ? "⟵" : "⟶"}</span>;
  let comps =
    props.direction === "next" ? [props.title, arrow] : [arrow, props.title];
  return (
    <Link className={styles.navLink} href={props.href}>
      {comps.map((item) => (
        <span>{item}</span>
      ))}
    </Link>
  );
};

// MDX components to replace in the MDX content.
const ChapterLink = (props: { href: string; children: React.ReactNode }) => {
  return <Link {...props} href={"/get-interviews/" + props.href} />;
};

const Divider = (props: { belowHeader?: boolean }) => (
  <div
    className={
      styles.divider + " " + (props.belowHeader ? styles.belowHeader : "")
    }
  />
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

export const essayComponents = {
  Image,
  Link,
  ChapterLink,
  Divider,
  EmailTemplate,
  Caption,
  PlaceHolder,
  CustomImage,
  h2: (props) => <h2 variant="h2" {...props} />,
  h3: (props) => <h2 variant="h3" {...props} />,
  a: (props) => <ExternalLink src={props.href}>{props.children}</ExternalLink>,
};
