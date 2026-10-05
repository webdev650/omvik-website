import { Metadata } from "next";
import BlogListingClient from "@/app/blog/BlogListingClient";

export const metadata: Metadata = {
  title: "Blog & Real Estate Insights | Ground Report | OMVIK Realcon",
  description:
    "Explore expert property guides, locality analysis, and market trends for Bhubaneswar real estate in OMVIK Ground Report.",
  keywords: [
    "Bhubaneswar real estate blog",
    "property in Bhubaneswar",
    "Bhubaneswar locality guide",
    "OMVIK Realcon blog",
    "Ground Report",
  ],
};

export default function GroundReportBlogsPage() {
  return <BlogListingClient />;
}
