import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [{ to: "/outsourcing", label: "Outsourcing" }, { to: "/services", label: "Services" }, { to: "/industries", label: "Industries" }, { to: "/products", label: "Work" }, { to: "/about", label: "Company" }, { to: "/blog", label: "Blog" }] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0c241c]/95 text-white backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link to="/" aria-label="BitLabs home" className="flex items-center gap-3"><Logo height={38} /><span className="text-xl font-bold tracking-[-.03em]">BitLabs</span></Link>
        <nav className="hidden items-center gap-6 lg:flex">{links.map(l => <Link key={l.to} to={l.to} className="text-sm text-slate-300 transition-colors hover:text-white">{l.label}</Link>)}</nav>
        <Link to="/contact" className="hidden items-center gap-2 bg-lime px-5 py-3 text-sm font-semibold text-navy transition-colors hover:bg-white lg:inline-flex">Talk to our team <ArrowUpRight className="h-4 w-4" /></Link>
        <button className="p-2 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="flex min-h-[calc(100vh-5rem)] flex-col gap-1 border-t border-white/10 bg-navy p-5 lg:hidden">{links.map(l => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="border-b border-white/10 py-5 text-xl">{l.label}</Link>)}<Link to="/contact" onClick={() => setOpen(false)} className="button-primary mt-6">Talk to our team <ArrowUpRight className="h-4 w-4" /></Link></nav>}
    </header>
  );
}
