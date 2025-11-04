import { client } from "../sanity/lib/client";

/**
 * Fisher-Yates shuffle function
 * @param array - array to shuffle
 * @returns shuffled aray
 */
export function shuffleArray(array) {
  const shuffled = [...array]; // copy to avoid mutating original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get all playlists
 * @returns shuffled array of all playlists
 */
export async function getAllPlaylists() {
  const query = `*[_type == "playlist"]{
        _id,
        playlistName,
        city,
        slug,
        username,
        description,
        dateAdded,
        cover{ asset->{url} }
      }`;

  let playlists = await client.fetch(query);
  return shuffleArray(playlists);
}

/**
 * Get more random playlists
 * @returns shuffled array of 6 playlists that are not the current playlist
 */
export async function getMorePlaylists(currentPlaylist) {
  if (!currentPlaylist) return [];

  const { _id } = currentPlaylist;

  const query = `*[_type == "playlist" && _id != $id]{
        _id,
        playlistName,
        city,
        slug,
        username,
        description,
        dateAdded,
        cover{ asset->{url} }
      }`;

  // Construct parameters for query
  const params = {
    id: _id,
  };

  let playlists = await client.fetch(query, params);

  // Shuffle and limit to 6
  playlists = shuffleArray(playlists);
  return playlists.slice(0, 6);
}

/**
 * Get similar playlists based on city, username, and title keywords
 * @param currentPlaylist - playlist to find similarities for
 * @returns shuffled array of similar playlists
 */
export async function getSimilarPlaylists(currentPlaylist) {
  if (!currentPlaylist) return [];

  const STOP_WORDS = [
    "the",
    "a",
    "an",
    "and",
    "of",
    "in",
    "on",
    "at",
    "to",
    "from",
    "by",
    "with",
    "for",
    "as",
    "is",
    "it",
    "this",
    "that",
    "these",
    "those",
    "my",
    "your",
    "our",
    "their",
    "his",
    "her",
    "its",
    "playlist",
    "mix",
    "best",
    "spots",
  ];

  const { _id, city, username, playlistName } = currentPlaylist;

  // Extract title words and filter out common words
  const titleWords = playlistName
    ?.toLowerCase()
    .split(/\s+/)
    .filter((word) => !STOP_WORDS.includes(word) && word.length > 2)
    .slice(0, 4); // limit to top few words for efficiency

  // Build GROQ match conditions dynamically
  const titleConditions = titleWords
    .map((_, i) => `playlistName match $word${i}`)
    .join(" || ");

  // Final GROQ query
  const query = `*[_type == "playlist" && _id != $id && (
    city == $city || username == $username${titleConditions ? " || " + titleConditions : ""}
  )]{
    _id,
    playlistName,
    city,
    slug,
    username,
    description,
    dateAdded,
    cover{ asset->{url} }
  }`;

  // Construct parameters for query
  const params = {
    id: _id,
    city,
    username,
    ...Object.fromEntries(
      titleWords.map((word, i) => [`word${i}`, word + "*"])
    ), // wildcard match
  };

  let playlists = await client.fetch(query, params);
  playlists = shuffleArray(playlists);

  // Limit to 6
  return playlists.slice(0, 6);
}
