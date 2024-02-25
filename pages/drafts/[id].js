import { getAllPostIds, getPostData } from "../../src/util/posts.js";
import Head from "next/head";
import EssayPage from "../../src/components/essay-page";
import { serialize } from "next-mdx-remote/serialize";

export default function Post({ postData, source }) {
  return (
    <div>
      <Head>
        <title>{postData.title}</title>
        <link rel="icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <EssayPage essay={postData} source={source} isDraft={true} />
    </div>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  const mdxSource = await serialize(postData.source, {
    parseFrontmatter: true,
  });

  return {
    props: {
      postData,
      source: mdxSource,
    },
  };
}
