import { google } from "googleapis";
import { useRouter } from "next/router";
import slugify from "@sindresorhus/slugify";
import { Spot } from "../../components/Spot";
import { Footer } from "../../components/Footer";
import SVG from "react-inlinesvg";
import { Share } from "/public/icons/Share.svg";
import { useEffect } from "react";
import router from "next/router";

export async function getServerSideProps({ query }) {
  const auth = await google.auth.getClient({
    credentials: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      project_id: process.env.GOOGLE_PROJECT_ID,
      private_key: process.env.GOOGLE_PRIVATE_KEY,
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join("\n"),
      auth_uri: process.env.GOOGLE_AUTH_URI,
      token_uri: process.env.GOOGLE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
      universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const { slug } = query;
  const range = `Sheet1!A$2:G$40`;
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  // find list with matching slug
  const rows = response.data.values;
  const lists = rows.map((row) => ({
    city: row[0],
    playlistName: row[1],
    isFeatured: row[2],
    slug: row[3],
    username: row[4],
    description: row[5],
    content: row[6],
  }));

  // const list = lists.find((list) => list.slug === slug);

  // get id of list with matching slug
  const listId = lists.findIndex((list) => list.slug === slug);

  const [city, playlistName, isFeatured, listSlug, username, description, content] =
    response.data.values[listId];

  return {
    props: {
      city,
      playlistName,
      listSlug,
      username,
      description,
      content,
    },
  };
}

export default function ListPage({ city, playlistName, listSlug, username, description, content }) {
  const parsedContent = JSON.parse(content);
  // const router = useRouter();
  // const s3_url = "https://its-here-app.s3.amazonaws.com/"

  useEffect(() => {
    const body = document.querySelector("body");

    // if router.from is home

    body.animate(
      [
        {
          opacity: 0,
        },
        {
          opacity: 1,
        },
      ],
      {
        duration: 500,
        easing: "ease-in-out",
        fill: "forwards",
      }
    );
    // }
  }, []);

  const handleClose = () => {
    const body = document.querySelector("body");
    body.animate(
      [
        {
          opacity: 1,
        },
        {
          opacity: 0,
        },
      ],
      {
        duration: 500,
        easing: "ease-in-out",
        fill: "forwards",
      }
    ).onfinish = (event) => {
      // router.push(`/`);
      router.push('/', undefined, { shallow: true })
    };
  };

  return (
    <>
      <div className="max-w-[1800px] mx-auto">
        <div className=" flex flex-col md:grid grid-cols-2 px-[.5rem] py-[.5rem] min-h-[100vh]">
          {/* left */}
          <section className=" m-0 flex flex-col h-[50vh] md:h-[calc(100vh-1.5rem)] w-full">
            <div
              className=" h-full top-0 left-0 ml-[.5rem] mt-[.5rem]  rounded-[1rem] md:max-w-[50vw] bg-center bg-cover flex flex-col justify-between  font-[Golos] text-[--neon]"
              style={{
                backgroundImage: `url('${
                  process.env.NEXT_PUBLIC_GCP_URL
                }/${username}_${listSlug}/cover_${"00"}.webp')`,
              }}
            >
              {/* add a sticky element */}
              <div className="w-full h-full flex justify-between items-start px-[1.25rem] py-[1.25rem]">
                <div
                  onClick={handleClose}
                  className="cursor-pointer flex flex-row gap-[0.6875rem] items-center justify-center"
                >
                  <SVG
                    src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/Close.svg`}
                    width={24}
                    height="auto"
                    title="Close"
                    className="fill-[--neon]"
                  />
                </div>
                <SVG
                  src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/Share.svg`}
                  width={24}
                  height="auto"
                  title="Share"
                  className="fill-[--neon]"
                />
              </div>
              <div className="w-full flex items-center justify-center flex-col">
                <div className="font-[Crimson] text-[2.125rem] lg:text-[3rem] font-[400] leading-[106%] lg:leading-normal tracking-[-0.06em] ">
                  {city}
                </div>
                <div className="text-[2.625rem] lg:text-[4rem] text-center px-[3rem] leading-[106%] lg:leading-normal font-[600] tracking-[-0.06em]">
                  {playlistName}
                </div>
              </div>
              <div className="w-full h-full flex justify-between items-end px-[1.25rem] py-[1.25rem]">
                <div className="flex flex-row gap-[0.6875rem] items-center justify-center">
                  <div className="w-[1.75rem] h-[1.75rem] bg-[--neon] rounded-full"></div>
                  <div className="">{username}</div>
                </div>
                <div className="">Last updated 1 week ago</div>
              </div>
            </div>
          </section>
          {/* right side */}
          <section className="flex gap-[1rem] max-h-[100vh] overflow-y-auto pt-[1.5rem] top-0 w-full px-[2rem] flex-col">
            <div className="grid grid-cols-2">
              {/*  */}
              <div className="justify-self-start text-[1rem] lg:text-[1.125rem]">
                {parsedContent.length} spots *
              </div>
              {/* icon bubbles */}
              <div className="justify-self-end">
                {/* a sliding toggle switch */}
                <div className="relative grid grid-cols-3 gap-[.5rem] bg-[#DFDFDF] w-[124px] px-[8px] h-[40px] rounded-full overflow-hidden">
                  <div className="z-10 absolute bg-[--neon] w-[44px] h-full rounded-full"></div>
                  <div className="z-20 rounded-full flex items-center justify-center">
                    <SVG
                      src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/list-view-focus.svg`}
                      width={20}
                      height="auto"
                      title="Share"
                      className="stroke-2"
                    />
                  </div>
                  <div className="z-20 flex items-center justify-center">
                    <SVG
                      src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/expanded-view.svg`}
                      width={20}
                      height="auto"
                      title="Share"
                      className=""
                    />
                  </div>
                  <div className="z-20 flex items-center justify-center">
                    <SVG
                      src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/Map view.svg`}
                      width={20}
                      height="auto"
                      title="Share"
                      className="fill-none stroke-black"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full text-[.875rem] lg:text-[1.125rem] md:pr-[5rem] ">
              {description}
            </div>
            <div className="flex flex-col w-full h-auto gap-[1rem] pt-[1rem] font-[Golos]">
              {parsedContent.map((spot, i) => {
                const url = `${process.env.NEXT_PUBLIC_GCP_URL}/${username}_${listSlug}/${slugify(
                  spot.name
                )}_${"00"}.webp`;
                return (
                  <Spot
                    key={spot.name}
                    title={spot.name}
                    description={spot.description}
                    type={spot.type}
                    image={url}
                  />
                );
              })}
            </div>
            <div className="grid grid-cols-2">
              <div className=""></div>
              <div className="justify-self-end">
                <div className="bg-black flex flex-row font-sans rounded-[1rem] text-[.875rem] px-[.75rem] py-[.5rem] text-white">
                  <SVG
                    src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/bookmark.svg`}
                    width={24}
                    className="stroke-white"
                    height="auto"
                    title="Copy List"
                  />{" "}
                  Copy List
                </div>
              </div>
            </div>
            <div className="flex flex-col h-[500px] items-center justify-center"></div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
