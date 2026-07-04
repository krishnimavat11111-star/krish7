import { motion } from "framer-motion";
import { Globe, Layout, ShoppingBag, Briefcase } from "lucide-react";
import { Link } from "wouter";

const SERVICES = [
  {
    icon: Globe,
    title: "Business Websites",
    desc: "Professional, fast-loading websites that represent your brand online. Clean design, clear messaging, and built to convert visitors into customers.",
    tags: ["React", "Responsive", "SEO-ready"],
  },
  {
    icon: Layout,
    title: "Landing Pages",
    desc: "Focused, high-converting pages built for one goal — capturing leads, promoting a product, or launching a campaign. No distractions, just results.",
    tags: ["CRO-focused", "Fast-loading", "Mobile-first"],
  },
  {
    icon: ShoppingBag,
    title: "E-commerce Stores",
    desc: "Online stores built to sell. Clean product pages, smooth checkout flow, and a shopping experience that builds trust and drives purchases.",
    tags: ["Shopify / Custom", "Secure checkout", "Product pages"],
  },
  {
    icon: Briefcase,
    title: "Portfolio Websites",
    desc: "Personal sites for creatives, developers, and professionals that actually represent who you are — not a template with your name swapped in.",
    tags: ["Custom design", "Showcase-ready", "Animated"],
  },
];

export default function Services() {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs font-medium text-secondary tracking-widest uppercase mb-4 block">
            Services
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">What I Build</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every project is built from scratch — no templates, no shortcuts, no recycled code.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {SERVICES.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              className="group bg-white p-8 rounded-3xl border border-border shadow-sm hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              data-testid={`card-service-${i}`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <service.icon className="w-6 h-6" />
              </div>
              <h2 className="font-serif font-bold text-xl mb-3">{service.title}</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{service.desc}</p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-xs px-3 py-1 bg-background border border-border rounded-full text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="text-center"
        >
          <Link
            href="/contact"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-full font-medium hover:bg-primary/90 transition-colors"
            data-testid="link-services-contact"
          >
            Start a project
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
