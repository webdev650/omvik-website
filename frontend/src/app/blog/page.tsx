import { Metadata } from "next";
import BlogListingClient from "./BlogListingClient";

export const metadata: Metadata = {
  title: "Blog & Real Estate Insights | OMVIK Realcon Bhubaneswar",
  description:
    "Explore the latest real estate trends, locality guides, commercial insights, and company news from OMVIK Realcon in Bhubaneswar, Odisha.",
  keywords: [
    "Bhubaneswar real estate blog",
    "property in Bhubaneswar",
    "Bhubaneswar locality guide",
    "OMVIK Realcon blog",
    "plots in Bhubaneswar",
  ],
  openGraph: {
    title: "Blog & Real Estate Insights | OMVIK Realcon",
    description:
      "Expert property buying guides, market trends, and locality analysis for Bhubaneswar real estate.",
    url: "https://www.omvikrealcon.com/blog",
    siteName: "OMVIK Realcon",
    locale: "en_IN",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogListingClient />;
}
