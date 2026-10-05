"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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

// The 4 Bhubaneswar locality images shown at the bottom of every blog post
const LOCALITY_IMAGES = [
  {
    src: "/images/blog-hero-1.png",
    label: "North Bhubaneswar",
    sublabel: "Modern Living & Connectivity",
  },
  {
    src: "/images/blog-hero-2.png",
    label: "Central Bhubaneswar",
    sublabel: "Established & Convenient",
  },
  {
    src: "/images/blog-hero-3.png",
    label: "Old Bhubaneswar",
    sublabel: "Heritage & Community",
  },
  {
    src: "/images/blog-hero-4.png",
    label: "South Bhubaneswar",
    sublabel: "Growing Corridors",
  },
];

const FALLBACK_IMG =
  "https://res.cloudinary.com/dtmqv7oqq/image/upload/v1782557955/TOWNSHIP_qf8nyk.jpg";

export default function PostDetail({
  id,
  type,
}: {
  id: string;
  type: "blog" | "news";
}) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const accent = type === "blog" ? "#E86A2C" : "#185FA5";
  const backHref = `/ground-report/${type === "blog" ? "blogs" : "news"}`;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  /* ── Loading skeleton ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-16">
        <div className="animate-pulse container mx-auto px-6 md:px-12 max-w-4xl">
          <div className="bg-black/10 h-4 w-28 mb-12 rounded-full" />
          <div className="bg-black/10 h-8 w-3/4 mb-4 rounded" />
          <div className="bg-black/10 h-6 w-1/2 mb-10 rounded" />
          <div className="bg-black/10 aspect-video w-full rounded-2xl mb-10" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-black/8 h-4 rounded w-full" />
            ))}
            <div className="bg-black/8 h-4 rounded w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  /* ── Error / Not found ── */
  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] pt-40 pb-16 flex items-start justify-center">
        <div className="text-center bg-white p-14 rounded-2xl border border-black/6 shadow-sm">
          <p className="text-5xl mb-6">🔍</p>
          <h1 className="text-3xl font-clagio text-black mb-3">Post Not Found</h1>
          <p className="text-black/50 mb-8 font-medium">
            This post has been moved or deleted.
          </p>
          <Link
            href={backHref}
            className="inline-block font-bold text-xs tracking-widest uppercase bg-black text-white px-8 py-4 rounded-xl hover:bg-black/75 transition-all"
          >
            ← Back to {type === "blog" ? "Blogs" : "News"}
          </Link>
        </div>
      </div>
    );
  }

  const heroImg = post.thumbnail || post.image || FALLBACK_IMG;

  return (
    <article className="min-h-screen bg-[#FDFCFB]">

      {/* ─── HERO IMAGE (full-width cinematic) ─── */}
      <div className="relative w-full h-[55vh] md:h-[70vh] overflow-hidden">
        <Image
          src={heroImg}
          alt={post.title}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* Overlay metadata */}
        <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-18 px-6 md:px-16 lg:px-24 max-w-5xl">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white rounded-full"
              style={{ backgroundColor: accent }}
            >
              {post.category}
            </span>
            <span className="text-white/50 text-xs font-semibold tracking-widest uppercase">
              {new Date(post.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-clagio text-white leading-[1.05] max-w-3xl">
            {post.title}
          </h1>
        </div>
      </div>

      {/* ─── CONTENT ─── */}
      <div className="container mx-auto px-6 md:px-12 max-w-4xl py-14 md:py-20">

        {/* Back link */}
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.25em] uppercase text-black/45 hover:text-black transition-colors mb-12"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to {type === "blog" ? "Blogs" : "News"}
        </Link>

        {/* Full blog content */}
        <div
          className="
            text-black/80 leading-relaxed text-base md:text-lg font-medium tracking-wide
            [&>p]:mb-7
            [&>h2]:text-2xl md:[&>h2]:text-3xl [&>h2]:font-clagio [&>h2]:text-black [&>h2]:mt-14 [&>h2]:mb-6
            [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-black [&>h3]:mt-10 [&>h3]:mb-4
            [&>ul]:list-disc [&>ul]:pl-7 [&>ul]:mb-7 [&>ul>li]:mb-2
            [&>ol]:list-decimal [&>ol]:pl-7 [&>ol]:mb-7 [&>ol>li]:mb-2
            [&>strong]:text-black [&>strong]:font-bold
            [&>a]:underline [&>a]:hover:opacity-75
            [&>blockquote]:border-l-4 [&>blockquote]:border-black/20 [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-black/55 [&>blockquote]:my-8
            [&>img]:rounded-xl [&>img]:shadow-md [&>img]:w-full [&>img]:my-10
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* ─── DIVIDER ─── */}
        <div className="flex items-center gap-4 my-14 md:my-20">
          <div className="flex-1 h-px bg-black/10" />
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-black/30">
            Explore Bhubaneswar
          </span>
          <div className="flex-1 h-px bg-black/10" />
        </div>

        {/* ─── 4 LOCALITY IMAGES SECTION ─── */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-clagio text-black mb-2">
            The Four Zones of Bhubaneswar
          </h2>
          <p className="text-black/50 text-sm font-medium mb-8 leading-relaxed">
            Each locality has its own character, community, and growth story. Explore them all.
          </p>

          {/* 2×2 mosaic on mobile, 4-col on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 rounded-2xl overflow-hidden shadow-xl border border-black/6">
            {LOCALITY_IMAGES.map((img, i) => (
              <div
                key={i}
                className="relative h-52 md:h-64 overflow-hidden group"
              >
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-in-out"
                  style={{ transform: "scale(1)" }}
                />
                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />

                {/* Labels */}
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-bold text-xs md:text-sm leading-tight">
                    {img.label}
                  </p>
                  <p className="text-white/60 text-[10px] md:text-xs mt-1 tracking-wider font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    {img.sublabel}
                  </p>
                </div>

                {/* Orange accent line on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ backgroundColor: "#E86A2C" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ─── CTA FOOTER ─── */}
        <div className="rounded-2xl overflow-hidden border border-black/8 bg-white p-10 md:p-14 text-center shadow-sm">
          <p className="text-[11px] font-bold tracking-[0.4em] uppercase mb-4" style={{ color: accent }}>
            OMVIK Realcon
          </p>
          <h3 className="text-2xl md:text-3xl font-clagio text-black mb-4 leading-tight">
            Ready to find your place in Bhubaneswar?
          </h3>
          <p className="text-black/50 text-sm font-medium mb-8 max-w-md mx-auto leading-relaxed">
            Explore thoughtfully planned residential developments — built with attention to quality, planning and long-term value.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 text-white font-bold text-xs tracking-[0.2em] uppercase rounded-xl transition-all hover:opacity-90 hover:shadow-lg"
              style={{ backgroundColor: accent }}
            >
              Book a Consultation
            </Link>
            <Link
              href={backHref}
              className="inline-block px-8 py-4 bg-black/5 text-black font-bold text-xs tracking-[0.2em] uppercase rounded-xl transition-all hover:bg-black/10"
            >
              ← More {type === "blog" ? "Blogs" : "News"}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
