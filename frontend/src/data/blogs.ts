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
        There is no single answer to which are the best residential areas in Bhubaneswar. The right locality depends on your lifestyle, budget, workplace, family requirements and long-term plans. Let us look at some of the city's major residential zones.
      </p>

      <!-- SECTION 1: CENTRAL BHUBANESWAR -->
      <div id="locality-central" class="my-10">
        <h3 class="text-xl sm:text-2xl font-medium text-stone-900 mb-4">
          1. Central Bhubaneswar: Established and Convenient
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
          Localities such as <strong>Saheed Nagar, Nayapalli, Jayadev Vihar and Acharya Vihar</strong> are among the established residential areas of Bhubaneswar.
        </p>
        <p class="leading-relaxed text-stone-700 mb-4">
          These neighbourhoods benefit from developed infrastructure and convenient access to offices, schools, hospitals, shopping destinations, restaurants and everyday services.
        </p>
        <p class="leading-relaxed text-stone-700 mb-6">
          For families and professionals who value convenience and proximity to established city infrastructure, Central Bhubaneswar can be an attractive option when looking for a residential property in Bhubaneswar.
        </p>
      </div>

      <!-- SECTION 2: NORTH BHUBANESWAR -->
      <div id="locality-north" class="my-10">
        <h3 class="text-xl sm:text-2xl font-medium text-stone-900 mb-4">
          2. North Bhubaneswar: Modern Living and Connectivity
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
          <strong>Patia, Chandrasekharpur, Niladri Vihar and Sailashree Vihar</strong> have emerged as prominent residential destinations in North Bhubaneswar.
        </p>
        <p class="leading-relaxed text-stone-700 mb-4">
          The growth of educational institutions, IT and employment hubs, commercial spaces and modern residential developments has contributed to the area's popularity.
        </p>
        <p class="leading-relaxed text-stone-700 mb-6">
          For young professionals, students and families, this part of the city offers a combination of urban convenience and growing residential infrastructure. If you are exploring residential projects in Bhubaneswar, North Bhubaneswar is certainly an area worth understanding.
        </p>
      </div>

      <!-- SECTION 3: SOUTH-WEST BHUBANESWAR -->
      <div id="locality-south-west" class="my-10">
        <h3 class="text-xl sm:text-2xl font-medium text-stone-900 mb-4">
          3. South and Western Bhubaneswar: Growing Residential Corridors
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
          Areas around <strong>Khandagiri, Ghatikia, Kalinga Vihar, Tamando</strong> and nearby locations have witnessed considerable residential development.
        </p>
        <p class="leading-relaxed text-stone-700 mb-4">
          These areas can appeal to buyers looking for newer developments, larger residential options and neighbourhoods with potential for further growth.
        </p>
        <p class="leading-relaxed text-stone-700 mb-6">
          However, when considering an emerging locality, don't look only at today's surroundings. Examine road connectivity, nearby amenities, infrastructure, accessibility and planned development before making a decision.
        </p>
      </div>

      <!-- SECTION 4: OLD BHUBANESWAR -->
      <div id="locality-old-town" class="my-10">
        <h3 class="text-xl sm:text-2xl font-medium text-stone-900 mb-4">
          4. Old Bhubaneswar: Heritage and Community
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
          Old Bhubaneswar offers a completely different residential experience. With its temples, traditional neighbourhoods and cultural character, areas around <strong>Old Town</strong> provide a strong connection to the heritage of the city.
        </p>
        <p class="leading-relaxed text-stone-700 mb-6">
          For homebuyers who value established communities and a culturally rich environment, Old Bhubaneswar remains an interesting option.
        </p>
      </div>

      <h2 class="text-2xl sm:text-3xl font-light uppercase tracking-wider text-stone-900 mt-12 mb-6 border-b border-stone-200 pb-3">
        What Should You Check Before Buying a Home?
      </h2>
      <p class="leading-relaxed text-stone-700 mb-4">
        Finding a property that looks good on paper is only the beginning. Before investing in real estate in Bhubaneswar, consider the bigger picture.
      </p>
      <p class="font-medium text-stone-900 mb-4">Ask yourself:</p>
      <ul class="list-disc list-inside space-y-2 text-stone-700 mb-8 pl-2 leading-relaxed">
        <li>How convenient is the location for your daily commute?</li>
        <li>Are schools and hospitals easily accessible?</li>
        <li>How well is the locality connected to major roads?</li>
        <li>Are essential markets and services nearby?</li>
        <li>Is the infrastructure already developed?</li>
        <li>What kind of development is happening around the area?</li>
        <li>Does the locality match your current and future lifestyle?</li>
        <li>Are you buying the property for personal use or investment?</li>
      </ul>

      <h2 class="text-2xl sm:text-3xl font-light uppercase tracking-wider text-stone-900 mt-12 mb-6 border-b border-stone-200 pb-3">
        Understanding the Bhubaneswar Real Estate Market
      </h2>
      <p class="leading-relaxed text-stone-700 mb-6">
        The Bhubaneswar real estate market is not limited to one type of buyer or one kind of locality. Established neighbourhoods continue to attract buyers who prioritise convenience, while emerging areas are gaining attention for their development potential and newer residential options.
      </p>
      <p class="leading-relaxed text-stone-700 mb-6">
        This makes locality research an essential part of buying a home. A well-designed house may attract you initially, but the neighbourhood around it will influence your everyday life for years to come.
      </p>

      <h2 class="text-2xl font-light uppercase tracking-wider text-stone-900 mt-12 mb-4 border-b border-stone-200 pb-3">
        Finding the Right Residential Property in Bhubaneswar
      </h2>
      <p class="leading-relaxed text-stone-700 mb-6">
        Choosing a home is ultimately about finding the right balance between location, connectivity, lifestyle, budget and long-term value.
      </p>
      <p class="leading-relaxed text-stone-700 mb-6">
        For buyers exploring thoughtfully planned residential developments, <strong>OMVIK Realcon</strong> focuses on creating spaces with attention to planning, quality and long-term value. Explore residential opportunities and learn more at <a href="https://www.omvikrealcon.com" target="_blank" class="text-[#e8692b] underline">www.omvikrealcon.com</a>.
      </p>
      <blockquote class="p-6 bg-stone-50 rounded-2xl border-l-4 border-[#e8692b] my-8 font-light text-stone-800 text-lg italic">
        Because when it comes to buying a home, the question isn't simply: <em>Which property should I buy?</em><br/><br/>
        It starts with a much better question: <strong>Where do I see my future?</strong>
      </blockquote>
    `,
  },
  {
    slug: "what-is-rera-and-why-should-property-buyers-care",
    category: "Guides",
    date: "12 Oct 2026",
    title: "What Is RERA and Why Should Property Buyers Care?",
    excerpt:
      "Buying a property is a big decision. RERA helps you make it with more confidence. Discover how RERA and ORERA protect property buyers in Bhubaneswar and Odisha.",
    coverImage: "/images/blog-rera-hero.png",
    images: ["/images/blog-rera-hero.png"],
    author: "OMVIK Legal Insights",
    readTime: "5 min read",
    content: `
      <p class="text-lg leading-relaxed text-stone-700 mb-6 font-light">
        Buying a property is a big decision. RERA helps you make it with more confidence.
      </p>

      <p class="leading-relaxed text-stone-700 mb-6">
        Buying a home is exciting. You start imagining the rooms, the neighbourhood, the view from the balcony and the life you will build there. But behind that excitement comes a long list of questions:
      </p>

      <ul class="list-disc list-inside space-y-2 text-stone-700 mb-6 pl-2 leading-relaxed">
        <li>Is the project legally approved?</li>
        <li>Will the property be delivered on time?</li>
        <li>Is the developer providing what was promised?</li>
        <li>What happens if something goes wrong?</li>
      </ul>

      <p class="leading-relaxed text-stone-700 mb-6">
        This is where <strong>RERA</strong> becomes important. The Real Estate (Regulation and Development) Act, 2016, commonly known as RERA, was introduced to bring greater transparency, accountability and protection to the real estate sector in India.
      </p>

      <p class="leading-relaxed text-stone-700 mb-6">
        For a first-time property buyer, understanding RERA can make the buying process considerably more informed.
      </p>

      <h2 class="text-2xl sm:text-3xl font-light uppercase tracking-wider text-stone-900 mt-12 mb-6 border-b border-stone-200 pb-3">
        What Exactly Is RERA?
      </h2>

      <p class="leading-relaxed text-stone-700 mb-6">
        RERA is a law created to regulate the real estate sector and protect the interests of homebuyers. Under RERA, eligible real estate projects and real estate agents are required to register with the respective state's RERA authority before undertaking certain activities related to the sale of properties.
      </p>

      <p class="leading-relaxed text-stone-700 mb-6">
        Every state has its own regulatory authority. In Odisha, the regulatory body is <strong>Odisha Real Estate Regulatory Authority (ORERA)</strong>.
      </p>

      <p class="text-base font-medium text-[#e8692b] bg-[#e8692b]/10 p-5 rounded-2xl border border-[#e8692b]/20 mb-8">
        The basic idea is simple: <strong>Developers have responsibilities and property buyers have rights.</strong>
      </p>

      <h2 class="text-2xl sm:text-3xl font-light uppercase tracking-wider text-stone-900 mt-12 mb-6 border-b border-stone-200 pb-3">
        Why Was RERA Introduced?
      </h2>

      <p class="leading-relaxed text-stone-700 mb-6">
        Before RERA, property buyers could face challenges such as project delays, changes in promised specifications, lack of transparency and unclear information about project approvals.
      </p>

      <p class="leading-relaxed text-stone-700 mb-6">
        RERA was introduced to create a more organised framework for real estate transactions. It encourages developers to provide important project information and gives buyers a regulatory mechanism to approach in case of certain disputes. For someone investing their savings into a home, that transparency matters.
      </p>

      <h2 class="text-2xl sm:text-3xl font-light uppercase tracking-wider text-stone-900 mt-12 mb-6 border-b border-stone-200 pb-3">
        What Should Property Buyers Check?
      </h2>

      <p class="leading-relaxed text-stone-700 mb-6">
        If you are planning to buy a residential property, don't just look at the brochure, sample flat or sales pitch. Take some time to verify the project's RERA information:
      </p>

      <div class="space-y-6 my-8">
        <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <h3 class="text-xl font-medium text-stone-900 mb-2">1. Check the RERA Registration</h3>
          <p class="text-stone-700 leading-relaxed">
            For a project that falls within the scope of RERA registration requirements, verify whether it is registered with the relevant state authority. You should be able to find important project information through the state's RERA portal. For Odisha properties, buyers can check project details through the <strong>ORERA</strong> system.
          </p>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <h3 class="text-xl font-medium text-stone-900 mb-2">2. Verify the Project Details</h3>
          <p class="text-stone-700 leading-relaxed">
            RERA registration can provide buyers with access to important information about a project. Depending on the project and information filed, this can include details about the promoter, project location, approvals, development timelines and other relevant disclosures. Compare this information with what you are being told by the developer.
          </p>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <h3 class="text-xl font-medium text-stone-900 mb-2">3. Pay Attention to the Possession Timeline</h3>
          <p class="text-stone-700 leading-relaxed">
            One of the biggest concerns for property buyers is delay. Before purchasing, understand the project's proposed completion and possession timeline. A promised possession date should not simply be taken verbally—review the relevant documentation and registered project details.
          </p>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <h3 class="text-xl font-medium text-stone-900 mb-2">4. Understand What You Are Buying</h3>
          <p class="text-stone-700 leading-relaxed">
            Property buyers should carefully review the specifications, carpet area, amenities, layout and other commitments associated with the property. Don't make a decision based only on a model apartment or promotional material. Read the agreement and understand what is actually being offered.
          </p>
        </div>

        <div class="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm">
          <h3 class="text-xl font-medium text-stone-900 mb-2">5. Know That You Have a Regulatory Remedy</h3>
          <p class="text-stone-700 leading-relaxed">
            RERA does not mean that every property-related disagreement automatically disappears. However, it provides a regulatory framework through which eligible complaints can be addressed. If a buyer believes that a promoter or agent has violated applicable RERA provisions, the buyer can explore the complaint mechanism provided by the relevant state authority.
          </p>
        </div>
      </div>

      <h2 class="text-2xl sm:text-3xl font-light uppercase tracking-wider text-stone-900 mt-12 mb-6 border-b border-stone-200 pb-3">
        Does RERA Mean a Property Is Automatically Risk-Free?
      </h2>

      <p class="leading-relaxed text-stone-700 mb-6">
        <strong>No.</strong> This is an important point for every buyer to understand.
      </p>

      <p class="leading-relaxed text-stone-700 mb-6">
        RERA registration is an important checkpoint, but it should not be the only one. A property purchase involves several other aspects, including title verification, approvals, land ownership, financing, construction quality, location and the terms of the sale agreement.
      </p>

      <p class="leading-relaxed text-stone-700 mb-6">
        For a major financial decision like buying a home, buyers should consider getting documents reviewed by an appropriate legal or property professional.
      </p>

      <h2 class="text-2xl sm:text-3xl font-light uppercase tracking-wider text-stone-900 mt-12 mb-6 border-b border-stone-200 pb-3">
        A Simple RERA Checklist for Buyers
      </h2>

      <p class="leading-relaxed text-stone-700 mb-4">Before booking a property, consider checking:</p>

      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-stone-700 text-sm font-medium">
        <li class="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-center gap-2">✔ RERA registration details</li>
        <li class="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-center gap-2">✔ Promoter/developer information</li>
        <li class="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-center gap-2">✔ Project approvals & disclosures</li>
        <li class="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-center gap-2">✔ Project completion timeline</li>
        <li class="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-center gap-2">✔ Carpet area & specifications</li>
        <li class="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-center gap-2">✔ Agreement for Sale terms</li>
        <li class="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-center gap-2">✔ Payment schedule</li>
        <li class="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-center gap-2">✔ Cancellation & refund terms</li>
      </ul>

      <h2 class="text-2xl font-light uppercase tracking-wider text-stone-900 mt-12 mb-4 border-b border-stone-200 pb-3">
        The Bottom Line
      </h2>

      <p class="leading-relaxed text-stone-700 mb-6">
        Buying a property should be exciting but not confusing. RERA has helped create a more transparent regulatory framework for India's real estate sector and has given property buyers a stronger basis for understanding projects and exercising their rights.
      </p>

      <p class="leading-relaxed text-stone-700 mb-6">
        But the smartest approach is still to verify, read and ask questions before you invest. Whether you are buying your first apartment, a plot or another type of residential property, don't be afraid to ask for documents and clarification. Because when it comes to your home and your hard earned money, being informed isn't an extra step. It is an essential one.
      </p>

      <p class="text-xs text-stone-400 italic mt-8 pt-4 border-t border-stone-200">
        Note: This article is for general informational purposes and should not be treated as legal advice. RERA requirements and procedures can vary by project and state, so buyers should verify the latest information with the relevant authority or a qualified professional.
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
