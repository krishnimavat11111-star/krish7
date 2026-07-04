import { motion } from "framer-motion";
import { Phone, Mail, Linkedin } from "lucide-react";
import { SiInstagram, SiX } from "react-icons/si";

const CONTACT_LINKS = [
  {
    href: "tel:+919327694677",
    icon: Phone,
    label: "Phone / WhatsApp",
    sub: "+91 93276 94677",
    color: "text-primary",
    testId: "link-contact-phone",
  },
  {
    href: "mailto:contactwithus47@gmail.com",
    icon: Mail,
    label: "Email",
    sub: "contactwithus47@gmail.com",
    color: "text-primary",
    testId: "link-contact-email",
  },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/krish_nimavat_47",
    Icon: SiInstagram,
    label: "Instagram",
    testId: "link-contact-instagram",
  },
  {
    href: "https://x.com/KrishNimavt47",
    Icon: SiX,
    label: "X",
    testId: "link-contact-x",
  },
  {
    href: "https://www.linkedin.com/in/krish-nimavat-08a80541b",
    Icon: Linkedin,
    label: "LinkedIn",
    testId: "link-contact-linkedin",
  },
];

export default function Contact() {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="font-mono text-xs font-medium text-secondary tracking-widest uppercase mb-4 block">
            Contact
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Let's Build Something
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Got a project in mind? I'd love to hear it. Pick your preferred way to reach me:
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white rounded-3xl border border-border shadow-lg p-5 sm:p-8 md:p-12"
        >
          <div className="flex flex-col gap-4 mb-8">
            {CONTACT_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 bg-background hover:bg-muted border border-border py-4 px-4 rounded-2xl font-medium transition-colors group min-w-0"
                data-testid={item.testId}
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div className="text-left min-w-0 flex-1">
                  <div className="font-semibold text-sm leading-snug">{item.label}</div>
                  <div className="text-xs text-muted-foreground font-mono mt-0.5 break-all">{item.sub}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="h-px bg-border mb-8" />

          <p className="text-sm font-mono text-muted-foreground mb-4 text-center">Or find me on</p>
          <div className="grid grid-cols-3 gap-4">
            {SOCIAL_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center gap-2 bg-background hover:bg-muted border border-border py-5 rounded-2xl transition-colors group"
                data-testid={item.testId}
              >
                <item.Icon className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
                <span className="text-xs font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
