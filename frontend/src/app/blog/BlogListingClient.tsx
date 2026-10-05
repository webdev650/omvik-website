"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BLOG_CATEGORIES, INITIAL_BLOGS, BlogPost } from "@/data/blogs";

export default function BlogListingClient() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Filter blogs based on active category tab
  const filteredBlogs: BlogPost[] =
    activeCategory === "All"
      ? INITIAL_BLOGS
      : INITIAL_BLOGS.filter(
          (blog) =>
            blog.category.toLowerCase() === activeCategory.toLowerCase()
        );

  const postCountText = `${filteredBlogs.length} ${
    filteredBlogs.length === 1 ? "POST" : "POSTS"
  }`;

  return (
    <div className="min-h-screen bg-[#fbfaf8] text-stone-900 pt-28 pb-24 font-sans">
      {/* ── HERO BANNER ── */}
      <section className="px-6 md:px-12 max-w-7xl mx-auto pt-8 pb-12 text-center">
        <span className="inline-block text-[#e8692b] font-medium text-xs sm:text-sm tracking-[0.3em] uppercase mb-4 bg-[#e8692b]/10 px-4 py-1.5 rounded-full">
          OMVIK Realcon Insights
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-light uppercase tracking-[0.25em] text-stone-900 mb-6">
          Blog
        </h1>
        <p className="text-stone-600 font-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Stay informed with expert property guides, Bhubaneswar locality analysis, market trends, and company updates.
        </p>
      </section>

      {/* ── STICKY FILTER BAR ── */}
      <div className="sticky top-[70px] z-30 bg-[#fbfaf8]/90 backdrop-blur-md border-y border-stone-200/80 py-4 px-6 md:px-12 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center gap-2.5 overflow-x-auto no-scrollbar pb-1 pt-1">
          {BLOG_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all duration-300 whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#e8692b] focus-visible:outline-none ${
                  isActive
                    ? "bg-[#e8692b] text-white shadow-md shadow-[#e8692b]/30 scale-[1.02]"
                    : "bg-white text-stone-700 border border-stone-200/90 hover:border-[#e8692b]/50 hover:text-[#e8692b] hover:bg-stone-50"
                }`}
                aria-pressed={isActive}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── CONTENT CONTAINER ── */}
      <main className="px-6 md:px-12 max-w-7xl mx-auto pt-10">
        {/* Category Header & Count */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-stone-200 pb-4 mb-10">
          <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.2em] text-stone-900">
            {activeCategory}
          </h2>
          <span className="text-xs sm:text-sm font-medium tracking-widest text-[#e8692b] uppercase bg-[#e8692b]/10 px-3 py-1 rounded-full self-start sm:self-auto">
            {postCountText}
          </span>
        </div>

        {/* Responsive Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <article
                key={blog.slug}
                className="group bg-white rounded-2xl border border-stone-200/70 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-stone-200/80 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Main Cover Image (16:10 ratio) */}
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="block relative aspect-[16/10] overflow-hidden bg-stone-100 focus-visible:ring-2 focus-visible:ring-[#e8692b] focus-visible:outline-none"
                    tabIndex={0}
                  >
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-md text-[#e8692b] font-semibold text-[11px] uppercase tracking-wider px-3 py-1 rounded-full border border-stone-200/50 shadow-sm">
                        {blog.category}
                      </span>
                    </div>
                  </Link>

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-stone-400 font-medium mb-3">
                      <span>{blog.date}</span>
                      {blog.readTime && (
                        <>
                          <span>•</span>
                          <span>{blog.readTime}</span>
                        </>
                      )}
                    </div>

                    <h3 className="text-xl font-medium text-stone-900 group-hover:text-[#e8692b] transition-colors leading-snug mb-3">
                      <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>

                    <p className="text-stone-600 text-sm leading-relaxed line-clamp-2 mb-6">
                      {blog.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Button */}
                <div className="px-6 pb-6 pt-0">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-2 bg-[#e8692b] hover:bg-[#d5581b] text-white text-xs font-semibold uppercase tracking-wider px-6 py-2.5 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-[#e8692b]/30 group-hover:translate-x-1 focus-visible:ring-2 focus-visible:ring-[#e8692b] focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <span>READ MORE</span>
                    <span className="text-sm">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="border-2 border-dashed border-stone-300 bg-white rounded-3xl p-12 text-center max-w-lg mx-auto my-12 shadow-sm">
            <div className="text-5xl mb-4 animate-bounce">📪</div>
            <h3 className="text-xl font-light uppercase tracking-widest text-stone-900 mb-2">
              NO POSTS YET
            </h3>
            <p className="text-stone-500 text-sm leading-relaxed">
              No me blogs found in <span className="font-semibold text-stone-700">{activeCategory}</span>. Check back soon!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
