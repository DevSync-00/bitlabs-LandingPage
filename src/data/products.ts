export interface Product {
  slug: string;
  name: string;
  url: string;
  type: string;
  tagline: string;
  description: string;
  tags: string[];
  features: { title: string; desc: string }[];
  benefits: string[];
  useCases: string[];
}

const productCatalog: Product[] = [
  {
    slug: "tankua",
    name: "Tankua",
    url: "https://tankua.co",
    type: "Travel marketplace · Mobile app",
    tagline: "A local-first way to discover and book tours across Ethiopia.",
    description: "Tankua connects travellers with guides who know Ethiopia's regions first-hand. The product brings destination discovery, curated tours, guide profiles, multilingual support and ETB or international-card payments into one approachable travel experience.",
    tags: ["Travel technology", "Marketplace", "Mobile app", "Payments"],
    features: [
      { title: "Regional discovery", desc: "Explore tours and destinations across Ethiopia, from the Simien Mountains to Lalibela, Danakil and the Omo Valley." },
      { title: "Local guide marketplace", desc: "Verified listings connect travellers directly with guides who live in and understand each region." },
      { title: "Flexible local payments", desc: "Clear ETB and USD pricing supports both local payment expectations and international travellers." },
      { title: "Multilingual experience", desc: "An accessible product experience supported by Amharic, Oromifa and English assistance." },
    ],
    benefits: ["Makes Ethiopian travel easier to discover and book", "Creates a digital route to market for local guides", "Supports both domestic and international travellers", "Builds trust through verified, reviewable listings"],
    useCases: ["Tour discovery and booking", "Guide and provider onboarding", "Destination planning", "Local and international travel payments"],
  },
  {
    slug: "mescott",
    name: "Mescott",
    url: "https://mescott.co",
    type: "Services marketplace · Mobile app",
    tagline: "Trusted local help for Ethiopian homes and businesses.",
    description: "Mescott is a two-sided local-services marketplace for finding cleaners, handypeople, technicians and specialist trades. Customers can post a task, compare offers, chat in-app and release secure ETB payment after the work is complete.",
    tags: ["Marketplace", "Mobile app", "Local services", "Fintech"],
    features: [
      { title: "Task-based matching", desc: "Customers describe a job, location and budget before receiving offers from relevant local professionals." },
      { title: "Profiles and reviews", desc: "Work history, ratings and completed tasks give customers evidence before they hire." },
      { title: "In-app communication", desc: "Customers and taskers clarify scope, timing and expectations in one accountable conversation." },
      { title: "Secure ETB checkout", desc: "A structured payment flow keeps the agreement and release of funds clear for both sides." },
    ],
    benefits: ["Reduces friction when hiring local professionals", "Helps independent taskers build a visible reputation", "Keeps discovery, chat and payment in one flow", "Supports household and business service needs"],
    useCases: ["Home cleaning and repairs", "Technical support", "Electrical and trade work", "Moving and renovation help"],
  },
  {
    slug: "redfox",
    name: "RedFox",
    url: "https://redfox.bitlabsbuild.com",
    type: "Enterprise cybersecurity platform",
    tagline: "Human-risk management that turns security awareness into measurable resilience.",
    description: "RedFox helps organisations strengthen the human layer of cybersecurity through adaptive phishing simulations, short workflow-native training and real-time risk reporting. Its compliance pathways and audit trails are designed for security-conscious enterprise teams.",
    tags: ["Cybersecurity", "Enterprise SaaS", "Compliance", "Analytics"],
    features: [
      { title: "Adaptive simulations", desc: "Role-aware phishing and quishing drills evolve with employee behaviour and current threat patterns." },
      { title: "Human Risk Index", desc: "Department-level telemetry makes security behaviour visible and gives teams a measurable baseline." },
      { title: "Micro-learning", desc: "Two-minute lessons delivered through web, Slack and Teams reinforce safer behaviour at the right moment." },
      { title: "Compliance evidence", desc: "Mapped training pathways and audit trails support ISO 27001, SOC 2 and GDPR programmes." },
    ],
    benefits: ["Identifies high-risk behaviours before a real incident", "Makes awareness training continuous and measurable", "Reduces reporting time with clear telemetry", "Creates audit-ready compliance evidence"],
    useCases: ["Security awareness programmes", "Phishing resilience testing", "Executive and department risk reporting", "Compliance training and audits"],
  },
  {
    slug: "pharmastop",
    name: "PharmaStop",
    url: "https://pharmastop.bitlabsbuild.com",
    type: "Pharmacy management desktop application",
    tagline: "Clinical-grade pharmacy operations across every branch.",
    description: "PharmaStop is a multi-branch pharmacy management system built for Ethiopian pharmacies. It brings inventory control, shift operations and profitability monitoring into a focused desktop application designed for the realities of retail pharmacy.",
    tags: ["Healthtech", "Desktop app", "Inventory", "Multi-branch"],
    features: [
      { title: "Medicine inventory", desc: "Track stock across pharmacy locations and give teams a clearer operational view of available medicines." },
      { title: "Branch visibility", desc: "Bring multiple branches into one management experience instead of isolated spreadsheets and records." },
      { title: "Shift management", desc: "Support day-to-day staff and counter operations with structured shift tracking." },
      { title: "Profitability monitoring", desc: "Give operators the information needed to understand performance across their pharmacy network." },
    ],
    benefits: ["Improves inventory visibility across locations", "Standardises pharmacy operating workflows", "Gives owners a clearer view of branch performance", "Replaces fragmented manual management"],
    useCases: ["Independent pharmacies", "Multi-branch pharmacy groups", "Medicine stock management", "Retail performance oversight"],
  },
  {
    slug: "sinq-authoring",
    name: "SINQ Authoring Tool",
    url: "https://sinq-authoring.vercel.app",
    type: "Open-source Windows desktop application",
    tagline: "Adapt course authoring, packaged into a zero-configuration desktop tool.",
    description: "SINQ packages the power of the Adapt Framework into a portable Windows application. An embedded MongoDB setup removes server configuration, while local-first storage and desktop security controls keep course projects on the author's machine.",
    tags: ["Edtech", "Open source", "Desktop app", "Developer tools"],
    features: [
      { title: "Zero-config packaging", desc: "A portable executable with embedded MongoDB removes servers, cloud accounts and setup wizards." },
      { title: "Local-first authoring", desc: "Course projects remain on the user's computer, supporting privacy and offline workflows." },
      { title: "Desktop hardening", desc: "Content security policy, navigation locking and secure session handling protect the packaged environment." },
      { title: "Fast previews and builds", desc: "The Adapt Framework is optimised for a responsive desktop authoring workflow." },
    ],
    benefits: ["Makes Adapt accessible to non-server users", "Reduces installation and maintenance overhead", "Keeps sensitive course content local", "Supports offline authoring workflows"],
    useCases: ["eLearning course production", "Offline training content", "Adapt Framework prototyping", "Secure local authoring"],
  },
  {
    slug: "lifelens",
    name: "LifeLens",
    url: "https://lifelens.bitlabsbuild.com",
    type: "Personal health record platform",
    tagline: "A private, chronological home for personal and family health information.",
    description: "LifeLens brings medical documents, medications, personal check-ins and family health records into one searchable timeline. It is deliberately designed to organise and retrieve information—not diagnose conditions or recommend treatment—with permissioned sharing controlled by the record owner.",
    tags: ["Healthtech", "Personal health record", "Privacy", "SaaS"],
    features: [
      { title: "Health timeline", desc: "Documents, medication changes and manual entries appear together in chronological context." },
      { title: "Everyday check-ins", desc: "Users can record sleep, energy, pain, mood and mobility between formal appointments." },
      { title: "Document organisation", desc: "Visit notes, lab reports and discharge papers remain private, intact and searchable." },
      { title: "Permissioned family access", desc: "Invitations are category-specific, revocable and controlled by the record owner." },
    ],
    benefits: ["Reduces reliance on memory during appointments", "Unifies records scattered across portals and folders", "Supports family care without giving up control", "Maintains a clear boundary from diagnosis or treatment advice"],
    useCases: ["Long-term personal health histories", "Preparing for medical appointments", "Family health organisation", "Medication and document records"],
  },
  {
    slug: "dev-sync",
    name: "Dev-Sync",
    url: "https://dev-sync.dev",
    type: "Developer infrastructure platform",
    tagline: "Continuous database integration and schema-drift prevention.",
    description: "Dev-Sync gives engineering teams a safer, visible workflow for database change control. It detects schema divergence, previews exact SQL and lock impact, rehearses changes on shadow databases and gates promotion from development to production with explicit approvals and audit trails.",
    tags: ["DevTools", "Databases", "CI/CD", "PostgreSQL"],
    features: [
      { title: "Automated drift detection", desc: "Read-only checks compare code and live database schemas in local and pull-request workflows." },
      { title: "Migration preflight", desc: "SQL previews, destructive-DDL flags, lock estimates and rollback coverage expose risk before execution." },
      { title: "Ephemeral previews", desc: "Isolated PostgreSQL and Neon database branches let teams rehearse changes safely." },
      { title: "Multi-environment promotion", desc: "Explicit gates control migration movement through development, staging and production." },
    ],
    benefits: ["Catches schema drift before it reaches customers", "Makes database changes reviewable and auditable", "Reduces migration surprises and downtime risk", "Works across popular PostgreSQL ORMs and CI/CD workflows"],
    useCases: ["Pull-request schema checks", "Production migration reviews", "Database environment promotion", "ORM and live-schema reconciliation"],
  },
];

const productOrder = [
  "redfox",
  "tankua",
  "dev-sync",
  "sinq-authoring",
  "mescott",
  "pharmastop",
  "lifelens",
];

export const products = productOrder
  .map((slug) => productCatalog.find((product) => product.slug === slug))
  .filter((product): product is Product => Boolean(product));

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
