export type BlogCategory =
  | "Residential"
  | "Commercial"
  | "Market Trends"
  | "Company News"
  | "Guides";

export interface BlogPost {
  slug: string;
  category: BlogCategory;
  date: string;
  title: string;
  excerpt: string;
  coverImage: string;
  content: string;
  images: string[];
  author?: string;
  readTime?: string;
}

export const BLOG_CATEGORIES = [
  { name: "All", icon: "📋" },
  { name: "Residential", icon: "🏠" },
  { name: "Commercial", icon: "🏢" },
  { name: "Market Trends", icon: "📈" },
  { name: "Company News", icon: "📰" },
  { name: "Guides", icon: "🗺️" },
] as const;

export const INITIAL_BLOGS: BlogPost[] = [
  {
    slug: "understanding-bhubaneswar-by-locality-beginners-guide",
    category: "Residential",
    date: "05 Oct 2026",
    title: "Understanding Bhubaneswar by Locality: A Beginner's Guide",
    excerpt:
      "Planning to buy a residential property in Bhubaneswar? Explore key localities from Central and North Bhubaneswar to South-West and Old Town to find your ideal home.",
    coverImage: "/images/bhubaneswar-hero.jpg",
    images: [
      "/images/central-bhubaneswar.jpg",
      "/images/north-bhubaneswar.jpg",
      "/images/south-west-bhubaneswar.jpg",
      "/images/old-bhubaneswar.jpg",
    ],
    author: "OMVIK Editorial",
    readTime: "6 min read",
    content: `
      <p class="text-lg leading-relaxed text-stone-700 mb-6 font-light">
        The right home is not just about what you buy. It is about where you choose to live.
      </p>

      <p class="leading-relaxed text-stone-700 mb-6">
        Planning to buy a residential property in Bhubaneswar? Before comparing prices, floor plans and amenities, there is one important question to answer: <strong>Which locality is right for you?</strong>
      </p>

      <p class="leading-relaxed text-stone-700 mb-6">
        Bhubaneswar's real estate market has expanded significantly over the years. From established neighbourhoods in the heart of the city to emerging residential corridors on its outskirts, different parts of Bhubaneswar offer different lifestyles, connectivity and opportunities. For a first-time buyer, understanding these localities can make the search for a home much easier.
      </p>

      <h2 class="text-2xl sm:text-3xl font-light uppercase tracking-wider text-stone-900 mt-12 mb-6 border-b border-stone-200 pb-3">
        Best Residential Areas in Bhubaneswar: Where Should You Look?
      </h2>

      <p class="leading-relaxed text-stone-700 mb-8">
        There is no single answer to which are the best residential areas in Bhubaneswar. The right locality depends on your lifestyle, budget, workplace, family requirements and long-term plans. Let us explore the major residential corridors of Bhubaneswar.
      </p>

      <!-- SECTION 1: CENTRAL BHUBANESWAR -->
      <div id="locality-central" class="my-10">
        <h3 class="text-xl sm:text-2xl font-medium text-stone-900 mb-4">
          1. Central Bhubaneswar: Premium & Established Neighbourhoods
        </h3>
        <div class="my-6 rounded-2xl overflow-hidden shadow-md aspect-[4/3] relative bg-stone-100 border border-stone-200">
          <img 
            src="/images/central-bhubaneswar.jpg" 
            alt="Central Bhubaneswar Locality" 
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
        <p class="leading-relaxed text-stone-700 mb-4">
          Localities like <strong>Jaydev Vihar, Saheed Nagar, Kharvela Nagar, and Nayapalli</strong> form the core of Bhubaneswar's urban center. These areas are characterized by excellent infrastructure, seamless connectivity, and immediate access to premium shopping districts, top-tier healthcare, and government offices.
        </p>
        <ul class="list-disc list-inside space-y-2 text-stone-700 mb-6 pl-2">
          <li><strong>Ideal for:</strong> Buyers seeking central convenience and established social infrastructure.</li>
          <li><strong>Property types:</strong> High-end residential apartments and independent villas.</li>
          <li><strong>Connectivity:</strong> Direct access to Janpath and Cuttack-Puri Road.</li>
        </ul>
      </div>

      <!-- SECTION 2: NORTH BHUBANESWAR -->
      <div id="locality-north" class="my-10">
        <h3 class="text-xl sm:text-2xl font-medium text-stone-900 mb-4">
          2. North Bhubaneswar: The IT Corridor & Modern Gated Communities
        </h3>
        <div class="my-6 rounded-2xl overflow-hidden shadow-md aspect-[4/3] relative bg-stone-100 border border-stone-200">
          <img 
            src="/images/north-bhubaneswar.jpg" 
            alt="North Bhubaneswar IT Corridor" 
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
        <p class="leading-relaxed text-stone-700 mb-4">
          Stretching through <strong>Patia, Chandrasekharpur, Infocity, and Raghunathpur</strong>, North Bhubaneswar is the city's fastest-growing IT and educational hub. Driven by tech parks and premier institutions like KIIT and Infocity, this belt offers contemporary high-rise living with luxury amenities.
        </p>
        <ul class="list-disc list-inside space-y-2 text-stone-700 mb-6 pl-2">
          <li><strong>Ideal for:</strong> IT professionals, families wanting top schools nearby, and real estate investors.</li>
          <li><strong>Property types:</strong> Modern 2BHK/3BHK luxury apartments and gated township plots.</li>
          <li><strong>Appreciation:</strong> Consistently strong rental yield and capital growth.</li>
        </ul>
      </div>

      <!-- SECTION 3: SOUTH-WEST BHUBANESWAR -->
      <div id="locality-south-west" class="my-10">
        <h3 class="text-xl sm:text-2xl font-medium text-stone-900 mb-4">
          3. South-West Corridors: Expanding Suburbs & Value Growth
        </h3>
        <div class="my-6 rounded-2xl overflow-hidden shadow-md aspect-[4/3] relative bg-stone-100 border border-stone-200">
          <img 
            src="/images/south-west-bhubaneswar.jpg" 
            alt="South-West Bhubaneswar Residential Expansion" 
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
        <p class="leading-relaxed text-stone-700 mb-4">
          Suburbs including <strong>Khandagiri, Pokhariput, Sundarpada, and Tamando</strong> represent Bhubaneswar's primary growth corridors. Proximity to AIIMS Bhubaneswar and the NH-16 highway makes this region immensely popular for home seekers looking for affordable premium land and spacious homes.
        </p>
        <ul class="list-disc list-inside space-y-2 text-stone-700 mb-6 pl-2">
          <li><strong>Ideal for:</strong> First-time buyers, medical professionals, and long-term land buyers.</li>
          <li><strong>Property types:</strong> Residential plots, duplexes, and budget-friendly housing complexes.</li>
          <li><strong>Growth Driver:</strong> Rapid road expansions and upcoming public infrastructure.</li>
        </ul>
      </div>

      <!-- SECTION 4: OLD BHUBANESWAR -->
      <div id="locality-old-town" class="my-10">
        <h3 class="text-xl sm:text-2xl font-medium text-stone-900 mb-4">
          4. Old Bhubaneswar: Cultural Heritage & Peaceful Living
        </h3>
        <div class="my-6 rounded-2xl overflow-hidden shadow-md aspect-[4/3] relative bg-stone-100 border border-stone-200">
          <img 
            src="/images/old-bhubaneswar.jpg" 
            alt="Old Bhubaneswar Heritage Zone" 
            class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>
        <p class="leading-relaxed text-stone-700 mb-4">
          Encompassing <strong>Old Town, Lingaraj Temple Zone, and Samantarapur</strong>, this southern enclave provides a unique blend of ancient heritage and tranquil neighborhood living. Residents enjoy a peaceful atmosphere away from heavy commercial noise while staying connected to central city arteries.
        </p>
        <ul class="list-disc list-inside space-y-2 text-stone-700 mb-6 pl-2">
          <li><strong>Ideal for:</strong> Families looking for serene surroundings, heritage culture, and community spirit.</li>
          <li><strong>Property types:</strong> Independent houses, classic plots, and boutique apartments.</li>
          <li><strong>Atmosphere:</strong> Rich cultural roots, greenery, and spiritual heritage.</li>
        </ul>
      </div>

      <h2 class="text-2xl font-light uppercase tracking-wider text-stone-900 mt-12 mb-4 border-b border-stone-200 pb-3">
        Making Your Choice: Next Steps for Home Buyers
      </h2>
      <p class="leading-relaxed text-stone-700 mb-6">
        When choosing your home in Bhubaneswar, prioritize your daily commute, proximity to essential services, and future resale value. OMVIK Realcon brings verified residential plots, luxury apartments, and township land developments across all major corridors of Bhubaneswar.
      </p>
    `,
  },
];

export function getAllBlogs(): BlogPost[] {
  return INITIAL_BLOGS;
}

export function getBlogsByCategory(category: string): BlogPost[] {
  if (!category || category === "All") {
    return INITIAL_BLOGS;
  }
  return INITIAL_BLOGS.filter(
    (blog) => blog.category.toLowerCase() === category.toLowerCase()
  );
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return INITIAL_BLOGS.find((blog) => blog.slug === slug);
}
