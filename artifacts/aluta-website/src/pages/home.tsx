import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Globe, Code2, ShoppingBag, Briefcase, MapPin, Phone, Mail, ChevronRight, Zap, Shield, Users, BarChart3 } from "lucide-react";
import heroBgPath from "@/assets/hero-bg.png";
import productsPath from "@/assets/products.png";

const products = [
  {
    name: "TokShopLive",
    domain: "tokshoplive.com",
    description: "A live commerce platform for selling products via livestream. TikTok Shop meets African social commerce.",
    icon: ShoppingBag,
    color: "text-primary",
    bg: "bg-primary/10",
    url: "https://tokshoplive.com"
  },
  {
    name: "PointifyPOS",
    domain: "pointifypos.com",
    description: "A modern point-of-sale system designed for African small businesses and retail shops.",
    icon: Code2,
    color: "text-secondary",
    bg: "bg-secondary/10",
    url: "https://pointifypos.com"
  },
  {
    name: "BankyKit",
    domain: "bankykit.com",
    description: "A fintech toolkit enabling developers and businesses to build banking and payments experiences.",
    icon: Globe,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    url: "https://bankykit.com"
  },
  {
    name: "Pro-Suite",
    domain: "pro-suite.co",
    description: "An all-in-one business productivity suite for teams and companies.",
    icon: Briefcase,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    url: "https://pro-suite.co"
  }
];

