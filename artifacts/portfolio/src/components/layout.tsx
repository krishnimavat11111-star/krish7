import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Why me", href: "/why-me" },
  { label: "Contact", href: "/contact" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col justify-center items-end gap-[5px] w-6 h-5">
      <motion.span
        animate={open ? { rotate: 45, y: 7, width: "24px" } : { rotate: 0, y: 0, width: "24px" }}
        transition={{ duration: 0.25 }}
        className="block h-[2px] bg-foreground rounded-full origin-center"
        style={{ width: 24 }}
      />
      <motion.span
        animate={open ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="block h-[2px] bg-primary rounded-full"
        style={{ width: 16 }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7, width: "24px" } : { rotate: 0, y: 0, width: "20px" }}
        transition={{ duration: 0.25 }}
        className="block h-[2px] bg-foreground rounded-full origin-center"
        style={{ width: 20 }}
      />
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col">

      {/* ── Floating pill header ── */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <motion.header
          animate={scrolled
            ? { boxShadow: "0 8px 32px rgba(108,92,231,0.12)", backgroundColor: "rgba(255,255,255,0.92)" }
            : { boxShadow: "0 2px 12px rgba(0,0,0,0.06)", backgroundColor: "rgba(247,249,252,0.80)" }
          }
          transition={{ duration: 0.3 }}
          className="w-full max-w-5xl rounded-2xl border border-border/60 backdrop-blur-xl px-5 h-16 flex items-center justify-between"
          style={{ backgroundColor: "rgba(247,249,252,0.80)" }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            data-testid="link-logo"
          >
            <span className="font-serif font-bold text-xl text-primary tracking-tighter leading-none">
              KN
            </span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-secondary mb-2.5"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    active ? "text-primary" : "text-foreground/60 hover:text-foreground"
                  }`}
                  data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-primary/10 rounded-xl"
                      transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
            data-testid="link-header-cta"
          >
            Hire me
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </motion.header>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              key="drawer"
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border shadow-xl flex flex-col px-6 pt-24 pb-8 gap-1 md:hidden"
            >
              {/* Close / logo row at top */}
              <div className="absolute top-5 left-6">
                <Link href="/" className="font-serif font-bold text-xl text-primary tracking-tighter">
                  KN<span className="text-secondary">.</span>
                </Link>
              </div>
              <button
                className="absolute top-4 right-5 p-2 rounded-xl hover:bg-muted transition-colors"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <MenuIcon open={true} />
              </button>

              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center justify-between py-4 text-lg font-serif font-semibold border-b border-border/40 transition-colors ${
                      location === link.href ? "text-primary" : "text-foreground hover:text-primary"
                    }`}
                    data-testid={`link-mobile-nav-${link.label.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.label}
                    {location === link.href && (
                      <span className="w-2 h-2 rounded-full bg-primary" />
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="mt-6"
              >
                <Link
                  href="/contact"
                  className="block w-full text-center bg-primary text-primary-foreground py-3.5 rounded-2xl font-medium hover:bg-primary/90 transition-colors"
                  data-testid="link-mobile-cta"
                >
                  Start a project
                </Link>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-28">
        {children}
      </main>

      <footer className="py-8 text-center border-t border-border">
        <p className="text-sm font-medium text-muted-foreground">
          © 2025 Krish Nimavat. Built with care.
        </p>
      </footer>
    </div>
  );
}
