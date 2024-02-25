import Head from "next/head";

import LandingPage from "../src/components/landing-page";

import { getPostData } from "../src/util/posts";
import { constants } from "../src/util/constants";

export default function Home({ essays }) {
  return (
    <div>
      <Head>
        <title>Ji</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <LandingPage essays={essays} />
    </div>
  );
}

export async function getStaticProps() {
  let essays = [];

  for (let i = 0; i < constants.published.length; i++) {
    let id = constants.published[i];
    let postData = await getPostData(id);
    essays.push(postData);
  }

  return {
    props: {
      essays,
    },
  };
}
