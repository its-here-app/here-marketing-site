export const metadata = {
  title: "Utility",
  alternates: {
    canonical: "/utility",
  },
  robots: {
    index: false,
    follow: false,
  },
};

import UtilityClient from "./UtilityClient";

export default function UtilityPage() {
  return <UtilityClient />;
}
