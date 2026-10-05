import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getBlogBySlug, getAllBlogs } from "@/data/blogs";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all blogs
export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// SEO Dynamic Metadata
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found | OMVIK Realcon",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${blog.title} | OMVIK Realcon Blog`,
    description: blog.excerpt,
    keywords: [
      "Bhubaneswar real estate",
      blog.category,
      "OMVIK Realcon",
      "property guide Bhubaneswar",
      blog.title,
    ],
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: `https://www.omvikrealcon.com/blog/${blog.slug}`,
      siteName: "OMVIK Realcon",
      images: [
        {
          url: blog.coverImage,
          width: 1200,
          height: 675,
          alt: blog.title,
        },
      ],
      type: "article",
      publishedTime: blog.date,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
    },
  };
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fbfaf8] text-stone-900 pt-28 pb-24 font-sans">
      <article className="max-w-4xl mx-auto px-6 md:px-12">
        {/* ── TOP NAVIGATION & HEADER ── */}
        <header className="mb-10">
          {/* Back to Blog link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-600 hover:text-[#e8692b] transition-colors mb-8 group focus-visible:ring-2 focus-visible:ring-[#e8692b] focus-visible:outline-none rounded-full px-3.5 py-1.5 bg-stone-100/80 hover:bg-stone-200/60 w-fit"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>
            <span>Back to Blog</span>
          </Link>

          {/* Category Badge & Date */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="bg-[#e8692b]/10 text-[#e8692b] font-semibold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full border border-[#e8692b]/20">
              {blog.category}
            </span>
            <span className="text-stone-400">•</span>
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              {blog.date}
            </span>
            {blog.readTime && (
              <>
                <span className="text-stone-400">•</span>
                <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                  {blog.readTime}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-wide text-stone-900 leading-[1.2] mb-8">
            {blog.title}
          </h1>

          {/* Cover Image (16:9 aspect ratio) */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg border border-stone-200/60 bg-stone-100 mb-12">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </header>

        {/* ── BLOG BODY CONTENT ── */}
        <div
          className="prose prose-stone max-w-none prose-headings:font-light prose-headings:uppercase prose-headings:tracking-wider prose-h2:text-2xl prose-h2:sm:text-3xl prose-h3:text-xl prose-h3:font-medium prose-p:text-stone-700 prose-p:leading-relaxed prose-p:mb-6 prose-li:text-stone-700 font-sans"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* ── CALL TO ACTION BOX ── */}
        <section className="mt-16 bg-gradient-to-br from-[#0a1628] to-[#12243e] text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl border border-stone-800">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block text-[#e8692b] font-medium text-xs uppercase tracking-[0.25em] mb-3 bg-[#e8692b]/15 px-4 py-1 rounded-full border border-[#e8692b]/30">
              Partner With Us
            </span>

            <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-wider text-white mb-4 leading-snug">
              Ready to Find Your Ideal Property in Bhubaneswar?
            </h2>

            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-xl mx-auto">
              Explore verified residential plots, luxury duplexes, and commercial lands across top localities with OMVIK Realcon.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.omvikrealcon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#e8692b] hover:bg-[#d5581b] text-white font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-[#e8692b]/40 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                <span>Visit www.omvikrealcon.com</span>
                <span>↗</span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
