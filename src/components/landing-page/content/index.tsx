import "react-notion/src/styles.css";

import { NotionRenderer } from "react-notion";

export async function getStaticProps() {
  const data = await fetch(
    "https://notion-api.splitbee.io/v1/page/<NOTION_PAGE_ID>"
  ).then((res) => res.json());

  return {
    props: {
      blockMap: data,
    },
  };
}

export default ({ blockMap }) => (
  <div style={{ maxWidth: 768 }}>
    <NotionRenderer blockMap={blockMap} />
  </div>
);
