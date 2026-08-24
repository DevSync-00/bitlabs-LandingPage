import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { ContactBand } from "@/components/Marketing";
import { getProduct } from "@/data/products";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => { const product = getProduct(params.slug); if (!product) throw notFound(); return { product }; },
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.product.name ?? "Product"} Case Study | BitLabs Technology` },
    { name: "description", content: loaderData?.product.description ?? "" },
    { property: "og:title", content: `${loaderData?.product.name ?? "Product"} — Built by BitLabs` },
    { property: "og:description", content: loaderData?.product.tagline ?? "" },
    { property: "og:type", content: "article" },
  ] }),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  return <div className="overflow-hidden">
    <section className="hero-panel relative text-white"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
      <Link to="/products" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.15em] text-slate-400"><ArrowLeft className="h-3.5 w-3.5" />All work</Link>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end"><div><p className="eyebrow text-lime">{product.type}</p><h1 className="mt-6 text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-none tracking-[-.06em]">{product.name}</h1></div><div><p className="text-lg leading-8 text-slate-300">{product.tagline}</p><a href={product.url} target="_blank" rel="noreferrer" className="button-primary mt-7">Visit live product <ArrowUpRight className="h-4 w-4" /></a></div></div>
    </div></section>
    <section className="section-shell"><div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:px-10"><div><p className="eyebrow text-forest">The product</p><h2 className="mt-5 text-3xl font-semibold tracking-[-.04em] text-navy">Purpose-built around a clear user need.</h2></div><div><p className="text-lg leading-8 text-[#59645f]">{product.description}</p><div className="mt-8 flex flex-wrap gap-2">{product.tags.map(tag => <span key={tag} className="bg-[#edf2ed] px-3 py-2 text-xs font-medium text-forest">{tag}</span>)}</div></div></div></section>
    <section className="section-shell bg-[#f4f6f3]"><div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><p className="eyebrow text-forest">Core capabilities</p><div className="mt-10 grid border-l border-t border-[#d1d8d2] md:grid-cols-2">{product.features.map((feature, index) => <div key={feature.title} className="border-b border-r border-[#d1d8d2] bg-white p-8 lg:p-10"><span className="text-xs font-semibold text-forest">{String(index + 1).padStart(2, "0")}</span><h3 className="mt-8 text-xl font-semibold text-navy">{feature.title}</h3><p className="mt-3 text-sm leading-6 text-[#66716b]">{feature.desc}</p></div>)}</div></div></section>
    <section className="section-shell"><div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-2 lg:px-10"><div><p className="eyebrow text-forest">Product value</p><ul className="mt-7 space-y-4">{product.benefits.map(item => <li key={item} className="flex gap-3 text-sm text-[#465249]"><Check className="mt-0.5 h-4 w-4 shrink-0 text-forest" />{item}</li>)}</ul></div><div><p className="eyebrow text-forest">Built for</p><ul className="mt-7 space-y-4">{product.useCases.map(item => <li key={item} className="border-b border-[#dce1dd] pb-4 text-sm text-[#465249]">{item}</li>)}</ul></div></div></section>
    <ContactBand title={`Want to build the next ${product.name}?`} text="Bring us the problem. We will help shape, design and engineer the product around it." />
  </div>;
}
