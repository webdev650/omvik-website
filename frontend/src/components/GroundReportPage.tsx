"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/utils/api";

interface Post {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  image: string;
  thumbnail?: string;
  category: string;
  createdAt: string;
}

const CATEGORIES = [
  { label: "All",            icon: "📋" },
  { label: "Residential",    icon: "🏠" },
  { label: "Commercial",     icon: "🏢" },
  { label: "Market Trends",  icon: "📈" },
  { label: "Company News",   icon: "📰" },
  { label: "Guides",         icon: "🗺️" },
];

const FALLBACK_IMG =
  "https://res.cloudinary.com/dtmqv7oqq/image/upload/v1782557955/TOWNSHIP_qf8nyk.jpg";

const LOCALITY_IMAGES = [
  { src: "/images/blog-hero-1.png", label: "North Bhubaneswar",   sublabel: "Modern Living & Connectivity" },
  { src: "/images/blog-hero-2.png", label: "Central Bhubaneswar", sublabel: "Established & Convenient" },
  { src: "/images/blog-hero-3.png", label: "Old Bhubaneswar",     sublabel: "Heritage & Community" },
  { src: "/images/blog-hero-4.png", label: "South Bhubaneswar",   sublabel: "Growing Corridors" },
];

export default function GroundReportPage({ type }: { type: "blog" | "news" }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const accent = type === "blog" ? "#E86A2C" : "#185FA5";

  // Fetch posts whenever category changes
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const params: any = { type };
        if (activeCategory !== "All") params.category = activeCategory;
        const res = await api.get("/posts", { params });
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching posts", err);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [type, activeCategory]);

  const getImage = (post: Post) => post.thumbnail || post.image || FALLBACK_IMG;

  const getExcerpt = (post: Post) => {
    if (post.excerpt) return post.excerpt;
    const plain = post.content.replace(/<[^>]+>/g, "").trim();
    return plain.length > 130 ? plain.slice(0, 130) + "…" : plain;
  };

  const handleCategory = (cat: string) => {
    setActiveCategory(cat);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB]">

      {/* ═══════════════════════════════════════════
          HERO — main cinematic image
      ═══════════════════════════════════════════ */}
      <div className="relative w-full h-[55vh] md:h-[68vh] overflow-hidden">
        <Image
          src="/images/blog-hero-main.png"
          alt="Ground Report – OMVIK Realcon"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
        <div className="absolute inset-0 flex flex-col justify-end pb-14 md:pb-20 px-6 md:px-16 lg:px-24">
          <p
            className="text-[10px] font-bold tracking-[0.5em] uppercase mb-3"
            style={{ color: accent }}
          >
            {type === "blog" ? "Ground Report · Blogs" : "Ground Report · News"}
          </p>
          <h1 className="text-4xl md:text-6xl font-clagio text-white leading-[1.05] mb-4 max-w-3xl">
            {type === "blog"
              ? "Insights on Bhubaneswar Real Estate"
              : "Latest Real Estate News"}
          </h1>
          <p className="text-white/60 text-sm md:text-base font-medium max-w-xl leading-relaxed">
            {type === "blog"
              ? "Expert guides, locality deep-dives and market perspectives — to help you make smarter property decisions."
              : "Stay updated with the latest happenings in the real estate market."}
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          4-IMAGE LOCALITY MOSAIC  (blog only)
      ═══════════════════════════════════════════ */}
      {type === "blog" && (
        <div className="grid grid-cols-2 md:grid-cols-4">
          {LOCALITY_IMAGES.map((img, i) => (
            <div
              key={i}
              className="relative h-44 md:h-52 overflow-hidden group cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-bold text-xs md:text-sm tracking-wide leading-tight">
                  {img.label}
                </p>
                <p className="text-white/55 text-[10px] tracking-wider mt-0.5 font-medium">
                  {img.sublabel}
                </p>
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                style={{ backgroundColor: "#E86A2C" }}
              />
            </div>
          ))}
        </div>
      )}

      {/* ═══════════════════════════════════════════
          CATEGORY TABS — sticky bar
          (only 5 categories, no "All")
      ═══════════════════════════════════════════ */}
      <div className="sticky top-[60px] z-40 bg-[#FDFCFB]/96 backdrop-blur-md border-b border-black/8 shadow-sm">
        <div className="container mx-auto px-4 md:px-12 max-w-7xl">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-3">
            {CATEGORIES.map(({ label, icon }) => {
              const active = activeCategory === label;
              return (
                <button
                  key={label}
                  onClick={() => handleCategory(label)}
                  className={`
                    whitespace-nowrap flex items-center gap-1.5
                    px-5 py-2.5 rounded-full
                    text-[11px] font-bold tracking-[0.12em] uppercase
                    transition-all duration-300 flex-shrink-0 border
                    ${
                      active
                        ? "text-white shadow-lg scale-105 border-transparent"
                        : "bg-white border-black/10 text-black/60 hover:text-black hover:border-black/25 hover:shadow-sm"
                    }
                  `}
                  style={
                    active
                      ? { backgroundColor: accent, borderColor: accent }
                      : {}
                  }
                >
                  <span className="text-xs">{icon}</span>
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          POSTS SECTION
      ═══════════════════════════════════════════ */}
      <div className="container mx-auto px-6 md:px-12 max-w-7xl py-14">

        {/* ── Category heading ── */}
        <div className="flex items-baseline gap-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-clagio text-black tracking-wide">
            {activeCategory === "All" ? "All Posts" : activeCategory}
          </h2>
          {!loading && (
            <span className="text-sm text-black/40 font-medium">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          )}
        </div>

        {/* ── Loading skeleton ── */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="animate-pulse rounded-2xl overflow-hidden bg-white border border-black/5 shadow-sm"
              >
                <div className="bg-black/8 aspect-[4/3] w-full" />
                <div className="p-6 space-y-3">
                  <div className="bg-black/8 h-3 w-1/4 rounded-full" />
                  <div className="bg-black/8 h-5 w-3/4 rounded" />
                  <div className="bg-black/8 h-4 w-full rounded" />
                  <div className="bg-black/8 h-4 w-5/6 rounded" />
                  <div className="bg-black/8 h-10 w-32 rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-24 border border-dashed border-black/15 rounded-2xl">
            <p className="text-5xl mb-6">📭</p>
            <h3 className="text-2xl font-clagio text-black mb-2">
              No posts yet
            </h3>
            <p className="text-black/50 font-medium text-sm">
              No {type === "blog" ? "blogs" : "news"} found
              {activeCategory !== "All" ? ` in "${activeCategory}"` : ""}.
              <br />Check back soon!
            </p>
          </div>
        )}

        {/* ── Blog cards ── */}
        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post._id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-black/6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
              >
                {/* ── Image ── */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={getImage(post)}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  {/* Gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white rounded-full shadow"
                      style={{ backgroundColor: accent }}
                    >
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* ── Card body ── */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Date */}
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-black/35 mb-3">
                    {new Date(post.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  {/* Headline */}
                  <h3 className="text-lg font-bold text-black leading-snug mb-3 line-clamp-2 group-hover:opacity-70 transition-opacity duration-300">
                    {post.title}
                  </h3>

                  {/* Short excerpt */}
                  <p className="text-black/50 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                    {getExcerpt(post)}
                  </p>

                  {/* Read More button */}
                  <Link
                    href={`/ground-report/${
                      type === "blog" ? "blogs" : "news"
                    }/${post._id}`}
                    className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-xl text-xs font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:scale-105"
                    style={{ backgroundColor: accent }}
                  >
                    Read More
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
