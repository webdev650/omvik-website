export interface NewsItem {
  slug: string;
  date: string;
  title: string;
  summary: string;
  coverImage: string;
  content: string;
  images: string[];
  author?: string;
  readTime?: string;
}

export const INITIAL_NEWS: NewsItem[] = [
  {
    slug: "omvik-realcon-expands-residential-township-portfolio-bhubaneswar",
    date: "05 Oct 2026",
    title: "OMVIK Realcon Expands Residential & Township Portfolio Across Bhubaneswar Corridors",
    summary:
      "OMVIK Realcon announces new premium township and residential plot developments across North and South-West Bhubaneswar corridors, setting new standards in property verification and customer trust.",
    coverImage: "/images/bhubaneswar-hero.jpg",
    images: [
      "/images/central-bhubaneswar.jpg",
      "/images/north-bhubaneswar.jpg",
    ],
    author: "OMVIK Corporate News",
    readTime: "4 min read",
    content: `
      <p class="text-lg leading-relaxed text-stone-700 mb-6 font-light">
        Bhubaneswar real estate is entering a new era of planned urbanization, and OMVIK Realcon is proud to lead the transition with transparent, legacy-focused property developments.
      </p>

      <p class="leading-relaxed text-stone-700 mb-6">
        As part of our commitment to delivering verified residential plots, luxury duplexes, and commercial land investments, OMVIK Realcon has officially expanded its portfolio across key residential belts including Patia, Chandrasekharpur, Khandagiri, and Tamando.
      </p>

      <h2 class="text-2xl sm:text-3xl font-light uppercase tracking-wider text-stone-900 mt-10 mb-6 border-b border-stone-200 pb-3">
        Key Project Highlights & Vision
      </h2>

      <p class="leading-relaxed text-stone-700 mb-6">
        Every project in the OMVIK portfolio undergoes rigorous legal vetting, clear title deeds verification, and comprehensive land zoning checks before being offered to buyers.
      </p>

      <div class="my-8 rounded-2xl overflow-hidden shadow-md aspect-[16/9] relative bg-stone-100 border border-stone-200">
        <img 
          src="/images/north-bhubaneswar.jpg" 
          alt="OMVIK Realcon Development Corridor" 
          class="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <h3 class="text-xl font-medium text-stone-900 mb-4">
        What Sets OMVIK Apart
      </h3>

      <ul class="list-disc list-inside space-y-3 text-stone-700 mb-8 pl-2 leading-relaxed">
        <li><strong>100% Legal Transparency:</strong> Clear titles, BDA/RERA compliance guidance, and seamless documentation.</li>
        <li><strong>Prime Corridors:</strong> Strategic placements along major highways, IT hubs, and educational belts.</li>
        <li><strong>End-to-End Assistance:</strong> From plot selection to site registration and handover support.</li>
      </ul>

      <p class="leading-relaxed text-stone-700 mb-6">
        For inquiries regarding new project releases, land registrations, or joint ventures, visit our headquarters or reach out via our official portal.
      </p>
    `,
  },
];

export function getAllNews(): NewsItem[] {
  return INITIAL_NEWS;
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return INITIAL_NEWS.find((item) => item.slug === slug);
}