const values = [
  {
    title: "Velocity",
    description: "We ship fast and iterate faster. The African market moves quickly, and our products are built to keep pace.",
    icon: Zap
  },
  {
    title: "Resilience",
    description: "Built for real-world conditions. Our systems handle offline states, spotty networks, and peak traffic seamlessly.",
    icon: Shield
  },
  {
    title: "Empowerment",
    description: "We don't just provide software; we provide leverage. Giving businesses the tools to scale beyond their borders.",
    icon: Users
  },
  {
    title: "Data-Driven",
    description: "Gut feelings are good, data is better. We build analytics into the core of everything we deploy.",
    icon: BarChart3
  }
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary selection:text-white font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border/40 py-4 px-6 md:px-12 flex justify-between items-center transition-all duration-300">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center font-display font-bold text-white text-xl group-hover:bg-secondary transition-colors duration-500">
            A
          </div>
          <span className="font-display font-bold text-xl tracking-tight hidden sm:block">ALUTA <span className="text-muted-foreground font-medium text-sm ml-1">Ventures</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition-colors">About</a>
          <a href="#values" className="hover:text-foreground transition-colors">Values</a>
          <a href="#products" className="hover:text-foreground transition-colors">Products</a>
          <a href="#impact" className="hover:text-foreground transition-colors">Impact</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </div>
        <a 
          href="#contact"
          className="bg-foreground text-background hover:bg-primary hover:text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105"
        >
          Partner With Us
        </a>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center pt-24 pb-12 px-6 md:px-12 lg:px-24">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroBgPath} 
            alt="Afro-futurist background" 
            className="w-full h-full object-cover opacity-30 object-right md:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
        </div>

        <motion.div 
          className="relative z-10 max-w-5xl"
          style={{ y: yHero, opacity: opacityHero }}
          initial="hidden"
          animate="show"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold tracking-wide uppercase mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            Aluta Ventures - where solutions count
          </motion.div>
          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold leading-[1.05] tracking-tighter mb-8">
            Code that powers <br/>
            <span className="text-gradient">the continent.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed font-light">
            Aluta Technology Ventures builds digital products that drive commerce, retail, fintech, and productivity across Africa. Confident. Grounded. Built for scale.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <a href="#products" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all duration-300 hover:gap-4 hover:shadow-[0_0_40px_rgba(255,87,34,0.3)]">
              Explore Our Suite <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#about" className="glass-panel hover:bg-white/10 px-8 py-4 rounded-full font-bold flex items-center gap-2 transition-all duration-300">
              Who We Are
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        >
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-bold">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 md:px-12 lg:px-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10"
        >
          <div>
            <motion.div variants={fadeUp} className="text-secondary font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-secondary"></span> Our Origins
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight">
              Rooted in Kenya.<br/>Reaching everywhere.
            </motion.h2>
            <motion.div variants={fadeUp} className="space-y-6 text-muted-foreground text-lg leading-relaxed font-light">
              <p>
                Incorporated in Nakuru in 2019, Aluta Technology Ventures Limited was co-founded by <strong className="text-foreground">John Mbugua Mochu</strong> and <strong className="text-foreground">Fredrick Mundia Githumbi</strong> with a simple premise: African businesses deserve world-class software that understands their unique operational realities.
              </p>
              <p>
                We don't just build apps. We build ecosystems. From helping a local retailer manage inventory to enabling developers to integrate seamless payments, our suite of tools is the digital infrastructure for the next generation of African enterprise.
              </p>
              <p>
                Headquartered in Nakuru, Kenya, and operating at <span className="text-foreground font-medium">alutatechnologies.com</span>, we serve businesses across the continent and beyond.
              </p>
            </motion.div>
          </div>
          
          <motion.div variants={fadeUp} className="relative rounded-[2rem] overflow-hidden border border-border/50 bg-background aspect-square lg:aspect-auto lg:h-[700px] flex items-center justify-center p-12 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute inset-0 noise-texture opacity-10 mix-blend-overlay"></div>
            <img src={productsPath} alt="Digital ecosystem illustration" className="w-full h-auto object-contain relative z-10 transform group-hover:scale-110 transition-transform duration-1000 ease-out" />
          </motion.div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section id="values" className="py-32 px-6 md:px-12 lg:px-24 relative">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div variants={fadeUp} className="text-primary font-mono text-sm tracking-widest uppercase mb-4 justify-center flex items-center gap-4">
              <span className="w-8 h-[1px] bg-primary"></span> Core Philosophy <span className="w-8 h-[1px] bg-primary"></span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-display font-bold mb-6">
              How we build for Africa.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={value.title}
                variants={fadeUp}
                className="bg-card/50 border border-border/50 rounded-2xl p-8 hover:bg-card hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300">
                  <value.icon className="w-6 h-6 text-muted-foreground group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-32 px-6 md:px-12 lg:px-24 bg-card relative">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-primary/20 blur-[128px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-secondary/20 blur-[128px] rounded-full pointer-events-none"></div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="mb-20 md:flex justify-between items-end gap-12">
            <div className="max-w-3xl">
              <motion.div variants={fadeUp} className="text-secondary font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-secondary"></span> Our Ecosystem
              </motion.div>
              <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl lg:text-7xl font-display font-bold leading-tight">
                Tools that transform<br/>how you operate.
              </motion.h2>
            </div>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg max-w-sm md:text-right pb-4 hidden md:block">
              Discover our interconnected suite designed for scale, resilience, and explosive growth.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <motion.a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                key={product.name}
                variants={fadeUp}
                className="group relative bg-background hover:bg-card border border-border/50 hover:border-border rounded-3xl p-8 lg:p-12 transition-all duration-500 overflow-hidden flex flex-col h-full"
              >
                <div className={`w-16 h-16 rounded-2xl ${product.bg} ${product.color} flex items-center justify-center mb-10 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 shadow-sm`}>
                  <product.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-3xl font-display font-bold mb-3 flex items-center gap-4">
                  {product.name}
                  <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ChevronRight className="w-5 h-5 text-background" />
                  </div>
                </h3>
                <div className="text-sm font-mono text-muted-foreground mb-6 bg-muted/50 inline-block px-3 py-1 rounded-md w-fit border border-border">{product.domain}</div>
                <p className="text-muted-foreground text-lg leading-relaxed mt-auto font-light">{product.description}</p>
                
                {/* Decorative background element */}
                <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-gradient-to-tl from-white/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl"></div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 border-y border-border/40 bg-background overflow-hidden relative">
        <div className="absolute inset-0 noise-texture opacity-5 mix-blend-overlay"></div>
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 text-center relative z-10"
        >
          {[
            { label: "Founded", value: "2019" },
            { label: "Products", value: "4+" },
            { label: "Headquarters", value: "Nakuru" },
            { label: "Focus", value: "Africa" }
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUp} className="space-y-2">
              <div className="text-5xl md:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-foreground to-muted-foreground">{stat.value}</div>
              <div className="text-sm font-mono tracking-widest uppercase text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Impact/Vision Section */}
      <section id="impact" className="py-32 relative overflow-hidden flex items-center min-h-[70vh]">
        <div className="absolute inset-0 bg-primary z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-orange-700 z-0"></div>
        <div className="absolute inset-0 noise-texture opacity-20 z-0 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-black/40 via-transparent to-black/40 pointer-events-none z-0"></div>
        
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 text-center text-white"
        >
          <motion.div variants={fadeUp} className="w-16 h-1 bg-white/30 mx-auto mb-12"></motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl lg:text-8xl font-display font-bold mb-10 leading-[1.1] tracking-tight text-shadow-sm">
            The future of Africa<br/>is built on solid code.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl md:text-3xl opacity-90 max-w-4xl mx-auto leading-relaxed font-light">
            We envision an Africa where every business, from a roadside duka to a pan-African enterprise, has access to the technology they need to thrive in the global digital economy.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 bg-card">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24"
        >
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div variants={fadeUp} className="text-primary font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-4">
              <span className="w-12 h-[1px] bg-primary"></span> Get in Touch
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-display font-bold mb-8">Let's build<br/>together.</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground text-lg mb-12 font-light leading-relaxed">
              Whether you're looking to adopt our products, partner with us, or join the team, we're always ready for a conversation.
            </motion.p>
            
            <div className="space-y-10">
              <motion.div variants={fadeUp} className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 font-display">Headquarters</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Ng'enda House, Oginga Odinga Road<br/>
                    P.O. Box 41<br/>
                    Nakuru 20100, Kenya
                  </p>
                </div>
              </motion.div>
              
              <motion.div variants={fadeUp} className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 font-display">Phone</h4>
                  <a href="tel:+254715363474" className="text-muted-foreground hover:text-foreground text-lg transition-colors">
                    +254 715 363 474
                  </a>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-background border border-border flex items-center justify-center text-blue-500 shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-2 font-display">Email</h4>
                  <a href="mailto:hello@aluta.co.ke" className="text-muted-foreground hover:text-foreground text-lg transition-colors">
                    hello@aluta.co.ke
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
          
          <motion.div variants={fadeUp} className="lg:col-span-7">
            <div className="bg-background border border-border/50 rounded-[2rem] p-8 lg:p-12 relative overflow-hidden shadow-2xl shadow-black/50">
              <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-blue-500"></div>
              <h3 className="text-3xl font-display font-bold mb-8">Send a message</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">First Name</label>
                    <input type="text" className="w-full bg-card border border-border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow text-lg" placeholder="Jane" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Last Name</label>
                    <input type="text" className="w-full bg-card border border-border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow text-lg" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Email</label>
                  <input type="email" className="w-full bg-card border border-border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow text-lg" placeholder="jane@example.com" />
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Message</label>
                  <textarea rows={5} className="w-full bg-card border border-border rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none text-lg" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full bg-foreground text-background hover:bg-primary hover:text-white font-bold rounded-xl px-6 py-5 text-lg transition-all duration-300 transform hover:translate-y-[-2px]">
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-16 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-display font-bold text-white text-sm">
              A
            </div>
            <div>
              <div className="font-display font-bold tracking-tight text-lg">Aluta Technology Ventures Ltd.</div>
              <div className="text-sm text-muted-foreground font-mono">Incorporated 2019</div>
            </div>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground font-medium">
            <a href="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
