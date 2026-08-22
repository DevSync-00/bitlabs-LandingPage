import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return <section className="bg-navy text-white"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28"><p className="eyebrow text-lime">{eyebrow}</p><div className="mt-6 grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end"><h1 className="max-w-4xl text-[clamp(2.8rem,5.5vw,5rem)] font-semibold leading-[1] tracking-[-.055em]">{title}</h1><p className="max-w-xl text-base leading-7 text-slate-300 lg:pb-1">{intro}</p></div></div></section>;
}

export function ContactBand({ title = "Have a technology challenge to solve?", text = "Tell us what you are working on. We’ll help you identify the right team and a practical way forward." }: { title?: string; text?: string }) {
  return <section className="bg-lime px-5 py-16 dark:bg-lime sm:px-8 lg:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"><div><p className="eyebrow text-forest">Start a conversation</p><h2 className="mt-5 max-w-3xl text-3xl font-semibold leading-tight tracking-[-.04em] text-navy md:text-5xl">{title}</h2><p className="mt-4 max-w-2xl text-sm leading-6 text-forest">{text}</p></div><Link to="/contact" className="button-dark shrink-0">Talk to our team <ArrowUpRight className="h-4 w-4" /></Link></div></section>;
}
