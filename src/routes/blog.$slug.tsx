import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ContactBand } from "@/components/Marketing";
import { articles, getArticle } from "@/data/articles";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => ({ article: getArticle(params.slug) ?? articles[0] }),
  head: ({ loaderData }) => ({ meta: [
    { title: `${loaderData?.article.title ?? "Article"} | BitLabs` },
    { name: "description", content: loaderData?.article.excerpt ?? "" },
    { property: "og:title", content: loaderData?.article.title ?? "BitLabs article" },
    { property: "og:description", content: loaderData?.article.excerpt ?? "" },
    { property: "og:type", content: "article" },
  ] }),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  return <div className="bg-white dark:bg-white">
    <header className="bg-navy text-white"><div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-24"><Link to="/blog" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.15em] text-slate-400"><ArrowLeft className="h-3.5 w-3.5" />All articles</Link><p className="eyebrow mt-14 text-lime">{article.category}</p><h1 className="mt-6 text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-.055em]">{article.title}</h1><p className="mt-8 text-sm text-slate-400">{article.date} · {article.read}</p></div></header>
    <article className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-28"><p className="text-xl leading-9 text-[#3f4b44]">{article.intro}</p><div className="mt-16 space-y-14">{article.sections.map(section => <section key={section.heading}><h2 className="text-3xl font-semibold tracking-[-.035em] text-navy">{section.heading}</h2><div className="mt-6 space-y-5">{section.paragraphs.map(paragraph => <p key={paragraph} className="text-base leading-8 text-[#59645f]">{paragraph}</p>)}</div>{section.bullets && <ul className="mt-6 space-y-3 border-l-2 border-lime pl-6">{section.bullets.map(item => <li key={item} className="text-sm leading-6 text-[#465249]">{item}</li>)}</ul>}</section>)}</div><div className="mt-16 border-t border-[#dce1dd] pt-8"><Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-forest">Discuss a product with BitLabs <ArrowUpRight className="h-4 w-4" /></Link></div></article>
    <ContactBand title="Need a team that can take software from idea to launch?" text="BitLabs designs and engineers web, mobile, desktop and cloud products for ambitious organisations." />
  </div>;
}
