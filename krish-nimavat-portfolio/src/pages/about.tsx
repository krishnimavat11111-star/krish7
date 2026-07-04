import { motion } from "framer-motion";
import { Target, MessageSquare, Zap, CreditCard } from "lucide-react";
import { Link } from "wouter";

const STATS = [
  { icon: Target, label: "100% focused", desc: "Every project gets my full attention, no juggling." },
  { icon: MessageSquare, label: "Direct comms", desc: "You talk to the person writing your code." },
  { icon: Zap, label: "Fast delivery", desc: "Most small projects delivered in 5–7 days." },
  { icon: CreditCard, label: "Fair pricing", desc: "Honest rates while I build my reputation." },
];

export default function About() {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="font-mono text-xs font-medium text-secondary tracking-widest uppercase mb-4 block">
            About me
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Honest work,<br />direct communication.
          </h1>
          <div className="h-1 w-16 bg-primary rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6 text-muted-foreground leading-relaxed text-lg"
          >
            <p>
              I'm relatively new to freelancing — and that's actually a strength. Every project gets my undivided attention, fresh eyes, and zero template thinking.
            </p>
            <p>
              No portfolio of past clients yet. But that means when you hire me, you're not getting leftover attention from a dozen other accounts. You're my focus.
            </p>
            <p>
              You get direct communication. No account managers, no middlemen, no ticket systems. You talk directly to the person writing your code.
            </p>
            <p>
              I offer fair, transparent pricing while building my name — fueled by a genuine passion for animation and clean, fast web experiences.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/services"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
                data-testid="link-about-services"
              >
                See what I build
              </Link>
              <Link
                href="/contact"
                className="border border-border px-6 py-3 rounded-full font-medium hover:bg-muted transition-colors"
                data-testid="link-about-contact"
              >
                Get in touch
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-border/50 shadow-sm flex flex-col gap-3"
                data-testid={`card-stat-${i}`}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="font-serif font-semibold text-base">{stat.label}</span>
                <span className="text-muted-foreground text-sm leading-relaxed">{stat.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
