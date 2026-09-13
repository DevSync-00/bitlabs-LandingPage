import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BitLabs Technology" },
      { name: "description", content: "Talk to BitLabs about your technology priorities." },
    ],
  }),
  component: Contact,
});
function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <div className="overflow-hidden">
      <section className="hero-panel relative text-foreground transition-colors">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:px-10 lg:py-28">
          <div>
            <p className="eyebrow text-primary">Contact</p>
            <h1 className="mt-6 text-[clamp(3rem,5vw,4.8rem)] font-semibold leading-none tracking-[-.055em] text-foreground">
              Let’s talk about what you need to deliver.
            </h1>
            <p className="mt-7 max-w-md text-base leading-7 text-muted-foreground">
              Whether you need specialist capacity, a complete delivery team, or advice on a
              technology decision, start with a straightforward conversation.
            </p>
            <div className="mt-12 border-t border-white/15 pt-7">
              <p className="text-xs uppercase tracking-[.14em] text-slate-400">Direct contact</p>
              <a
                href="mailto:contact@bitlabsbuild.com"
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors"
              >
                contact@bitlabsbuild.com <ArrowUpRight className="h-4 w-4" />
              </a>
              <p className="mt-2 text-sm text-slate-400">Addis Ababa, Ethiopia</p>
            </div>
          </div>
          <div className="bg-card text-card-foreground border border-border/60 shadow-xl rounded-xl p-7 sm:p-10">
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  <Check className="h-5 w-5 text-primary" />
                </span>
                <h2 className="mt-6 text-2xl font-semibold text-foreground">Thank you for getting in touch.</h2>
                <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
                  Your enquiry has been received. A member of our team will respond within one
                  business day.
                </p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Full name" name="name" />
                  <Field label="Work email" name="email" type="email" />
                  <Field label="Company" name="company" />
                  <Field label="Phone (optional)" name="phone" required={false} />
                </div>
                <div className="mt-6">
                  <label className="text-xs font-semibold text-foreground/90" htmlFor="need">
                    How can we help?
                  </label>
                  <select
                    id="need"
                    className="mt-2 w-full rounded-md border border-input bg-background text-foreground px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  >
                    <option>Technology outsourcing</option>
                    <option>Custom software development</option>
                    <option>AI, data or cloud</option>
                    <option>Technology consulting</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div className="mt-6">
                  <label className="text-xs font-semibold text-foreground/90" htmlFor="message">
                    Tell us briefly about your requirements
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="mt-2 w-full resize-none rounded-md border border-input bg-background text-foreground px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <button className="button-primary mt-7 w-full" type="submit">
                  Send enquiry <ArrowUpRight className="h-4 w-4" />
                </button>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  We usually respond within one business day.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
function Field({
  label,
  name,
  type = "text",
  required = true,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-semibold text-foreground/90" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-md border border-input bg-background text-foreground px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}
