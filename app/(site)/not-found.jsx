import "./globals.css";
import Error from "@/components/Error";

export const metadata = {
  title: "Page not found • Here*",
  description: "The page you are looking for can’t be found.",
};

export default function NotFound() {
  return <Error />;
}
