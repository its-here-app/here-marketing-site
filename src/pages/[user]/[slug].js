import { google } from "googleapis";
import { useRouter } from "next/router";
import slugify from "@sindresorhus/slugify";
import { Spot } from "../../components/Spot";

export async function getServerSideProps({ query }) {
  const auth = await google.auth.getClient({
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

  return (
    <div className="relative flex flex-col bg-white md:grid grid-cols-2 px-[.5rem] py-[.5rem] min-h-[100vh]">
      {/* left */}
      <section className="relative h-full">
        <div
          className="sticky top-0 font-[Golos] text-[--neon] h-[50vh] md:h-[calc(100vh-2rem)] bg-center bg-cover w-full rounded-[1rem] flex justify-between flex-col"
          style={{
            backgroundImage: `url('https://its-here-app.s3.amazonaws.com/${username}/${listSlug}/cover_${"00"}.webp')`,
          }}
        >
          <div className="w-full h-full"></div>
          <div className="w-full flex items-center justify-center flex-col">
            <div className="font-[Crimson] text-[34px] font-[400] leading-[106%] tracking-[-0.06em]">
              {city}
            </div>
            <div className="text-[40px] text-center px-[3rem] leading-[106%] font-[600] tracking-[-0.06em]">
              {playlistName}
            </div>
          </div>
          <div className="w-full h-full flex justify-between items-end px-[1rem] py-[1rem]">
            <div className="">{username}</div>
            <div className="">last updated 1 week ago</div>
          </div>
        </div>
      </section>
      {/* right side */}
      <section className="flex gap-[1rem] top-0 w-full px-[2rem] flex-col">
        <div className="grid grid-cols-2">
          {/*  */}
          <div className="justify-self-start text-base">{parsedContent.length} spots *</div>
          {/* icon bubbles */}
          <div className="justify-self-end">
            {/* a sliding toggle switch */}
            <div className="relative grid grid-cols-3 gap-[.5rem] bg-[#DFDFDF] w-[124px] px-[8px] h-[40px] rounded-full overflow-hidden">
              <div className="z-10 absolute bg-[--neon] w-[44px] h-full rounded-full"></div>
              <div className="z-20 rounded-full flex items-center justify-center">□</div>
              <div className="z-20 flex items-center justify-center">□</div>
              <div className="z-20 flex items-center justify-center">□</div>
            </div>
          </div>
        </div>
        <div className="w-full text-[20px] lg:pr-[5rem] ">{description}</div>
        <div className="flex flex-col w-full h-auto gap-[1rem] pt-[1rem] font-[Golos]">
          {parsedContent.map((spot, i) => {
            const s3url = `https://its-here-app.s3.amazonaws.com/${username}/${listSlug}/${slugify(
              spot.name
            )}_${"00"}.webp`;
            return (
              <Spot
                key={spot.name}
                title={spot.name}
                description={spot.description}
                type={spot.type}
                image={s3url}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
