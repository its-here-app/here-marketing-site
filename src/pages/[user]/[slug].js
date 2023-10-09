import { google } from "googleapis";
import { useRouter } from "next/router";
import Head from "next/head";
import slugify from "@sindresorhus/slugify";
import { Footer } from "../../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Toast } from "../../components/Toast";
import SVG from "react-inlinesvg";
import { Share } from "/public/icons/Share.svg";
import { useEffect, useState } from "react";
import router from "next/router";
import Image from "next/image";
import moment from "moment";
import classNames from "classnames";

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
  const range = `Sheet1!A$2:I$40`;
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
    dateAdded: row[7],
    content: row[8],
  }));

  // const list = lists.find((list) => list.slug === slug);

  // get id of list with matching slug
  const listId = lists.findIndex((list) => list.slug === slug);

  const [
    city,
    playlistName,
    isFeatured,
    listSlug,
    username,
    instagram,
    description,
    dateAdded,
    content,
  ] = response.data.values[listId];

  return {
    props: {
      city,
      playlistName,
      isFeatured,
      listSlug,
      username,
      instagram,
      description,
      dateAdded,
      content,
    },
  };
}

export default function ListPage({
  city,
  playlistName,
  listSlug,
  username,
  instagram,
  description,
  dateAdded,
  content,
}) {
  const parsedContent = JSON.parse(content);

  const [showShareDropdown, setShowShareDropdown] = useState(false);
  const [showClipboardToast, setShowClipboardToast] = useState(false);
  const [showToggleToast, setShowToggleToast] = useState(false);

  const handleToggleClick = () => {
    setShowToggleToast(true);
    setTimeout(() => {
      setShowToggleToast(false);
    }, 2000);
  };
  const copyLinkUrl = () => {
    navigator.clipboard.writeText(`https://itshere.app/${username}/${listSlug}`);
    setShowShareDropdown(false);
  };
  const copyToClipboard = () => {
    setShowClipboardToast(true);
    setTimeout(() => {
      setShowClipboardToast(false);
    }, 2000);
    const el = document.createElement("textarea");
    let content = "";

    content += `${city} — ${playlistName} @ ${username}\n`;
    content += parsedContent
      .map((spot) => `*${spot.name}, ${spot.description} (${spot.type})`)
      .join("\n");
    content += `\n\nhttps://itshere.app/${username}/${listSlug}\n`;
    el.value = content;
    document.body.appendChild(el);
    el.style.position = "absolute";
    el.style.left = "-9999px";
    el.style.opacity = "0";
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setShowShareDropdown(false);
  };

  useEffect(() => {}, []);

  const handleClose = () => {
    router.push("/", undefined, { shallow: true });
  };

  const getTimeElapsed = () => {
    return moment.utc(`${dateAdded} 00:00:00`).local().startOf("seconds").fromNow();
  };

  return (
    <>
      <Head>
        <title>
          {city} — {playlistName} @{username} • Here*
        </title>
      </Head>
      <AnimatePresence>
        {showShareDropdown && (
         
            <div className="md:hidden bg-black fixed w-full h-[300px] bottom-0 z-30 rounded-t-[2rem] flex items-center justify-center flex-col">
              <div className="w-[80%]">
                <h3 className="font-[Radio] text-white text-[2rem] pb-3">Share City playlist</h3>
                <ShareButton icon="link" text="Get Link" onClick={copyLinkUrl}></ShareButton>
                <ShareButton
                  icon="copy"
                  text="Copy list as text"
                  onClick={copyToClipboard}
                ></ShareButton>
                <ShareButton
                  icon=""
                  text="Cancel"
                  onClick={() => setShowShareDropdown(!showShareDropdown)}
                  cancel
                ></ShareButton>
              </div>
            </div>
        )}
      </AnimatePresence>
      <div className="max-w-[1800px] mx-auto relative">
        <div className="flex flex-col md:grid grid-cols-2 min-h-[100vh] h-full">
          <section className="h-full relative m-0 flex flex-col w-full">
            <div className="h-[60vh] md:h-[100vh] w-full md:sticky top-0">
              <div className="h-[97%] left-0 mx-[.5rem] my-[.5rem] relative overflow-hidden rounded-[1rem] md:max-w-[50vw] bg-center bg-cover flex flex-col justify-between  font-[Golos] text-[--neon]">
                <div
                  className="w-full h-full absolute z-[-1]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 54.95%, rgba(0, 0, 0, 0.00) 100%)",
                    mixBlendMode: "soft-light",
                  }}
                ></div>
                <div
                  className="w-full h-full absolute z-[-2] bg-center bg-cover flex"
                  style={{
                    backgroundImage: `url('${process.env.NEXT_PUBLIC_GCP_URL}/${username}_${slugify(
                      city
                    )}_${listSlug}_cover.jpg')`,
                  }}
                ></div>

                {/* add a sticky element */}
                <div className="w-full h-full flex justify-between items-start px-[1.25rem] py-[1.25rem]">
                  {/* x container */}
                  <div
                    onClick={handleClose}
                    className="cursor-pointer flex flex-row gap-[0.6875rem] items-center justify-center"
                  >
                    <SVG
                      src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/Close_focus.svg`}
                      width={24}
                      height={24}
                      title="Close"
                      className="fill-[--neon]"
                    />
                  </div>
                  {/* share dropdown */}
                  <div
                    className="cursor-pointer relative flex flex-row gap-[0.6875rem] items-center justify-center"
                    onClick={() => setShowShareDropdown(!showShareDropdown)}
                  >
                    <SVG
                      src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/Share_focus.svg`}
                      width={24}
                      height={24}
                      title="Share"
                      className="cursor-pointer absolute top-0 right-0 fill-[--neon]"
                    />
                    <AnimatePresence>
                      {showShareDropdown && (
                        <div className="max-md:hidden">
                          <motion.div
                            // fade from bottom
                            initial={{ opacity: 0, y: 0 }}
                            animate={{ opacity: 1, y: 10 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 1.3, ease: [0.23, 1, 0.32, 1] }}
                          >
                            <div className="bg-black rounded-[16px] py-1 pt-4 px-4 absolute top-[20px] right-[0px] min-w-[120px] min-h-[100px] text-white">
                              <div className="w-[220px]">
                                <h3> Share city playlist </h3>
                                <ShareButton
                                  icon="link"
                                  text="Get Link"
                                  onClick={copyLinkUrl}
                                ></ShareButton>
                                <ShareButton
                                  icon="copy2"
                                  text="Copy link as Text"
                                  onClick={copyToClipboard}
                                ></ShareButton>
                              </div>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                <div className="h-full flex items-center justify-center flex-col">
                  <div className="max-w-[80%] font-serif italic text-[2.125rem] lg:text-[3rem] font-[400] leading-[106%] lg:leading-normal tracking-[-0.06em] ">
                    {city}
                  </div>
                  <div className="max-w-[80%] list-playlist-name">{playlistName}</div>
                </div>
                <div className="w-full h-full flex justify-between items-end px-[1.25rem] py-[1.25rem]">
                  <div className="flex flex-row gap-[0.6875rem] items-center justify-center">
                    <a href={`https://instagram.com/${instagram}`} className="flex flex-row ">
                      <div
                        className="w-[1.25rem] md:w-[1.75rem] mr-2 md:h-[1.75rem] h-[1.25rem] bg-cover rounded-full"
                        style={{
                          backgroundImage: `url('${process.env.NEXT_PUBLIC_GCP_URL}/_profile-pics/${username}.jpg')`,
                        }}
                      ></div>
                      <div className="text-[0.75rem] md:text-[0.875rem] md:pt-[.175rem]">
                        {username}
                      </div>
                    </a>
                  </div>
                  <div className="text-[0.75rem] md:text-[0.875rem]">
                    Last updated {getTimeElapsed()}
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* right side */}
          <section className="flex gap-[1rem] pt-[0.5rem] top-0 w-full px-[.75rem] flex-col">
            <div className="grid grid-cols-2">
              {/*  */}
              <div className="justify-self-start flex gap-[8px] items-center text-[1rem] lg:text-[1.125rem]">
                {parsedContent.length} spots{" "}
                <div className="relative pt-[0.5rem] text-[1.6rem]">*</div>
              </div>
              {/* icon bubbles */}
              <div className="justify-self-end">
                {/* a sliding toggle switch */}

                <Toast
                  message="Oops, custom views aren't ready yet 😳"
                  down={true}
                  showToast={showToggleToast}
                />
                <div
                  className="relative grid cursor-pointer grid-cols-3 gap-[.5rem] bg-[#DFDFDF] w-[124px] px-[8px] h-[40px] rounded-full overflow-hidden"
                  onClick={handleToggleClick}
                >
                  <div className="z-10 absolute bg-[--neon] w-[44px] h-full rounded-full"></div>
                  <div className="z-20 rounded-full flex items-center justify-center">
                    <SVG
                      src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/list-view-focus.svg`}
                      width={24}
                      height={24}
                      title="list-view"
                      className="stroke-2"
                    />
                  </div>
                  <div className="z-20 flex items-center justify-center opacity-[.2]">
                    <SVG
                      src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/expanded-view.svg`}
                      width={24}
                      height={24}
                      title="expanded-view"
                      className=""
                    />
                  </div>
                  <a href="" className="z-20 flex items-center justify-center opacity-[.2]">
                    <SVG
                      src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/Map.svg`}
                      width={24}
                      height={24}
                      title="map-view"
                      className="fill-gray-400"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full text-[.875rem] lg:text-[1.125rem] md:pr-[1.2rem] ">
              {description}
            </div>
            <div className="flex flex-col w-full h-auto gap-[1rem] pt-[1rem] font-sans">
              {parsedContent.map((spot, i) => {
                const url = `${process.env.NEXT_PUBLIC_GCP_URL}/${username}_${slugify(
                  city
                )}_${listSlug}_${slugify(spot.name)}.jpg`;

                return (
                  <Spot
                    key={spot.name}
                    title={spot.name}
                    description={spot.description}
                    ratings={spot.ratings && spot.ratings}
                    type={spot.type}
                    googleMapsUrl={spot.googleMapsUrl}
                    image={url}
                  />
                );
              })}
            </div>
            <div className="grid grid-cols-2">
              <div className=""></div>
              <div className="justify-self-end">
                <Toast message="Copied to clipboard" showToast={showClipboardToast} />
                <div
                  onClick={copyToClipboard}
                  className="mb-12 bg-black group transition-all duration-[800ms] hover:bg-[--neon] hover:text-black cursor-pointer flex flex-row font-sans rounded-[1rem] text-[.875rem] px-[.75rem] py-[.5rem] text-white"
                >
                  <SVG
                    src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/copy.svg`}
                    width={24}
                    className="stroke-white group-hover:stroke-black"
                    height={24}
                    title="Copy List"
                  />{" "}
                  Copy List
                </div>
              </div>
            </div>
            <div className="flex flex-col h-[50px] w-full items-center  justify-center"></div>
          </section>
        </div>
      </div>
      <section
        data-cursor-state="invert"
        className="overflow-hidden bg-[--black] relative h-[80vh] md:h-[450px]  w-full flex flex-col justify-between items-top"
      >
        <Footer isHomepage={false} />
      </section>
    </>
  );
}

