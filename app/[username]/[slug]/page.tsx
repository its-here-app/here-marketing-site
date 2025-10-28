// app/[username]/[slug]/page.js
import { client } from "../../../sanity/lib/client";
import Error from "@/components/Error";
import SpotList from "@/components/SpotList";

/** Given a date, returns how long ago that date was in weeks or years
 * @dateString - the date as a string (e.g. "2023-05-12")
 * @returns a string
 */
function timeAgo(dateString) {
  const givenDate = new Date(dateString);
  const now = new Date();

  const msInWeek = 1000 * 60 * 60 * 24 * 7;
  const msInYear = 1000 * 60 * 60 * 24 * 365;

  const diffMs = now - givenDate;

  const yearsAgo = Math.floor(diffMs / msInYear);
  if (yearsAgo >= 1) {
    return yearsAgo === 1 ? "1 year ago" : `${yearsAgo} years ago`;
  }

  const weeksAgo = Math.floor(diffMs / msInWeek);
  return weeksAgo === 1 ? "1 week ago" : `${weeksAgo} weeks ago`;
}

export default async function Playlist({ params }) {
  const { username, slug } = await params;

  console.log("Fetching playlist for:", username, slug);

  // const query = `*[_type == "playlist" && username == $username && slug.current == $slug][0]`;
  const query = `*[_type == "playlist" && username == $username && slug.current == $slug][0]{
        _id,
        playlistName,
        city,
        slug,
        username,
        description,
        dateAdded,
        content,
        cover{ asset->{url} }
      }`;
  const playlist = await client.fetch(query, { username, slug });

  const contentJSON = JSON.parse(playlist.content);

  console.log(contentJSON);

  if (!playlist) {
    return <Error message="Oops! This list could not be found." />;
  }

  return (
    <div className="container-lg !p-2">
      {/* Wrapper for sticky behavior */}

      <div className="grid md:grid-cols-2 gap-[clamp(0rem,_0.5vw,_0.75rem)]">
        {/* Left Column - Sticky */}
        <div className="relative">
          <div
            className="sticky top-2 bg-cover bg-center rounded-2xl h-[28rem] md:h-[calc(100vh_-_1rem)] text-neon flex flex-col justify-center items-center text-center p-[10%]"
            style={{ backgroundImage: `url(${playlist.cover.asset.url})` }}
          >
            <h3 className="text-crimson-1">{playlist.city}</h3>
            <h4 className="text-golos-1">{playlist.playlistName}</h4>
            <div className="text-body-sm absolute transition-all duration-400 bottom-[1rem] md:bottom-[1.4rem] px-[1.2rem] md:px-[1.5rem] flex justify-between w-full">
              <div>{playlist.username}</div>
              <div>Last updated {timeAgo(playlist.dateAdded)}</div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="px-1 md:px-3 py-4">
          {playlist.description && (
            <p className="mb-5">{playlist.description}</p>
          )}

          <p className="mb-7">{contentJSON.length} spots *</p>
          <div>
            <SpotList spotsJSON={contentJSON} />
          </div>
        </div>
      </div>
    </div>
  );
}
