import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { PageHero } from "@/components/Marketing";
import { articles } from "@/data/articles";

export const Route = createFileRoute("/blog/")({
  head: () => ({ meta: [
    { title: "BitLabs Blog | Software, Mobile Apps, Healthtech & DevOps" },
    { name: "description", content: "Practical software engineering insights from BitLabs on mobile products, privacy-first healthtech, product strategy and safe database delivery." },
    { property: "og:title", content: "BitLabs software engineering blog" },
    { property: "og:description", content: "Field notes from teams building marketplaces, healthcare platforms and developer infrastructure." },
  ] }),
  component: BlogIndex,
});

function BlogIndex() {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => articles.filter(article => `${article.title} ${article.excerpt} ${article.category}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const featured = articles[0];
  return <div className="overflow-hidden">
    <PageHero eyebrow="Blog" title="Insights on software, AI, and delivery." intro="Practical articles from our team on building software, managing technical risk, and scaling development capability." />
    <section className="section-shell"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
      <article className="grid border border-[#d4dad5] lg:grid-cols-[1.1fr_.9fr]"><div className="bg-navy p-8 text-white lg:p-12"><span className="eyebrow text-lime">Featured · {featured.category}</span><h2 className="mt-12 max-w-2xl text-3xl font-semibold leading-tight tracking-[-.04em] md:text-5xl">{featured.title}</h2></div><div className="flex flex-col justify-between p-8 lg:p-12"><div><p className="text-xs font-medium uppercase tracking-[.12em] text-[#7b857f]">{featured.date} · {featured.read}</p><p className="mt-6 text-base leading-7 text-[#59645f]">{featured.excerpt}</p></div><Link to="/blog/$slug" params={{ slug: featured.slug }} className="mt-12 inline-flex items-center gap-2 text-sm font-semibold text-forest">Read article <ArrowUpRight className="h-4 w-4" /></Link></div></article>
      <div className="mt-20 flex flex-col gap-6 border-b border-[#d4dad5] pb-6 md:flex-row md:items-end md:justify-between"><div><p className="eyebrow text-forest">Latest articles</p><h2 className="mt-4 text-3xl font-semibold tracking-[-.04em] text-navy">Engineering notes for product teams</h2></div><label className="flex w-full max-w-sm items-center gap-3 border-b border-[#aeb7b0] py-3"><Search className="h-4 w-4 text-[#718078]" /><span className="sr-only">Search the blog</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search articles" className="w-full bg-transparent text-sm text-navy outline-none placeholder:text-[#929a95]" /></label></div>
      <div>{filtered.map(article => <Link key={article.slug} to="/blog/$slug" params={{ slug: article.slug }} className="group grid gap-5 border-b border-[#dce1dd] py-8 md:grid-cols-[.35fr_1fr_auto] md:items-center"><span className="text-xs font-semibold uppercase tracking-[.12em] text-forest">{article.category}</span><div><h3 className="text-xl font-semibold tracking-[-.025em] text-navy group-hover:text-forest">{article.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-[#69736d]">{article.excerpt}</p></div><span className="flex items-center gap-2 text-xs text-[#828c86]">{article.read}<ArrowUpRight className="h-4 w-4" /></span></Link>)}</div>
      {filtered.length === 0 && <p className="py-16 text-center text-sm text-[#69736d]">No articles match that search.</p>}
    </div></section>
  </div>;
}
