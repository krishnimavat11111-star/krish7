import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { Globe, Layout, ShoppingBag, Briefcase, ArrowRight } from "lucide-react";

const HEADLINES = [
  "I build websites",
  "that don't feel like templates",
  "light, animated, and fast",
];

function TypingEffect() {
  const [text, setText] = useState("");
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = HEADLINES[headlineIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (text === "") {
        setIsDeleting(false);
        setHeadlineIndex((prev) => (prev + 1) % HEADLINES.length);
      } else {
        timer = setTimeout(() => setText(text.slice(0, -1)), 50);
      }
    } else {
      if (text === currentPhrase) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else {
        timer = setTimeout(() => setText(currentPhrase.slice(0, text.length + 1)), 100);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, headlineIndex]);

  return (
    <span className="inline-block font-serif font-bold text-4xl md:text-6xl lg:text-7xl min-h-[1.2em]">
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[0.06em] h-[0.9em] bg-primary ml-2 align-middle rounded-sm"
      />
    </span>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

function SkillBar({ label, percent, delay }: { label: string; percent: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between items-center font-mono text-xs text-muted-foreground">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="h-1.5 bg-border rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={inView ? { width: `${percent}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

const STATS = [
  { value: 1, suffix: ":1", label: "Client-developer ratio" },
  { value: 100, suffix: "%", label: "Focus per project" },
  { value: 24, suffix: "hr", label: "Response time" },
  { value: 4, suffix: "+", label: "Services offered" },
];

const SERVICES = [
  { icon: Globe, title: "Business Websites", color: "text-primary bg-primary/10" },
  { icon: Layout, title: "Landing Pages", color: "text-secondary bg-secondary/10" },
  { icon: ShoppingBag, title: "E-commerce Stores", color: "text-primary bg-primary/10" },
  { icon: Briefcase, title: "Portfolio Websites", color: "text-secondary bg-secondary/10" },
];

const SKILLS = [
  { label: "React / TypeScript", percent: 88 },
  { label: "CSS & Animations", percent: 92 },
  { label: "Responsive Design", percent: 95 },
  { label: "Performance & Speed", percent: 85 },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-40 md:pb-28 px-6 overflow-hidden min-h-[92vh] flex items-center">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/20 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000" />

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-3 py-1.5 rounded-full mb-8 font-mono text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              available for new projects
            </div>

            <div className="mb-8">
              <TypingEffect />
            </div>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10 font-medium">
              I'm Krish Nimavat — a freelance web developer focused on clean code, smooth motion, and sites that actually load.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 inline-block"
                data-testid="link-hero-contact"
              >
                Start a project
              </Link>
              <Link
                href="/services"
                className="bg-white hover:bg-gray-50 text-foreground border border-border shadow-sm px-8 py-4 rounded-full font-medium transition-transform hover:scale-105 inline-block"
                data-testid="link-hero-services"
              >
                See what I build
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-white border-y border-border/50">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
                data-testid={`stat-${i}`}
              >
                <div className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills + Services */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Skill bars */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-mono text-xs font-medium text-secondary tracking-widest uppercase mb-4 block">
                Core skills
              </span>
              <h2 className="text-3xl font-serif font-bold mb-8">What I'm good at</h2>
              <div className="space-y-6">
                {SKILLS.map((s, i) => (
                  <SkillBar key={s.label} label={s.label} percent={s.percent} delay={i * 0.15} />
                ))}
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 mt-8 text-primary font-medium text-sm hover:gap-3 transition-all"
                data-testid="link-home-about"
              >
                More about me <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Services grid */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-mono text-xs font-medium text-secondary tracking-widest uppercase mb-4 block">
                What I build
              </span>
              <h2 className="text-3xl font-serif font-bold mb-8">Services</h2>
              <div className="grid grid-cols-2 gap-4">
                {SERVICES.map((svc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-5 rounded-2xl border border-border shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-200"
                    data-testid={`card-home-service-${i}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${svc.color}`}>
                      <svc.icon className="w-5 h-5" />
                    </div>
                    <span className="font-serif font-semibold text-sm leading-snug">{svc.title}</span>
                  </motion.div>
                ))}
              </div>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 mt-8 text-primary font-medium text-sm hover:gap-3 transition-all"
                data-testid="link-home-services"
              >
                View all services <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-6 bg-primary/5 border-y border-border/50">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="font-mono text-xs font-medium text-secondary tracking-widest uppercase mb-4 block">
              How it works
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Simple process, clear results</h2>
          </motion.div>

          <div className="relative">
            {/* connector line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border hidden sm:block md:-translate-x-px" />

            <div className="space-y-10 md:space-y-0">
              {[
                { step: "01", title: "You reach out", desc: "Tell me about your project — what it is, what you need, and when you need it." },
                { step: "02", title: "We align", desc: "We agree on scope, timeline, and price. No surprises." },
                { step: "03", title: "I build it", desc: "Clean code, smooth motion, direct updates. You see progress as it happens." },
                { step: "04", title: "You launch", desc: "Delivered on time. Pixel-perfect. Ready to impress." },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row gap-6 md:gap-16 items-start md:items-center pb-10 md:pb-12 ${
                    i % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                  data-testid={`step-process-${i}`}
                >
                  <div className="md:w-1/2 flex items-start gap-4">
                    <div className="relative z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-mono text-sm font-bold shrink-0 shadow-md">
                      {item.step}
                    </div>
                    <div className={i % 2 === 1 ? "md:text-right" : ""}>
                      <h3 className="font-serif font-bold text-xl mb-1">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                  <div className="md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Got a project in mind?</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              I'm available right now and fully focused. Let's build something worth showing off.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 rounded-full font-medium transition-transform hover:scale-105"
              data-testid="link-home-cta"
            >
              Let's talk
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
