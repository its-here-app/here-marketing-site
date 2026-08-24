import PrivacyClient from "./PrivacyClient";
import { getPrivacyPage } from "@/utils/PrivacyPageUtils";

export const metadata = {
  title: "Privacy • Here*",
  alternates: {
    canonical: "/privacy",
  },
};

export default async function Privacy() {
  const privacyPage = await getPrivacyPage();
  return <PrivacyClient privacyPage={privacyPage} />;
}
