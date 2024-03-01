import { MDXRemote } from "next-mdx-remote";
import styles from "./Note.module.css";

export const Note = (props: { markdown: string; onHide: () => void }) => {
  const HideButton = () => (
    <div className={styles.hideButton} onClick={props.onHide}>
      hide
    </div>
  );
  return (
    <div className={styles.note}>
      <span
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: props.markdown }}
      />
      <HideButton />
    </div>
  );
};
