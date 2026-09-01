import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ContactBand } from "@/components/Marketing";
import { articles, getArticle } from "@/data/articles";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => ({ article: getArticle(params.slug) ?? articles[0] }),
  head: ({ loaderData, params }) => ({
    meta: [
      {
        title:
          loaderData?.article.seoTitle ?? `${loaderData?.article.title ?? "Article"} | BitLabs`,
      },
      { name: "description", content: loaderData?.article.excerpt ?? "" },
      { property: "og:title", content: loaderData?.article.title ?? "BitLabs article" },
      { property: "og:description", content: loaderData?.article.excerpt ?? "" },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `https://bitlabsbuild.com/blog/${params.slug}` },
      ...(loaderData?.article.featuredImage
        ? [
            {
              property: "og:image",
              content: `https://bitlabsbuild.com${loaderData.article.featuredImage.src}`,
            },
            { property: "og:image:alt", content: loaderData.article.featuredImage.alt },
          ]
        : []),
      { name: "twitter:card", content: "summary_large_image" },
      ...(loaderData?.article.featuredImage
        ? [
            {
              name: "twitter:image",
              content: `https://bitlabsbuild.com${loaderData.article.featuredImage.src}`,
            },
            { name: "twitter:image:alt", content: loaderData.article.featuredImage.alt },
          ]
        : []),
    ],
    links: [{ rel: "canonical", href: `https://bitlabsbuild.com/blog/${params.slug}` }],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const articleUrl = `https://bitlabsbuild.com/blog/${article.slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.excerpt,
      ...(article.publishedDate
        ? { datePublished: article.publishedDate, dateModified: article.publishedDate }
        : {}),
      ...(article.featuredImage
        ? { image: `https://bitlabsbuild.com${article.featuredImage.src}` }
        : {}),
      mainEntityOfPage: articleUrl,
      author: { "@type": "Organization", name: "BitLabs" },
      publisher: { "@type": "Organization", name: "BitLabs", url: "https://bitlabsbuild.com" },
    },
    ...(article.faqs
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: article.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]
      : []),
  ];
  return (
    <div className="overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <header className="hero-panel relative text-white">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-24">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.15em] text-slate-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All articles
          </Link>
          <p className="eyebrow mt-14 text-lime">{article.category}</p>
          <h1 className="mt-6 text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-.055em]">
            {article.title}
          </h1>
          <p className="mt-8 text-sm text-slate-400">
            {article.date} · {article.read}
          </p>
        </div>
      </header>
      <article className="mx-auto max-w-3xl px-5 py-20 sm:px-8 lg:py-28">
        <p className="text-xl leading-9 text-[#3f4b44]">{article.intro}</p>
        {article.video && (
          <figure className="mt-12">
            <div className="aspect-video overflow-hidden bg-navy">
              <iframe
                className="h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${article.video.youtubeId}`}
                title={article.video.title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <figcaption className="mt-3 text-sm text-[#69736d]">
              Watch: {article.video.title}
            </figcaption>
          </figure>
        )}
        <div className="mt-16 space-y-14">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-3xl font-semibold tracking-[-.035em] text-navy">
                {section.heading}
              </h2>
              <div className="mt-6 space-y-5">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-[#59645f]">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets && (
                <ul className="mt-6 space-y-3 border-l-2 border-lime pl-6">
                  {section.bullets.map((item) => (
                    <li key={item} className="text-sm leading-6 text-[#465249]">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {article.subsections?.[section.heading]?.map((subsection) => (
                <div key={subsection.heading} className="mt-10">
                  <h3 className="text-xl font-semibold tracking-[-.025em] text-navy">
                    {subsection.heading}
                  </h3>
                  <div className="mt-4 space-y-4">
                    {subsection.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-[#59645f]">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {subsection.bullets && (
                    <ul className="mt-5 space-y-3 border-l-2 border-lime pl-6">
                      {subsection.bullets.map((item) => (
                        <li key={item} className="text-sm leading-6 text-[#465249]">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              {section.heading === "Spreadsheet vs SaaS vs custom software" &&
                article.decisionTable && (
                  <div className="mt-8 overflow-x-auto border border-[#dce1dd]">
                    <table className="w-full min-w-[34rem] border-collapse text-left">
                      <thead className="bg-navy text-white">
                        <tr>
                          <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[.12em]">
                            Situation
                          </th>
                          <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[.12em]">
                            Best starting point
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {article.decisionTable.map((row, index) => (
                          <tr
                            key={row.situation}
                            className={index % 2 ? "bg-[#f3f5f3]" : "bg-white"}
                          >
                            <td className="px-5 py-4 text-sm text-[#465249]">{row.situation}</td>
                            <td className="px-5 py-4 text-sm font-semibold text-forest">
                              {row.recommendation}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
            </section>
          ))}
        </div>
        {article.relatedLinks && (
          <aside
            className="mt-16 border-y border-[#dce1dd] py-10"
            aria-labelledby="related-reading"
          >
            <h2 id="related-reading" className="text-xl font-semibold tracking-[-.025em] text-navy">
              Explore more from BitLabs
            </h2>
            <ul className="mt-6 space-y-5">
              {article.relatedLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-forest"
                  >
                    {item.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <p className="mt-1 text-sm leading-6 text-[#69736d]">{item.note}</p>
                </li>
              ))}
            </ul>
          </aside>
        )}
        {article.faqs && (
          <section className="mt-20 border-t border-[#dce1dd] pt-14">
            <p className="eyebrow text-forest">Common questions</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-.035em] text-navy">
              Frequently asked questions
            </h2>
            <div className="mt-8 divide-y divide-[#dce1dd]">
              {article.faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="cursor-pointer list-none pr-8 text-base font-semibold text-navy marker:hidden">
                    {faq.question}
                  </summary>
                  <p className="mt-3 pr-6 text-sm leading-7 text-[#59645f]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}
        {article.sources && (
          <section className="mt-16 border-t border-[#dce1dd] pt-10">
            <h2 className="text-xl font-semibold tracking-[-.025em] text-navy">
              Sources and further reading
            </h2>
            <ul className="mt-5 space-y-4">
              {article.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest hover:underline"
                  >
                    {source.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <p className="mt-1 text-sm leading-6 text-[#69736d]">{source.note}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
        <div className="mt-16 border-t border-[#dce1dd] pt-8">
          <p className="mb-5 text-base leading-7 text-[#59645f]">
            {article.closing ??
              "Have a business process that feels harder than it should? Talk to BitLabs about the process before talking about the technology."}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-forest"
          >
            Contact BitLabs <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
      <ContactBand
        title="Need a team that can take software from idea to launch?"
        text="BitLabs designs and engineers web, mobile, desktop and cloud products for ambitious organisations."
      />
    </div>
  );
}
