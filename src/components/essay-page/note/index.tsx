import { MDXRemote } from "next-mdx-remote";
import styles from "./Note.module.css";
import { constants } from "../../../util/constants";

export const Note = (props: {
  markdown: string;
  onHide: () => void;
  isInLine?: boolean;
}) => {
  const HideButton = () => (
    <div className={styles.hideButton} onClick={props.onHide}>
      hide
    </div>
  );
  return (
    <div
      className={styles.note}
      style={{
        background: props.isInLine
          ? constants.inlineAnnotationFill
          : "transparent",
      }}
    >
      <span
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: props.markdown }}
      />
      <HideButton />
    </div>
  );
};
