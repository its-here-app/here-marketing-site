import { NextApiRequest, NextApiResponse } from "next";
import Image from "next/image";
import { sampleLists } from "../samples";

export default function ListPage({ list }) {
  return (
    <>
      <section className="mx-[6px] mt-[6px]">
        <div
          className="font-[Golos] text-[--neon] h-[50vh] bg-center bg-cover w-full rounded-[1rem] flex justify-between flex-col"
          style={{ backgroundImage: `url('${list.img}')` }}
        >
          <div className="w-full h-full"></div>
          <div className="w-full flex items-center justify-center flex-col">
            <div className="font-[Crimson] text-[34px] font-[400] leading-[106%] tracking-[-0.06em]">
              {list.title}
            </div>
            <div className="text-[40px] text-center px-[3rem] leading-[106%] font-[600] tracking-[-0.06em]">
              {list.subtitle}
            </div>
          </div>
          <div className="w-full h-full flex justify-between items-end px-[1rem] py-[1rem]">
            <div className="">ekin</div>
            <div className="">last updated 1 week ago</div>
          </div>
        </div>
      </section>
      <section>
        <div class="flex flex-col w-full h-auto gap-[1rem] pt-[1rem] px-[1rem] font-[Golos]">
          {list.spots.map((spot, i) => {
            return (
              <div key={spot.name} className="flex flex-row">
                <div className="w-[80px] h-[80px] bg-gray-300 rounded-[8px]"></div>
                <div className="min-h-[80px] pl-[1rem] flex flex-col gap-[.2rem] items-between">
                  <div className="font-[Radio] text-[24px] tracking-[-0.04em] leading-[100%]">
                    <div className="overflow-x-scroll">{spot.name}</div>
                  </div>
                  <div className="text-[#757575] tracking-[-0.02em] leading-[100%]">
                    {spot.short}
                  </div>
                  <div className="inline-block px-[8px] py-[2px] rounded-[8px] bg-[#DFDFDF] tracking-[-0.02em] leading-[100%]">
                    {spot.type}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
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
  const data = sampleLists.find((item) => item.slug === params.list);
  JSON.stringify(data);
  return {
    props: {
      list: data,
    },
  };
}
