import styles from "./toc.module.css";

export const TableOfContents = ({ toc }) => {
  const handleClick = (e, id) => {
    e.preventDefault();
    console.log("handle click: ", id);
    const element = document.getElementById(id);
    if (element) {
      // Scroll to the element, then adjust by 100px
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 100,
        behavior: "smooth",
      });
    }
  };

  console.log(toc);

  return (
    <nav aria-label="Table of contents" className={styles.container}>
      <ul className={styles.list}>
        {toc.map((entry, index) =>
          entry.level === 3 ? (
            <li
              className={styles.listItem}
              key={index}
              onClick={(e: any) => handleClick(e, entry.id)}
              style={{
                cursor: "pointer",
                marginBottom: "10px",
                breakInside: "avoid",
              }}
            >
              <a href={`#${entry.id}`}>{entry.label}</a>
            </li>
          ) : (
            <div className={styles.big}>{entry.label}</div>
          )
        )}
      </ul>
    </nav>
  );
};
