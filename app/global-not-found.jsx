// Import global styles and fonts
import "./globals.css";
import RootLayout from "./layout";
import Navbar from "@/components/Navbar";
import Error from "@/components/Error";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <RootLayout>
      <Error />
    </RootLayout>
  );
}
