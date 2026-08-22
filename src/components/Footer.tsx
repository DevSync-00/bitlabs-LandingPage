import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return <footer className="bg-[#081b15] text-white"><div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
    <div className="grid gap-12 border-b border-white/15 pb-14 md:grid-cols-2 lg:grid-cols-5">
      <div className="lg:col-span-2"><Link to="/" className="flex items-center gap-3"><Logo height={44} /><span className="text-2xl font-bold">BitLabs</span></Link><p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">Technology teams and services that help ambitious organisations build, scale, and operate with confidence.</p></div>
      <div><p className="text-xs font-semibold uppercase tracking-[.16em] text-slate-500">What we do</p><div className="mt-5 flex flex-col gap-3 text-sm text-slate-300"><Link to="/outsourcing">Outsourcing</Link><Link to="/services">Services</Link><Link to="/industries">Industries</Link><Link to="/products">Our work</Link></div></div>
      <div><p className="text-xs font-semibold uppercase tracking-[.16em] text-slate-500">Company</p><div className="mt-5 flex flex-col gap-3 text-sm text-slate-300"><Link to="/about">About</Link><Link to="/team">Our team</Link><Link to="/blog">Blog</Link><Link to="/contact">Contact</Link></div></div>
      <div><p className="text-xs font-semibold uppercase tracking-[.16em] text-slate-500">Get in touch</p><div className="mt-5 flex flex-col gap-3 text-sm text-slate-300"><a href="mailto:contact@bitlabsbuild.com" className="inline-flex items-center gap-2 break-all">contact@bitlabsbuild.com <ArrowUpRight className="h-3.5 w-3.5 shrink-0" /></a><Link to="/contact">Start a project</Link></div></div>
    </div>
    <div className="flex flex-col gap-3 pt-7 text-xs text-slate-500 sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} BitLabs Technology PLC</p><p>Technology partnerships built to last.</p></div>
  </div></footer>;
}
