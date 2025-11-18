// app/api/subscribe/route.js
import { NextResponse } from "next/server";

const API_KEY = process.env.MAILCHIMP_API_KEY;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID; // aka "List ID"
const DATACENTER = API_KEY.split("-")[1]; // e.g. us21

export async function POST(request) {
  try {
    const { email } = await request.json();

    const response = await fetch(
      `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${Buffer.from(`anystring:${API_KEY}`).toString("base64")}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
        }),
      }
    );

    const data = await response.json();

    if (data.title === "Member Exists") {
      return NextResponse.json({
        success: false,
        custom: "You're already subscribed!",
      });
    }

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
