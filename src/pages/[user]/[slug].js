import { google } from "googleapis";
import { useRouter } from "next/router";
import slugify from "@sindresorhus/slugify";
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
  const range = `Sheet1!A$2:H$40`;
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
    instagram: row[5],
    description: row[6],
    content: row[7],
  }));

  // const list = lists.find((list) => list.slug === slug);

  // get id of list with matching slug
  const listId = lists.findIndex((list) => list.slug === slug);

  const [city, playlistName, isFeatured, listSlug, username, instagram, description, content] =
    response.data.values[listId];

  return {
    props: {
      city,
      playlistName,
      listSlug,
      username,
      instagram,
      description,
      content,
    },
  };
}

export default function ListPage({ city, playlistName, listSlug, username, instagram, description, content }) {
  const parsedContent = JSON.parse(content);
  // const router = useRouter();
  // const s3_url = "https://its-here-app.s3.amazonaws.com/"

  const copyToClipboard = () => {
    // copies list contents to clipboard
    const el = document.createElement("textarea");
    const content = parsedContent.map((spot) => spot.name).join("\n");
    el.value = content;
    document.body.appendChild(el);
    el.style.visibility = "hidden";
    el.select();
    document.execCommand("copy");
  };

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
      router.push("/", undefined, { shallow: true });
    };
  };

  return (
    <>
      <div className="max-w-[1800gpx] mx-auto">
        <div className="flex flex-col md:grid grid-cols-2 min-h-[100vh]">
          {/* <div className=" flex flex-col md:grid grid-cols-2 px-[.5rem] py-[.5rem] min-h-[100vh]"> */}
          {/* left */}
          <section className=" m-0 flex flex-col h-[50vh] md:h-[calc(100vh)] w-full">
            <div
              className=" h-full top-0 left-0 mx-[.5rem] my-[.5rem]  rounded-[1rem] md:max-w-[50vw] bg-center bg-cover flex flex-col justify-between  font-[Golos] text-[--neon]"
              style={{
                backgroundImage: `url('${process.env.NEXT_PUBLIC_GCP_URL}/${username}_${slugify(
                  city
                )}_${listSlug}_cover-${"00"}.jpg')`,
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
                <div
                  onClick={handleClose}
                  className="cursor-pointer flex flex-row gap-[0.6875rem] items-center justify-center"
                >
                  <SVG
                    src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/Share.svg`}
                    width={24}
                    height="auto"
                    title="Share"
                    className="fill-[--neon]"
                  />
                </div>
              </div>
              <div className="h-full flex items-center justify-center flex-col">
                <div className="max-w-[80%] font-[Crimson] text-[2.125rem] lg:text-[3rem] font-[400] leading-[106%] lg:leading-normal tracking-[-0.06em] ">
                  {city}
                </div>
                <div className="max-w-[80%] list-playlist-name">{playlistName}</div>
              </div>
              <div className="w-full h-full flex justify-between items-end px-[1.25rem] py-[1.25rem]">
                <div className="flex flex-row gap-[0.6875rem] items-center justify-center">
                  <a href={`https://instagram.com/${instagram}`} className="flex flex-row ">
                    <div
                      className="w-[1.25rem] md:w[1.75rem] mr-2 md:h[1.75rem] h-[1.25rem] bg-cover rounded-full"
                      style={{
                        backgroundImage: `url('${process.env.NEXT_PUBLIC_GCP_URL}/profile-pics/${username}.jpg')`,
                      }}
                    ></div>

                    <div className="text-[0.75rem] md:text-[0.875rem]">{username}</div>
                  </a>
                </div>
                <div className="text-[0.75rem] md:text-[0.875rem]">Last updated 1 week ago</div>
              </div>
            </div>
          </section>
          {/* right side */}
          <section className="flex gap-[1rem] max-h-[100vh] overflow-y-auto pt-[0.5rem] top-0 w-full px-[.75rem] flex-col">
            <div className="grid grid-cols-2">
              {/*  */}
              <div className="justify-self-start flex gap-[8px] items-center text-[1rem] lg:text-[1.125rem]">
                {parsedContent.length} spots{" "}
                <div className="relative pt-[0.5rem] text-[1.6rem]">*</div>
              </div>
              {/* icon bubbles */}
              <div className="justify-self-end">
                {/* a sliding toggle switch */}
                <div className="relative grid grid-cols-3 gap-[.5rem] bg-[#DFDFDF] w-[124px] px-[8px] h-[40px] rounded-full overflow-hidden">
                  <div className="z-10 absolute bg-[--neon] w-[44px] h-full rounded-full"></div>
                  <div className="z-20 rounded-full flex items-center justify-center">
                    <SVG
                      src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/list-view-focus.svg`}
                      width={24}
                      height="auto"
                      title="list-view"
                      className="stroke-2"
                    />
                  </div>
                  <div className="z-20 flex items-center justify-center opacity-[.2]">
                    <SVG
                      src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/expanded-view.svg`}
                      width={24}
                      height="auto"
                      title="expanded-view"
                      className=""
                    />
                  </div>
                  <div className="z-20 flex items-center justify-center opacity-[.2]">
                    <SVG
                      src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/Map view.svg`}
                      width={24}
                      height="auto"
                      title="map-view"
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
                const url = `${process.env.NEXT_PUBLIC_GCP_URL}/${username}_${slugify(
                  city
                )}_${listSlug}_${slugify(spot.name)}-${"00"}.jpg`;
                return (
                  <Spot
                    key={spot.name}
                    title={spot.name}
                    description={spot.description}
                    // if spot has ratings, pass in ratings
                    ratings={spot.ratings && spot.ratings}
                    type={spot.type}
                    image={url}
                  />
                );
              })}
            </div>
            <div className="grid grid-cols-2">
              <div className=""></div>
              <div className="justify-self-end">
                <div
                  onClick={copyToClipboard}
                  className="bg-black group hover:bg-[--neon] hover:text-black cursor-pointer flex flex-row font-sans rounded-[1rem] text-[.875rem] px-[.75rem] py-[.5rem] text-white"
                >
                  <SVG
                    src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/bookmark.svg`}
                    width={24}
                    className="stroke-white group-hover:stroke-black"
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

const Spot = ({ title, description, type, image, ratings }) => {
  return (
    <div className="relative flex w-full flex-row min-h-[80px]">
      <div
        className="w-[24%] md:w-[17%] lg:w-[15%] min-w-max aspect-square h-full bg-cover bg-center overflow-hidden rounded-[0.5rem] md:rounded-[0.625rem]"
        style={{
          backgroundImage: `url(${image}), url('http://placehold.it/300x300')`,
        }}
      >
        {/* <img src={image} className="w-full"/> */}
      </div>
      <div className="grid grid-cols-4 w-full">
        {/* info left */}
        <div className="h-auto col-span-3  pl-[.69rem] flex flex-col gap-[.32rem] lg:gap-[.6rem]">
          <div className="font-[Radio] line-clamp-1 text-[1.5rem] xl:text-[1.75rem] tracking-[-0.04em] leading-[100%]">
            {title}
          </div>
          <div className="w-full text-[1rem] text-ellipsis md:flex text-gray-500 tracking-[-0.02em] leading-[112%]">
            <div className="hidden md:line-clamp-2">{description}</div>
          </div>

          <div className="flex md:hidden">
            <Ratings rating={ratings} />
          </div>

          <div className="flex flex-row items-center gap-x-1">
            <div className="hidden md:flex leading-100">
              <Ratings rating={ratings} />
            </div>
            <div className="w-max max-w-[270px] line-clamp-1 px-[8px] mt-[.13rem] py-[2px] text-[0.875rem] rounded-[8px] bg-gray-300 tracking-[-0.02em] leading-[150%]">
              {type && type}
            </div>
          </div>
        </div>
        {/* icon right */}
        <div className="flex items-center content-center justify-self-end">
          <div className="rounded-full bg-black w-[36px] h-[36px] flex items-center justify-center">
            <SVG
              src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/Map view.svg`}
              width={30}
              height="auto"
              title="Share"
              className="fill-none stroke-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Ratings = ({ rating }) => {
  return (
    <div className="flex leading-120 text-base text-gray-500">
      {rating}
      <SVG
        src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/star.svg`}
        width={15}
        height="auto"
        title="Star Ratings"
        className="fill-[--bubble] pb-.75 mx-1"
      />
    </div>
  );
};
