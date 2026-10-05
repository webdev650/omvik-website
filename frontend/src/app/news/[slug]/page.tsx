import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getNewsBySlug, getAllNews } from "@/data/news";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const newsList = getAllNews();
  return newsList.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const newsItem = getNewsBySlug(slug);

  if (!newsItem) {
    return {
      title: "News Article Not Found | OMVIK Realcon",
      description: "The requested news article could not be found.",
    };
  }

  return {
    title: `${newsItem.title} | OMVIK Realcon News`,
    description: newsItem.summary,
    keywords: [
      "OMVIK Realcon news",
      "Bhubaneswar real estate announcement",
      newsItem.title,
    ],
    openGraph: {
      title: newsItem.title,
      description: newsItem.summary,
      url: `https://www.omvikrealcon.com/news/${newsItem.slug}`,
      siteName: "OMVIK Realcon",
      images: [
        {
          url: newsItem.coverImage,
          width: 1200,
          height: 675,
          alt: newsItem.title,
        },
      ],
      type: "article",
      publishedTime: newsItem.date,
    },
  };
}

export default async function SingleNewsPage({ params }: PageProps) {
  const { slug } = await params;
  const newsItem = getNewsBySlug(slug);

  if (!newsItem) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fbfaf8] text-stone-900 pt-28 pb-24 font-sans">
      <article className="max-w-4xl mx-auto px-6 md:px-12">
        {/* ── TOP NAVIGATION & HEADER ── */}
        <header className="mb-10">
          <Link
            href="/news"
            prefetch={true}
            aria-label="Back to News"
            className="relative z-20 cursor-pointer inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700 hover:text-[#e8692b] transition-colors mb-8 group focus-visible:ring-2 focus-visible:ring-[#e8692b] focus-visible:outline-none rounded-full px-4 py-2 bg-stone-100 hover:bg-stone-200/80 w-fit border border-stone-200/80 shadow-sm"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>
            <span>Back to News</span>
          </Link>

          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="bg-[#185FA5]/10 text-[#185FA5] font-semibold text-xs uppercase tracking-wider px-3.5 py-1 rounded-full border border-[#185FA5]/20">
              News
            </span>
            <span className="text-stone-400">•</span>
            <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
              {newsItem.date}
            </span>
            {newsItem.readTime && (
              <>
                <span className="text-stone-400">•</span>
                <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                  {newsItem.readTime}
                </span>
              </>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light uppercase tracking-wide text-stone-900 leading-[1.2] mb-8">
            {newsItem.title}
          </h1>

          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden shadow-lg border border-stone-200/60 bg-stone-100 mb-12">
            <Image
              src={newsItem.coverImage}
              alt={newsItem.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </header>

        {/* ── ARTICLE CONTENT ── */}
        <div
          className="prose prose-stone max-w-none prose-headings:font-light prose-headings:uppercase prose-headings:tracking-wider prose-h2:text-2xl prose-h2:sm:text-3xl prose-h3:text-xl prose-h3:font-medium prose-p:text-stone-700 prose-p:leading-relaxed prose-p:mb-6 prose-li:text-stone-700 font-sans"
          dangerouslySetInnerHTML={{ __html: newsItem.content }}
        />

        {/* ── CTA BOX ── */}
        <section className="mt-16 bg-gradient-to-br from-[#0a1628] to-[#12243e] text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl border border-stone-800">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block text-[#e8692b] font-medium text-xs uppercase tracking-[0.25em] mb-3 bg-[#e8692b]/15 px-4 py-1 rounded-full border border-[#e8692b]/30">
              Stay Connected
            </span>

            <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-wider text-white mb-4 leading-snug">
              Explore Real Estate Opportunities in Bhubaneswar
            </h2>

            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-xl mx-auto">
              Get in touch with OMVIK Realcon to learn more about our upcoming residential, commercial, and land development projects.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://www.omvikrealcon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#e8692b] hover:bg-[#d5581b] text-white font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                <span>Visit www.omvikrealcon.com</span>
                <span>↗</span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs uppercase tracking-widest px-8 py-3.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </article>
    </div>
  );
}
