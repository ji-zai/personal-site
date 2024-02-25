import Link from "next/link";
import styles from "./Navbar.module.css";
import React from "react";
import Image from "next/image";
import { Profile } from "../landing-page";

export const Navbar = () => {

  const X = () => (
    <div
      className={styles.iconButton}
      onClick={() => window.open("https://x.com/jisnuzai")}
    >
      <Image
        priority
        src="/images/twitter.svg"
        width={16}
        height={16}
        alt="Twitter"
      />
    </div>
  );

  return (
    <div className={styles.container}>
      <Link
        href="/"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Profile size={24} />
      </Link>
    </div>
  );
};
