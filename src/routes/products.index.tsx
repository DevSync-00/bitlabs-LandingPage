import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { products } from "@/data/products";
import { ContactBand, PageHero } from "@/components/Marketing";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Our Work | Software Products Built by BitLabs Technology" },
      { name: "description", content: "Explore real mobile apps, enterprise platforms, healthtech, cybersecurity and developer tools designed and built by BitLabs Technology." },
      { property: "og:title", content: "Products and digital platforms built by BitLabs" },
      { property: "og:description", content: "Seven real products spanning travel, local services, health, cybersecurity, education and developer infrastructure." },
    ],
  }),
  component: Products,
});

function Products() {
  return <div className="bg-white dark:bg-white">
    <PageHero eyebrow="Selected work" title="Real products, built for real-world use." intro="From Ethiopian consumer marketplaces to global developer infrastructure, these are products our team has designed and engineered—not concept pieces." />
    <section className="section-shell">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-10 flex items-end justify-between border-b border-[#d4dad5] pb-6">
          <div><p className="eyebrow text-forest">BitLabs portfolio</p><h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] text-navy">Seven products. Seven distinct problems.</h2></div>
          <span className="hidden text-sm text-[#66716b] md:block">Web, mobile, desktop and infrastructure</span>
        </div>
        <div className="grid border-l border-t border-[#d4dad5] md:grid-cols-2">
          {products.map((product, index) => <Link key={product.slug} to="/products/$slug" params={{ slug: product.slug }} className="group flex min-h-[330px] flex-col border-b border-r border-[#d4dad5] p-8 transition-colors hover:bg-[#f2f7ef] lg:p-10">
            <div className="flex items-start justify-between"><span className="text-xs font-semibold text-forest">{String(index + 1).padStart(2, "0")}</span><ArrowUpRight className="h-4 w-4 text-[#929b96] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-forest" /></div>
            <div className="mt-auto pt-16"><p className="text-xs font-semibold uppercase tracking-[.12em] text-[#7b857f]">{product.type}</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.04em] text-navy">{product.name}</h2><p className="mt-3 max-w-md text-sm leading-6 text-[#66716b]">{product.tagline}</p></div>
          </Link>)}
        </div>
      </div>
    </section>
    <ContactBand title="Have a product that needs to become real?" text="We turn complex ideas into dependable web, mobile, desktop and cloud products—from discovery through launch." />
  </div>;
}
