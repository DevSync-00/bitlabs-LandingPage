import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const links = [{ to: "/outsourcing", label: "Outsourcing" }, { to: "/services", label: "Services" }, { to: "/industries", label: "Industries" }, { to: "/products", label: "Work" }, { to: "/about", label: "Company" }, { to: "/blog", label: "Blog" }] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white text-slate-900">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link to="/" aria-label="BitLabs home" className="flex items-center gap-3"><Logo height={38} /><span className="text-xl font-bold tracking-[-.03em] text-slate-900">BitLabs</span></Link>
        <nav className="hidden items-center gap-7 lg:flex">{links.map(l => <Link key={l.to} to={l.to} className="text-sm font-medium text-slate-600 transition-colors hover:text-primary">{l.label}</Link>)}</nav>
        <div className="flex items-center gap-3 sm:gap-4">
          <Link to="/contact" className="hidden items-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-700 lg:inline-flex">Talk to our team</Link>
          <button className="p-2 text-slate-700 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <nav className="flex min-h-[calc(100vh-5rem)] flex-col gap-1 border-t border-slate-200/60 bg-white p-5 lg:hidden">{links.map(l => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="border-b border-slate-200/60 py-5 text-xl font-medium text-slate-900">{l.label}</Link>)}<Link to="/contact" onClick={() => setOpen(false)} className="mt-6 rounded-md bg-primary px-5 py-3 text-center text-sm font-semibold text-white">Talk to our team</Link></nav>}
    </header>
  );
}
