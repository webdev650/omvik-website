"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import api from "@/utils/api";

interface Post {
  _id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

// Hero images for the blog section
const BLOG_HERO_IMAGES = [
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

export default function GroundReportPage({ type }: { type: 'blog' | 'news' }) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [popularPosts, setPopularPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState<string>("All");
    const [filter, setFilter] = useState<string>("all");

    const accentColor = type === 'blog' ? '#E86A2C' : '#185FA5';
    const bgHoverClass = type === 'blog' ? 'hover:bg-[#E86A2C]' : 'hover:bg-[#185FA5]';
    const textHoverClass = type === 'blog' ? 'hover:text-[#E86A2C]' : 'hover:text-[#185FA5]';

    const categories = ["All", "Residential", "Commercial", "Market Trends", "Company News", "Guides"];
    const timeFilters = [
        { label: "All Time", value: "all" },
        { label: "This Week", value: "week" },
        { label: "This Month", value: "month" },
    ];

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                let params: any = { type };
                if (category !== "All") params.category = category;
                if (filter !== 'all') params.filter = filter;

                const res = await api.get('/posts', { params });
                setPosts(res.data);

                // Fetch Popular Posts
                const popularRes = await api.get('/posts', { params: { type, isPopular: true } });
                setPopularPosts(popularRes.data.slice(0, 5));
            } catch (error) {
                console.error("Error fetching posts", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, [type, category, filter]);

    return (
        <div className="min-h-screen bg-[#FDFCFB]">

            {/* ───── BLOG HERO SECTION ───── */}
            {type === 'blog' && (
                <section className="w-full">
                    {/* Main Hero Image */}
                    <div className="relative w-full h-[60vh] md:h-[75vh] overflow-hidden">
                        <Image
                            src="/images/blog-hero-main.png"
                            alt="Understanding Bhubaneswar by Locality"
                            fill
                            priority
                            className="object-cover object-center scale-105"
                            style={{ transformOrigin: 'center' }}
                        />
                        {/* Dark gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                        {/* Overlay text */}
                        <div className="absolute inset-0 flex flex-col justify-end pb-12 md:pb-16 px-6 md:px-16 lg:px-24 max-w-5xl">
                            <span className="inline-block mb-4 text-[10px] font-bold tracking-[0.4em] uppercase text-[#E86A2C] bg-[#E86A2C]/10 border border-[#E86A2C]/30 px-4 py-1.5 rounded-full w-fit">
                                05 / 10 / 2026 &nbsp;·&nbsp; Week 1 &middot; Blog 1
                            </span>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-clagio text-white leading-[1.08] mb-5">
                                Understanding Bhubaneswar<br className="hidden md:block" /> by Locality
                            </h1>
                            <p className="text-white/70 text-base md:text-lg font-medium max-w-2xl leading-relaxed">
                                A Beginner&apos;s Guide — The right home is not just about what you buy.
                                It is about <em>where</em> you choose to live.
                            </p>
                        </div>
                    </div>

                    {/* 4-Image Mosaic Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                        {BLOG_HERO_IMAGES.map((img, i) => (
                            <div key={i} className="relative h-48 md:h-56 overflow-hidden group cursor-pointer">
                                <Image
                                    src={img.src}
                                    alt={img.label}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                />
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                {/* Label */}
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <p className="text-white font-bold text-xs md:text-sm tracking-wide leading-tight">
                                        {img.label}
                                    </p>
                                    <p className="text-white/60 text-[10px] md:text-xs tracking-wider mt-0.5 font-medium">
                                        {img.sublabel}
                                    </p>
                                </div>
                                {/* Hover accent bar */}
                                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E86A2C] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div className={type === 'blog' ? 'pt-12 pb-12' : 'pt-32 pb-12'}>
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 border-b border-black/10 pb-6">
                    <h1 className="text-4xl md:text-5xl font-clagio uppercase tracking-[0.2em] text-black mb-4 md:mb-0">
                        {type === 'blog' ? 'Blogs' : 'News'}
                    </h1>
                    
                    <div className="flex flex-wrap gap-2">
                        {timeFilters.map((tf) => (
                            <button
                                key={tf.value}
                                onClick={() => setFilter(tf.value)}
                                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all shadow-sm ${filter === tf.value ? 'text-white shadow-md' : 'bg-white border border-black/10 text-black hover:bg-black/5'}`}
                                style={filter === tf.value ? { backgroundColor: accentColor, borderColor: accentColor } : {}}
                            >
                                {tf.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 shrink-0">
                        <div className="sticky top-32 space-y-8">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 border-b border-black/10 pb-4 text-black/60">Categories</h3>
                                <ul className="space-y-1">
                                    {categories.map(cat => (
                                        <li key={cat}>
                                            <button
                                                onClick={() => setCategory(cat)}
                                                className={`w-full text-left py-2.5 px-4 rounded-lg transition-all text-sm font-medium ${category === cat ? 'bg-black text-white shadow-md' : 'text-black/70 hover:bg-black/5'}`}
                                            >
                                                {cat}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {popularPosts.length > 0 && (
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
                                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 border-b border-black/10 pb-4 text-black/60">
                                        Popular {type === 'blog' ? 'Blogs' : 'News'}
                                    </h3>
                                    <div className="space-y-6">
                                        {popularPosts.map(post => (
                                            <Link key={post._id} href={`/ground-report/${type === 'blog' ? 'blogs' : 'news'}/${post._id}`} className="group flex gap-4 items-start">
                                                <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-black/5">
                                                    <Image 
                                                        src={post.image || 'https://res.cloudinary.com/dtmqv7oqq/image/upload/v1782557955/TOWNSHIP_qf8nyk.jpg'}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                </div>
                                                <div className="flex-1">
                                                  <h4 className={`text-xs font-bold leading-tight line-clamp-2 transition-colors duration-300 ${textHoverClass}`}>
                                                    {post.title}
                                                  </h4>
                                                  <span className="text-[10px] text-black/40 font-semibold uppercase tracking-wider mt-1 block">
                                                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                  </span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </aside>

                    {/* Grid */}
                    <main className="flex-1">
                        {loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {[1, 2, 3, 4, 5, 6].map(skeleton => (
                                    <div key={skeleton} className="animate-pulse flex flex-col bg-white border border-black/5 rounded-2xl p-4 shadow-sm">
                                        <div className="bg-black/5 aspect-video w-full rounded-xl mb-6" />
                                        <div className="bg-black/5 h-4 w-1/4 mb-4 rounded" />
                                        <div className="bg-black/5 h-6 w-3/4 mb-5 rounded" />
                                        <div className="bg-black/5 h-4 w-full mb-2 rounded" />
                                        <div className="bg-black/5 h-4 w-full mb-2 rounded" />
                                        <div className="bg-black/5 h-4 w-2/3 mt-auto rounded" />
                                    </div>
                                ))}
                            </div>
                        ) : posts.length === 0 ? (
                            <div className="text-center py-24 border border-dashed border-black/20 rounded-2xl bg-white/50">
                                <h3 className="text-2xl font-clagio mb-3 text-black">No posts found</h3>
                                <p className="text-black/60 font-medium">We couldn't locate any {type} posts for this criteria.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                                {posts.map(post => (
                                    <article key={post._id} className="group flex flex-col h-full bg-white border border-black/5 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                                        <div className="relative aspect-video overflow-hidden">
                                            <Image 
                                                src={post.image || 'https://res.cloudinary.com/dtmqv7oqq/image/upload/v1782557955/TOWNSHIP_qf8nyk.jpg'}
                                                alt={post.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                            />
                                            <div className="absolute top-4 left-4">
                                                <span 
                                                    className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white rounded-full shadow-lg"
                                                    style={{ backgroundColor: accentColor }}
                                                >
                                                    {post.category}
                                                </span>
                                            </div>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>
                                        <div className="p-8 flex flex-col items-center text-center flex-1">
                                            <div className="text-xs text-black/50 mb-4 font-bold tracking-widest uppercase">
                                                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </div>
                                            <h3 className={`text-xl font-bold mb-4 line-clamp-2 leading-snug transition-colors duration-300 ${textHoverClass}`}>
                                                {post.title}
                                            </h3>
                                            <p className="text-black/60 text-sm line-clamp-3 mb-8 flex-1 leading-relaxed">
                                                {post.content.substring(0, 150)}...
                                            </p>
                                            <Link href={`/ground-report/${type === 'blog' ? 'blogs' : 'news'}/${post._id}`} className={`inline-block font-bold text-xs tracking-[0.2em] uppercase bg-black text-white px-8 py-4 rounded-xl text-center transition-all duration-300 ${bgHoverClass}`}>
                                                Read More
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
            </div>
        </div>
    );
}