const ShareButton = ({ text, onClick, icon, cancel = false }) => {
  return (
    <div
      onClick={onClick}
      className={classNames(
        "w-full cursor-pointer text-[14px] py-3 group min-h-[30px] border-solid border-[--neon] text-[--neon] border-[1px] my-3 rounded-full",
        {
          "border-white text-white": cancel,
          " hover:bg-[--neon] hover:text-black": !cancel,
        }
      )}
    >
      <div className="mx-6 relative flex content-center">
        <div className="w-[18px] h-full absolute left-0 top-[2px]">
          <SVG
            src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/${icon}.svg`}
            width={18}
            height={18}
            title="Close"
            className="fill-[--neon] group-hover:fill-black w-full"
          />
        </div>
        <div className="w-full flex content-center justify-center">{text}</div>
      </div>
    </div>
  );
};

const Spot = ({ title, description, type, image, ratings, googleMapsUrl }) => {
  const mapsUrl = `https://www.google.com/maps/place/?q=place_id:${googleMapsUrl}`;

  return (
    <div className="relative flex w-full flex-row  min-h-[80px]">
      <div className="flex-shrink-0 min-w-[5.5rem] w-[24%] md:w-[17%] lg:w-[15%] aspect-square">
        <div
          className="aspect-square bg-gray-300 bg-cover bg-center my-auto overflow-hidden rounded-[0.5rem] md:rounded-[0.625rem]"
          style={{
            backgroundImage: `url(${image}), url('/graphics/placeholder.jpg')`,
          }}
        ></div>
      </div>
      <div className="flex-grow-0 w-full grid grid-cols-6 lg:grid-cols-4">
        {/* info left */}
        <div className="h-auto col-span-5 lg:col-span-3 pl-[.69rem] flex flex-col gap-[.32rem] lg:gap-[.6rem]">
          <div className="font-[Radio] line-clamp-1 text-[1.5rem] xl:text-[1.75rem] tracking-[-0.04em] leading-[100%]">
            {title}
          </div>
          {description && (
            <div className="w-full col-span-5 lg:col-span-3 text-[1rem] text-ellipsis text-gray-500 tracking-[-0.02em] leading-[112%]">
              <div className="hidden md:line-clamp-2">{description}</div>
            </div>
          )}
          {ratings && (
            <div className="flex md:hidden">
              <Ratings rating={ratings} />
            </div>
          )}

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
        {/* {googleMapsUrl} */}
        <a href={`${mapsUrl}`}
          onClick={() => {
            window.open(
              `https://www.google.com/maps/place/?q=place_id:${googleMapsUrl}`,
              "_blank"
            );
          }}
         className="flex items-center content-center justify-self-end">
          <div className="group hover:bg-[--neon] cursor-ne-resize rounded-full bg-black w-[36px] h-[36px] flex items-center justify-center">
            <SVG
              src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/Map.svg`}
              width={30}
              height={30}
              title="See Google Map"
              className="group-hover:fill-black fill-white"
            />
          </div>
        </a>
      </div>
    </div>
  );
};

const Ratings = ({ rating }) => {
  // add single decimal place to rating
  const ratingWithDecimal = rating.toFixed(1);
  return (
    <div className="flex leading-120 text-base text-gray-500">
      {ratingWithDecimal}
      <SVG
        src={`${process.env.NEXT_PUBLIC_LOCALHOST_URL}/icons/star.svg`}
        width={15}
        height={15}
        title="Star Ratings"
        className="fill-[--bubble] pb-.75 mx-1"
      />
    </div>
  );
};
