// app/[username]/[slug]/page.jsx

import { notFound } from "next/navigation";

import PlaylistHero from "@/components/PlaylistHero";
import SpotList from "@/components/SpotList";
import SimilarPlaylistsCarousel from "@/components/SimilarPlaylistsCarousel";
import { getPlaylist } from "@/utils/PlaylistUtils";
import SmoothScroll from "@/components/motion/SmoothScroll";

export const revalidate = 3600; // 1 hour

/**
 * Generate playlist page metadata
 * @param params - username/slug
 * @returns
 */
export async function generateMetadata({ params }) {
  const { username, slug } = await params;
  const playlist = await getPlaylist(username, slug);

  if (!playlist) notFound();

  return {
    title: `${playlist.city} — ${playlist.playlistName} @${username} • Here*`,
    description:
      playlist.description || `For the spots you love & the places you’ll go.`,
  };
}

/**
 * Playlist page
 * @param params - username/slug
 * @returns playlist page
 */
export default async function Playlist({ params }) {
  const { username, slug } = await params;
  const playlist = await getPlaylist(username, slug);

  if (!playlist) {
    notFound();
  }

  const contentJSON = JSON.parse(playlist.content);
  console.log("Playlist content:", contentJSON);

  return (
    <>
      <SmoothScroll enabled={false} />

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

            <SimilarPlaylistsCarousel currentPlaylist={playlist} />
          </div>
        </div>
      </div>
    </>
  );
}
