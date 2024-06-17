import Image from "next/image";

import styles from "./LandingPage.module.css";
import { ListItem } from "./list-item/ListItem";
import { XLink } from "../base/XLink";
import { useEffect } from "react";
import { logEvent } from "../../util/logging";

export type Essay = {
  id: string;
  title: string;
  caption: string;
  date: string;
  xLink?: string;
  source?: string;
  link?: string;
};

export const Profile = (props: { size: number }) => (
  <Image
    src="/images/profile.png"
    alt="profile"
    width={props.size}
    height={props.size}
    style={{
      borderRadius: props.size < 100 ? 12 : 24,
    }}
  />
);

const LandingPage = (props: { essays: Essay[] }) => {
  useEffect(() => {
    logEvent("home", null);
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <Profile size={100} />
          <XLink onClick={() => window.open("https://x.com/jisnuzai")} />
        </div>

        <div className={styles.essays}>
          {props.essays.map((essay) => (
            <ListItem essay={essay} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
