export const metadata = {
  title: "Studio",
  robots: "noindex",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function StudioLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
