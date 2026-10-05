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

const CATEGORIES = ["All", "Residential", "Commercial", "Market Trends", "Company News", "Guides"];

const FALLBACK_IMG = "https://res.cloudinary.com/dtmqv7oqq/image/upload/v1782557955/TOWNSHIP_qf8nyk.jpg";

export default function GroundReportPage({ type }: { type: "blog" | "news" }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  const accent = type === "blog" ? "#E86A2C" : "#185FA5";

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
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [type, activeCategory]);

  const getImage = (post: Post) =>
    post.thumbnail || post.image || FALLBACK_IMG;

  const getExcerpt = (post: Post) => {
    if (post.excerpt) return post.excerpt;
    // Strip HTML tags from content and truncate
    const plain = post.content.replace(/<[^>]+>/g, "").trim();
    return plain.length > 140 ? plain.slice(0, 140) + "…" : plain;
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB]">

      {/* ─── HERO BANNER ─── */}
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
          <p className="text-[10px] font-bold tracking-[0.5em] uppercase mb-3"
            style={{ color: accent }}>
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
              : "Stay updated with the latest happenings in the real estate market and OMVIK Realcon."}
          </p>
        </div>
      </div>

      {/* ─── CATEGORY TABS ─── */}
      <div className="sticky top-[60px] z-40 bg-[#FDFCFB]/95 backdrop-blur-md border-b border-black/8 shadow-sm">
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-4">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-[11px] font-bold tracking-[0.15em] uppercase transition-all duration-300 flex-shrink-0 ${
                    active
                      ? "text-white shadow-lg scale-105"
                      : "bg-white border border-black/10 text-black/60 hover:text-black hover:border-black/30 hover:shadow-sm"
                  }`}
                  style={active ? { backgroundColor: accent, borderColor: accent } : {}}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── POSTS GRID ─── */}
      <div className="container mx-auto px-6 md:px-12 max-w-7xl py-14">

        {/* Active category heading */}
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

        {/* Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div key={s} className="animate-pulse rounded-2xl overflow-hidden bg-white border border-black/5 shadow-sm">
                <div className="bg-black/8 aspect-[4/3] w-full" />
                <div className="p-6 space-y-3">
                  <div className="bg-black/8 h-3 w-1/4 rounded-full" />
                  <div className="bg-black/8 h-5 w-3/4 rounded" />
                  <div className="bg-black/8 h-4 w-full rounded" />
                  <div className="bg-black/8 h-4 w-5/6 rounded" />
                  <div className="bg-black/8 h-9 w-28 rounded-xl mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && posts.length === 0 && (
          <div className="text-center py-28 border border-dashed border-black/15 rounded-2xl">
            <p className="text-5xl mb-6">📭</p>
            <h3 className="text-2xl font-clagio text-black mb-2">No posts yet</h3>
            <p className="text-black/50 font-medium">
              No {type === "blog" ? "blogs" : "news"} found
              {activeCategory !== "All" ? ` in "${activeCategory}"` : ""}.
            </p>
          </div>
        )}

        {/* Cards */}
        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post._id}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-black/6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={getImage(post)}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
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

                {/* Card body */}
                <div className="flex flex-col flex-1 p-6">
                  {/* Date */}
                  <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-black/40 mb-3">
                    {new Date(post.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-black leading-snug mb-3 line-clamp-2 group-hover:opacity-70 transition-opacity duration-300">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-black/55 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                    {getExcerpt(post)}
                  </p>

                  {/* Read More */}
                  <Link
                    href={`/ground-report/${type === "blog" ? "blogs" : "news"}/${post._id}`}
                    className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-xl text-xs font-bold tracking-[0.2em] uppercase text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    style={{ backgroundColor: accent }}
                  >
                    Read More
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
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
