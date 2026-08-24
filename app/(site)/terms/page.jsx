import TermsClient from "./TermsClient";
import { getTermsPage } from "@/utils/TermsPageUtils";

export const metadata = {
  title: "Terms • Here*",
  alternates: {
    canonical: "/terms",
  },
};

export default async function Terms() {
  const termsPage = await getTermsPage();
  return <TermsClient termsPage={termsPage} />;
}
