import { motion } from "framer-motion";
import { Link } from "wouter";

const REASONS = [
  {
    num: "01",
    title: "Fresh perspective",
    desc: "No bad habits, no recycled templates. Every project starts from scratch with your goals in mind.",
  },
  {
    num: "02",
    title: "Direct contact",
    desc: "You message me, I reply. No account managers, no ticket systems, no delays.",
  },
  {
    num: "03",
    title: "Fast turnaround",
    desc: "Small projects typically delivered in 5–7 days. No bloated agency timelines.",
  },
  {
    num: "04",
    title: "Fair pricing",
    desc: "Building a reputation means every client gets my best work at honest rates.",
  },
];

export default function WhyMe() {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="font-mono text-xs font-medium text-secondary tracking-widest uppercase mb-4 block">
            Why choose me
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Why Work With Me</h1>
          <p className="text-muted-foreground text-lg max-w-xl">
            I'm not the biggest name. But I might be the best choice for your project right now.
          </p>
        </motion.div>

        <div className="space-y-0 divide-y divide-border mb-16">
          {REASONS.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              className="group flex flex-col md:flex-row gap-4 md:gap-12 items-start py-10 hover:bg-primary/5 px-4 -mx-4 rounded-2xl transition-colors"
              data-testid={`item-reason-${i}`}
            >
              <div className="font-mono font-bold text-primary text-2xl shrink-0 group-hover:scale-110 transition-transform">
                {item.num}
              </div>
              <div>
                <h2 className="font-serif font-bold text-2xl mb-3">{item.title}</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 text-center"
        >
          <h2 className="font-serif font-bold text-2xl mb-3">Ready to get started?</h2>
          <p className="text-muted-foreground mb-6">Drop me a message and let's talk about your project.</p>
          <Link
            href="/contact"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors"
            data-testid="link-whyme-contact"
          >
            Get in touch
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
