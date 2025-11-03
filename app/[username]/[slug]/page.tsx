// app/[username]/[slug]/page.js
import { client } from "../../../sanity/lib/client";
import Error from "@/components/Error";
import PlaylistHero from "@/components/PlaylistHero";
import SpotList from "@/components/SpotList";
import SimilarPlaylistsCarousel from "@/components/SimilarPlaylistsCarousel";

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

export const revalidate = 3600; // 1 hour

export default async function Playlist({ params }) {
  const { username, slug } = await params;
  const playlist = await client.fetch(query, { username, slug });

  if (!playlist) {
    return <Error message="Oops! This list could not be found." />;
  }

  const contentJSON = JSON.parse(playlist.content);
  console.log("Playlist content:", contentJSON);

  return (
    <div className="container-lg !p-2">
      {/* Wrapper for sticky behavior */}
      <div className="md:grid md:grid-cols-2 gap-[clamp(0rem,_0.5vw,_0.75rem)]">
        {/* Left column - sticky */}
        <PlaylistHero playlist={playlist} />

        {/* Right column */}
        <div className="px-2 md:px-3 py-4">
          {playlist.description && (
            <p className="mb-5">{playlist.description}</p>
          )}

          <p className="mb-7">{contentJSON.length} spots *</p>

          <SpotList spotsJSON={contentJSON} />

          <SimilarPlaylistsCarousel />
        </div>
      </div>
    </div>
  );
}
