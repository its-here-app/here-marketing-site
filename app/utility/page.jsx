export const metadata = {
  title: "Utility",
  robots: {
    index: false,
    follow: false,
  },
};

import UtilityClient from "./UtilityClient";

export default function UtilityPage() {
  return (
    <div className="container py-16">
      <h1 className="text-radio-4 mb-12">Spot object generator</h1>

      <UtilityClient />
    </div>
  );
}
