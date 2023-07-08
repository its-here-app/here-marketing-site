// google sheets api request
import { google } from "googleapis";

export default async function handler(req, res) {
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const range = `Sheet1!A2:G40`;
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

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

  res.status(200).json({
    lists
  });
}