"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Navbar from "@/components/Navbar";

function highlightJSON(json) {
  return (
    json
      // keys
      .replace(
        /("(?:\\.|[^"\\])*")(?=\s*:)/g,
        '<span class="text-purple-600">$1</span>'
      )
      // string values
      .replace(/: "([^"]*)"/g, ': <span class="text-emerald-700">"$1"</span>')
      // numbers
      .replace(/: (\d+(\.\d+)?)/g, ': <span class="text-blue-600">$1</span>')
      // booleans
      .replace(/: (true|false)/g, ': <span class="text-indigo-600">$1</span>')
      // null
      .replace(/: null/g, ': <span class="text-gray-500">null</span>')
  );
}

export default function UtilityClient() {
  const [form, setForm] = useState({
    name: "Maru Coffee",
    description: "Aesthetic boutique Asian coffee shop.",
    type: "Coffee Shop",
    ratings: 4.7,
    googleMapsUrl: "ChIJb43hJLDAwoARh1TGU9s5VNc",
    imgUrl:
      "https://storage.googleapis.com/here-marketing/juliettewang_los-angeles_la-must-go-spots_maru-coffee.jpg",
  });

  const [copied, setCopied] = useState(false);

  const updateField = (key, value) => {
    setCopied(false);
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const jsonOutput = JSON.stringify(form, null, 2);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
  };

  return (
    <>
      <Navbar showCTA={false} />
      <div className="container pt-16 pb-32">
        <h1 className="text-radio-4 mb-12">Spot object generator</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* LEFT COLUMN */}
          <div className="space-y-8">
            <Field
              label="Name"
              description="As seen on Google Maps"
              placeholder="Maru Coffee"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
            />

            <Field
              label="Description (Optional)"
              description="User's personal note for the spot"
              placeholder="Aesthetic boutique Asian coffee shop."
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
            />

            <Field
              label="Type"
              description="As seen on Google Maps"
              placeholder="Coffee Shop"
              value={form.type}
              onChange={(e) => updateField("type", e.target.value)}
            />

            <Field
              label="Ratings"
              description="As seen on Google Maps"
              type="number"
              placeholder="4.7"
              value={form.ratings}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                updateField("ratings", isNaN(value) ? 0 : value);
              }}
            />

            <Field
              label="Google Maps Place ID"
              description={
                <>
                  Find using the{" "}
                  <a
                    href="https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Google Place ID Finder
                  </a>
                </>
              }
              type="url"
              placeholder="ChIJb43hJLDAwoARh1TGU9s5VNc"
              value={form.googleMapsUrl}
              onChange={(e) => updateField("googleMapsUrl", e.target.value)}
            />

            <Field
              label="Image URL"
              description={
                <>
                  Store image in{" "}
                  <a
                    href="https://console.cloud.google.com/storage/browser/here-marketing?authuser=0&project=lucid-arc-390822"
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    Google Cloud Storage
                  </a>{" "}
                  and paste the public URL here
                </>
              }
              placeholder="https://storage.googleapis.com/…"
              value={form.imgUrl}
              onChange={(e) => updateField("imgUrl", e.target.value)}
            />
          </div>

          {/* RIGHT COLUMN */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2>Generated JSON</h2>
              <Button onClick={copyToClipboard}>
                {copied ? "Copied ✓" : "Copy"}
              </Button>
            </div>

            <pre
              className="bg-black/4 p-4 rounded text-sm overflow-auto whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: highlightJSON(jsonOutput) }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function Field({
  label,
  description,
  placeholder,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div className="space-y-1">
      <label className="block">{label}</label>
      <div className="text-sm text-gray-500 mb-2">{description}</div>
      <input
        type={type}
        className="w-full border rounded px-3 py-2"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
