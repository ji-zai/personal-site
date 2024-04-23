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

  return (
    <nav aria-label="Table of contents" className={styles.container}>
      <ul className={styles.list}>
        {toc.map((entry, index) => (
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
            <a href={`#${entry.id}`}>{index + 1 + ". " + entry.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
