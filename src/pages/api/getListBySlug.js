// google sheets api request
// vercel
// https://stackoverflow.com/questions/64073209/how-do-i-add-google-application-credentials-secret-to-vercel-deployment
import { google } from "googleapis";

export default async function handler(req, res) {
  const { query } = req;

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


  const { slug, user } = query;

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

  // get id of list with matching user and slug
  const listId = lists.findIndex((list) => list.username === user && list.slug === slug);

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

  const listTitle = `${city} — ${playlistName} @${username} • Here*`;

  res.status(200).json({
      city,
      playlistName,
      isFeatured,
      listSlug,
      username,
      instagram,
      description,
      dateAdded,
      content,
      listTitle
  });
}