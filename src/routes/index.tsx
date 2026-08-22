import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Code2, Headphones, Layers3, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BitLabs Technology — Your dedicated technology partner" },
      { name: "description", content: "Dedicated engineering teams and managed technology services for growing companies." },
    ],
  }),
  component: Home,
});

const services = [
  { number: "01", icon: Code2, title: "Dedicated engineering teams", text: "Add experienced software engineers to your team without the long hiring cycle. We match the right people to your stack, culture, and roadmap." },
  { number: "02", icon: Layers3, title: "Product development", text: "From discovery to launch, our cross-functional teams design and build dependable digital products with clear ownership at every stage." },
  { number: "03", icon: Headphones, title: "Managed technology services", text: "Keep critical systems reliable with proactive monitoring, maintenance, cloud operations, and responsive technical support." },
];

const steps = [
  ["01", "Understand", "We learn your goals, current team, technical environment, and delivery constraints."],
  ["02", "Build the right team", "We select specialists with the right experience and agree on a clear delivery plan."],
  ["03", "Deliver together", "Your team works directly with ours, with transparent reporting and measurable outcomes."],
];

function Home() {
  return (
    <div className="overflow-hidden">
      <section className="hero-panel relative">
        <div className="mx-auto max-w-7xl px-5 pb-0 pt-20 sm:px-8 lg:px-10 lg:pt-24">
          <div className="max-w-4xl">
            <p className="eyebrow mb-7 text-lime">Your software and technology partner</p>
            <h1 className="text-balance text-[clamp(3rem,6.2vw,5.6rem)] font-semibold leading-[.98] tracking-[-.06em] text-white">
              Build better technology. Move your business forward.
            </h1>
          </div>
          <div className="mt-9 grid gap-8 pb-16 md:grid-cols-[1.25fr_.75fr] md:items-end lg:pb-20">
            <div>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                BitLabs helps organisations scale engineering capacity, build custom software, and modernise the systems they rely on. From embedded specialists to complete product delivery, we bring the people and expertise to get important work done.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/contact" className="button-primary">Talk to a technology expert <ArrowUpRight className="h-4 w-4" /></Link>
                <Link to="/services" className="button-ghost">Explore our services</Link>
              </div>
            </div>
            <p className="max-w-sm border-l border-white/20 pl-6 text-sm leading-6 text-slate-400">
              Flexible engagement models for focused team extension, dedicated delivery teams, and end-to-end technology projects.
            </p>
          </div>

          <div className="grid border-x border-t border-white/15 bg-white/[.025] sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Technology outsourcing", "Extend your team"],
              ["02", "Custom software", "Design and delivery"],
              ["03", "AI & data", "Practical intelligence"],
              ["04", "Cloud & consulting", "Modernise and scale"],
            ].map(([number, title, caption]) => (
              <Link key={number} to="/services" className="group border-b border-white/15 p-6 transition-colors hover:bg-white/[.06] sm:border-r lg:border-b-0 lg:p-7">
                <div className="flex items-start justify-between"><span className="text-xs font-semibold text-lime">{number}</span><ArrowUpRight className="h-4 w-4 text-slate-500 transition-colors group-hover:text-lime" /></div>
                <h2 className="mt-8 text-base font-semibold text-white">{title}</h2>
                <p className="mt-1 text-xs text-slate-500">{caption}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white dark:bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-8 text-[#68726d] sm:px-8 md:grid-cols-[1fr_3fr] md:items-center lg:px-10">
          <p className="text-xs font-semibold uppercase tracking-[.18em]">Built for ambitious teams</p>
          <div className="grid grid-cols-2 gap-5 text-sm font-semibold text-[#26332d] sm:grid-cols-4">
            <span>Financial services</span><span>Healthcare</span><span>Logistics</span><span>Public sector</span>
          </div>
        </div>
      </section>

      <section className="section-shell bg-[#f5f7f4] dark:bg-[#f5f7f4]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-forest">How we help</p>
              <h2 className="section-title mt-5 max-w-xl text-navy">The expertise to move your roadmap forward.</h2>
            </div>
            <p className="max-w-xl self-end text-lg leading-8 text-[#59645f]">Whether you need one hard-to-find specialist or a complete delivery team, we provide practical support that fits the way your business already works.</p>
          </div>
          <div className="mt-16 grid border-l border-t border-[#ccd3ce] md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="group border-b border-r border-[#ccd3ce] bg-white p-8 transition-colors hover:bg-[#eefadf] lg:p-10">
                <div className="flex items-start justify-between"><service.icon className="h-7 w-7 text-forest" /><span className="text-xs font-semibold text-[#89938e]">{service.number}</span></div>
                <h3 className="mt-16 text-2xl font-semibold tracking-tight text-navy">{service.title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#64706a]">{service.text}</p>
                <Link to="/services" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-forest">Learn more <ArrowUpRight className="h-4 w-4" /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white dark:bg-white">
        <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:px-10">
          <div>
            <p className="eyebrow text-forest">Why BitLabs</p>
            <h2 className="section-title mt-5 text-navy">Good outsourcing should feel in-house.</h2>
            <p className="mt-6 text-base leading-7 text-[#64706a]">You get direct access to the people doing the work, shared accountability, and a partner invested in long-term results—not just filling seats.</p>
          </div>
          <div className="grid gap-px bg-[#d8ded9] sm:grid-cols-2">
            {[
              ["Senior talent", "Carefully selected professionals with the technical depth and communication skills to contribute quickly."],
              ["Clear ownership", "Defined responsibilities, visible progress, and one accountable point of contact throughout delivery."],
              ["Flexible by design", "Scale your team up or down as priorities change, without compromising continuity or quality."],
              ["Secure delivery", "Practical security controls and confidentiality built into how every team works."],
            ].map(([title, text]) => (
              <div key={title} className="bg-[#f7f8f6] p-8 lg:p-10"><ShieldCheck className="h-5 w-5 text-forest" /><h3 className="mt-8 text-lg font-semibold text-navy">{title}</h3><p className="mt-3 text-sm leading-6 text-[#64706a]">{text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-navy text-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <p className="eyebrow text-lime">A simple way to start</p>
          <div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end"><h2 className="section-title max-w-2xl">From first conversation to a productive team.</h2><p className="max-w-sm text-sm leading-6 text-slate-400">No lengthy procurement theatre. Just a clear process built around your priorities.</p></div>
          <div className="mt-16 grid border-t border-white/15 md:grid-cols-3">
            {steps.map(([number, title, text]) => <div key={number} className="border-b border-white/15 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"><span className="text-xs font-semibold text-lime">{number}</span><h3 className="mt-10 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-lime px-5 py-20 dark:bg-lime sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div><p className="eyebrow text-forest">Ready when you are</p><h2 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-[-.04em] text-navy md:text-6xl">Let’s build the team your next chapter needs.</h2></div>
          <Link to="/contact" className="button-dark shrink-0">Start a conversation <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </section>
    </div>
  );
}
