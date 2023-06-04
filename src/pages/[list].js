import { NextApiRequest, NextApiResponse } from "next";
import {sampleLists} from "../samples";

export default function ListPage({ list }) {
  return (
    <div>
      <h1 className="text-[40px] font-[Golos]">{list.title}</h1>
      <p>list page under construction ~</p>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = sampleLists.map((list) => ({
    params: { list: list.slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // let obj = { slug: params.slug};
  // let data = Object.keys(obj);
  // finds item.slug matching params in samplesLists
  const data = sampleLists.find(item => item.slug === params.list);
  JSON.stringify(data);
  return {
    props: {
      list: data,
    },
  };
}
