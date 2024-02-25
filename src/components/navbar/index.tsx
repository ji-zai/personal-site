import Link from "next/link";
import styles from "./Navbar.module.css";
import React from "react";
import Image from "next/image";
import { Profile } from "../landing-page";

export const Navbar = () => {

  return (
    <div className={styles.container}>
      <Link
        href="/"
        style={{ padding: 0, margin: 0}}
      >
        <Profile size={40} />
      </Link>
    </div>
  );
};
