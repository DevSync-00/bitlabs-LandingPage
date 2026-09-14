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
      <header className="hero-panel relative text-foreground transition-colors">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8 lg:py-24">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.15em] text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All articles
          </Link>
          <p className="eyebrow mt-14 text-primary">{article.category}</p>
          <h1 className="mt-6 text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-[1.02] tracking-[-.055em] text-foreground">
            {article.title}
          </h1>
          <p className="mt-8 text-sm text-muted-foreground">
            {article.date} · {article.read}
          </p>
        </div>
      </header>
      {article.featuredImage && (
        <figure className="mx-auto mt-12 max-w-5xl px-5 sm:px-8">
          <img
            src={article.featuredImage.src}
            alt={article.featuredImage.alt}
            width={1600}
            height={900}
            className="h-auto w-full border border-border"
          />
        </figure>
      )}
      <article className="mx-auto my-12 max-w-3xl border border-border bg-card p-8 text-card-foreground sm:p-12">
        <p className="text-xl leading-9 text-foreground">{article.intro}</p>
        {article.video && (
          <figure className="mt-12">
            <div className="aspect-video overflow-hidden rounded-lg bg-navy/20 border border-border/60">
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
            <figcaption className="mt-3 text-sm text-muted-foreground">
              Watch: {article.video.title}
            </figcaption>
          </figure>
        )}
        <div className="mt-16 space-y-14">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-3xl font-semibold tracking-[-.035em] text-foreground">
                {section.heading}
              </h2>
              <div className="mt-6 space-y-5">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-8 text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
              {section.bullets && (
                <ul className="mt-6 space-y-3 border-l-2 border-primary pl-6">
                  {section.bullets.map((item) => (
                    <li key={item} className="text-sm leading-6 text-foreground/90">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {article.subsections?.[section.heading]?.map((subsection) => (
                <div key={subsection.heading} className="mt-10">
                  <h3 className="text-xl font-semibold tracking-[-.025em] text-foreground">
                    {subsection.heading}
                  </h3>
                  <div className="mt-4 space-y-4">
                    {subsection.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-muted-foreground">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {subsection.bullets && (
                    <ul className="mt-5 space-y-3 border-l-2 border-primary pl-6">
                      {subsection.bullets.map((item) => (
                        <li key={item} className="text-sm leading-6 text-foreground/90">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              {section.heading === "Spreadsheet vs SaaS vs custom software" &&
                article.decisionTable && (
                  <div className="mt-8 overflow-x-auto rounded-lg border border-border/60">
                    <table className="w-full min-w-[34rem] border-collapse text-left">
                      <thead className="bg-muted text-foreground">
                        <tr>
                          <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground">
                            Situation
                          </th>
                          <th className="px-5 py-4 text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground">
                            Best starting point
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border/40">
                        {article.decisionTable.map((row, index) => (
                          <tr
                            key={row.situation}
                            className={index % 2 ? "bg-muted/20" : "bg-card"}
                          >
                            <td className="px-5 py-4 text-sm text-foreground/90">{row.situation}</td>
                            <td className="px-5 py-4 text-sm font-semibold text-primary">
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
            className="mt-16 border-y border-border/60 py-10"
            aria-labelledby="related-reading"
          >
            <h2 id="related-reading" className="text-xl font-semibold tracking-[-.025em] text-foreground">
              Explore more from BitLabs
            </h2>
            <ul className="mt-6 space-y-5">
              {article.relatedLinks.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                  >
                    {item.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.note}</p>
                </li>
              ))}
            </ul>
          </aside>
        )}
        {article.faqs && (
          <section className="mt-20 border-t border-border/60 pt-14">
            <p className="eyebrow text-primary">Common questions</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-.035em] text-foreground">
              Frequently asked questions
            </h2>
            <div className="mt-8 divide-y divide-border/60">
              {article.faqs.map((faq) => (
                <details key={faq.question} className="group py-5">
                  <summary className="cursor-pointer list-none pr-8 text-base font-semibold text-foreground marker:hidden hover:text-primary transition-colors">
                    {faq.question}
                  </summary>
                  <p className="mt-3 pr-6 text-sm leading-7 text-muted-foreground">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}
        {article.sources && (
          <section className="mt-16 border-t border-border/60 pt-10">
            <h2 className="text-xl font-semibold tracking-[-.025em] text-foreground">
              Sources and further reading
            </h2>
            <ul className="mt-5 space-y-4">
              {article.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                  >
                    {source.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{source.note}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
        <div className="mt-16 border-t border-border/60 pt-8">
          <p className="mb-5 text-base leading-7 text-muted-foreground">
            {article.closing ??
              "Have a business process that feels harder than it should? Talk to BitLabs about the process before talking about the technology."}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            Contact BitLabs <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
      <ContactBand
        title="Need a second opinion on a software or security decision?"
        text="Bring us the system, constraints, and risks. We will help you define a practical next step."
      />
    </div>
  );
}
