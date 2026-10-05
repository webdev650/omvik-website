import { Metadata } from "next";
import NewsListingClient from "@/app/news/NewsListingClient";

export const metadata: Metadata = {
  title: "News & Press Releases | Ground Report | OMVIK Realcon",
  description:
    "Stay updated with the latest company news, project announcements, press releases, and real estate developments from OMVIK Realcon in Bhubaneswar.",
  keywords: [
    "OMVIK Realcon news",
    "Bhubaneswar real estate news",
    "OMVIK press releases",
    "property developments Bhubaneswar",
  ],
  openGraph: {
    title: "News & Press Releases | OMVIK Realcon",
    description:
      "Latest company updates, property announcements, and real estate developments from OMVIK Realcon.",
    url: "https://www.omvikrealcon.com/news",
    siteName: "OMVIK Realcon",
    locale: "en_IN",
    type: "website",
  },
};

export default function NewsPage() {
  return <NewsListingClient />;
}
