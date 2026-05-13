"use client";

import { useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  Car,
  ChefHat,
  Clock,
  Coffee,
  Heart,
  Instagram,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
  Utensils,
  X
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  tag: string;
};

type Cart = Record<string, number>;

const products: Product[] = [
  {
    id: "paris-brest",
    name: "Paris-Brest",
    price: 5500,
    tag: "Signature",
    description: "Pate a choux doree, praline noisette, creme mousseline soyeuse.",
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: "tarte-pomme",
    name: "Tarte Pomme",
    price: 4500,
    tag: "Fondante",
    description: "Pommes caramelisees, pate fine au beurre, touche de cannelle.",
    image: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: "tarte-fraise",
    name: "Tarte Fraise",
    price: 5000,
    tag: "Fraiche",
    description: "Fraises selectionnees, creme vanille Bourbon et sablage croustillant.",
    image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: "tarte-citron",
    name: "Tarte Citron",
    price: 4800,
    tag: "Intense",
    description: "Creme citron acidulee, meringue italienne et zeste frais.",
    image: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: "tarte-chocolat",
    name: "Tarte Chocolat",
    price: 5200,
    tag: "Cacao",
    description: "Ganache chocolat noir, fleur de sel et pate cacao croquante.",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: "croissants",
    name: "Croissants",
    price: 1200,
    tag: "Matin",
    description: "Feuilletage pur beurre, coeur aerien, cuisson minute chaque matin.",
    image: "https://images.unsplash.com/photo-1623334044303-241021148842?auto=format&fit=crop&w=1000&q=85"
  },
  {
    id: "glaces",
    name: "Glaces artisanales",
    price: 3500,
    tag: "Maison",
    description: "Parfums delicats, texture cremeuse, ingredients choisis avec soin.",
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=1000&q=85"
  }
];

const gallery = [
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85"
];

const reviews = [
  {
    name: "Aicha K.",
    text: "Les tartes sont fines, pas trop sucrees, et la livraison est arrivee impeccable.",
    detail: "Commande anniversaire"
  },
  {
    name: "Marc D.",
    text: "Ambiance tres chic pour un cafe apres le travail. Le Paris-Brest est superbe.",
    detail: "Sur place"
  },
  {
    name: "Nadia S.",
    text: "Service rapide, packaging elegant, desserts vraiment dignes d'une belle maison.",
    detail: "Drive"
  }
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("fr-CI", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0
  }).format(price);

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 }
};

export default function Home() {
  const [cart, setCart] = useState<Cart>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.35], [0, 130]);
  const heroScale = useTransform(scrollYProgress, [0, 0.35], [1.04, 1]);

  const cartItems = useMemo(
    () =>
      products
        .filter((product) => cart[product.id])
        .map((product) => ({ ...product, quantity: cart[product.id] })),
    [cart]
  );

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (id: string) => {
    setCart((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  };

  const removeFromCart = (id: string) => {
    setCart((current) => {
      const next = { ...current };
      if (!next[id] || next[id] === 1) {
        delete next[id];
      } else {
        next[id] -= 1;
      }
      return next;
    });
  };

  const whatsappMessage = encodeURIComponent(
    cartItems.length
      ? `Bonjour Maison Deeya, je souhaite commander: ${cartItems
          .map((item) => `${item.quantity} x ${item.name}`)
          .join(", ")}. Total estime: ${formatPrice(total)}.`
      : "Bonjour Maison Deeya, je souhaite passer une commande."
  );

  

  return (
    <main className="relative overflow-hidden">
      <div className="grain" />
      <motion.div
        className="fixed inset-x-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-gold via-rose to-pistachio"
        style={{ scaleX: scrollYProgress }}
      />

      <header className="fixed left-0 right-0 top-0 z-40 px-4 pt-4 sm:px-6">
        <nav className={`mx-auto flex max-w-7xl items-center justify-between border border-white/70 bg-ivory/92 px-4 py-3  shadow-soft bg-white/50 backdrop-blur-xl`}>
          <a href="#accueil" className="font-serif text-2xl font-bold text-cocoa">
            Maison Deeya
          </a>
          <div className="hidden items-center gap-7 text-sm font-bold text-cocoa/80 lg:flex">
            {["A propos", "Specialites", "Experience", "Services", "Galerie", "Commander"].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(" ", "-")}`} className="transition hover:text-gold">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#commander"
              className="hidden items-center gap-2 bg-cocoa px-4 py-2 text-sm font-bold text-ivory transition hover:bg-ganache sm:flex"
            >
              <ShoppingBag size={16} />
              Panier {totalQuantity > 0 ? `(${totalQuantity})` : ""}
            </a>
            <button
              aria-label="Ouvrir le menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="grid size-10 place-items-center border border-cocoa/10 bg-white/70 text-cocoa lg:hidden"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="mx-auto mt-2 grid max-w-7xl gap-2 border border-white/60 bg-ivory/95 p-4 shadow-soft backdrop-blur-xl lg:hidden">
            {["A propos", "Specialites", "Experience", "Services", "Galerie", "Commander"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                onClick={() => setMenuOpen(false)}
                className="px-2 py-2 text-sm font-bold text-cocoa"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </header>

      <section id="accueil" className="relative min-h-screen overflow-hidden bg-cocoa pt-28 text-ivory">
        <motion.img
          style={{ y: heroY, scale: heroScale }}
          src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=2200&q=88"
          alt="Patisserie premium avec croissants et desserts artisanaux"
          className="absolute inset-0 h-full w-full object-cover opacity-72"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cocoa/46 via-cocoa/42 to-cocoa/86" />
        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-7rem)] max-w-7xl flex-col justify-center px-5 pb-16 sm:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.14 }}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 border border-ivory/30 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur-xl">
              <Sparkles size={16} className="text-gold" />
              Patisserie artisanale premium a Faya
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-balance font-serif text-6xl font-bold leading-[0.92] sm:text-7xl lg:text-8xl">
              L'Art de la Patisserie a Abidjan
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-ivory/88 sm:text-xl">
              Des creations artisanales raffinees pour vos moments gourmands.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#commander" className="inline-flex items-center justify-center gap-2 bg-gold px-6 py-4 font-bold text-cocoa transition hover:bg-ivory">
                Commander maintenant
                <ArrowRight size={18} />
              </a>
              <a href="#specialites" className="inline-flex items-center justify-center gap-2 border border-ivory/50 bg-white/10 px-6 py-4 font-bold text-ivory backdrop-blur transition hover:bg-white/20">
                Decouvrir le menu
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-7 left-5 right-5 flex items-center justify-between text-xs font-bold uppercase tracking-[0.28em] text-ivory/70 sm:left-8 sm:right-8"
          >
            <span>Scroll</span>
            <span>06h00 - 21h30</span>
          </motion.div>
        </div>
      </section>

      <Section id="a-propos" eyebrow="A propos" title="Une maison gourmande, chic et chaleureuse.">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <p className="text-lg leading-8 text-cocoa/75">
              Situee a Faya, Abidjan, Maison Deeya cultive une patisserie artisanale faite avec passion :
              desserts precis, viennoiseries dorees, glaces maison et accueil soigne. Chaque creation est pensee
              comme un moment de plaisir elegant, aussi beau a regarder que delicieux a partager.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                ["4.4/5", "Note clients"],
                ["06h", "Ouverture"],
                ["21h30", "Fermeture"]
              ].map(([value, label]) => (
                <div key={label} className="border border-cocoa/10 bg-white/55 p-4 text-center shadow-soft backdrop-blur">
                  <div className="font-serif text-3xl font-bold text-cocoa">{value}</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-wider text-cocoa/55">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=85",
              "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=85",
              "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=900&q=85",
              "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=900&q=85"
            ].map((src, index) => (
              <motion.img
                key={src}
                src={src}
                alt="Univers Maison Deeya"
                className={`h-64 w-full object-cover shadow-soft ${index % 2 ? "sm:translate-y-8" : ""}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
              />
            ))}
          </div>
        </div>
      </Section>

      <Section id="specialites" eyebrow="Nos specialites" title="Les signatures qui donnent envie de revenir.">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className="group overflow-hidden border border-cocoa/10 bg-white/70 shadow-soft backdrop-blur transition duration-300 hover:-translate-y-2 hover:shadow-glow"
            >
              <div className="relative h-72 overflow-hidden">
                <img src={product.image} alt={product.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <span className="absolute left-4 top-4 bg-ivory/86 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cocoa backdrop-blur">
                  {product.tag}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-3xl font-bold text-cocoa">{product.name}</h3>
                  <span className="whitespace-nowrap pt-1 font-bold text-gold">{formatPrice(product.price)}</span>
                </div>
                <p className="mt-3 min-h-16 leading-7 text-cocoa/66">{product.description}</p>
                <button
                  onClick={() => addToCart(product.id)}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-cocoa px-4 py-3 font-bold text-ivory transition hover:bg-gold hover:text-cocoa"
                >
                  <Plus size={17} />
                  Commander
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </Section>

      <section id="experience" className="bg-cocoa py-24 text-ivory">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">Experience client</p>
              <h2 className="mt-4 font-serif text-5xl font-bold sm:text-6xl">Une pause douce, precise, memorable.</h2>
              <div className="mt-7 inline-flex items-center gap-3 bg-white/10 px-5 py-3 backdrop-blur">
                <Star className="fill-gold text-gold" size={22} />
                <span className="text-2xl font-bold">4.4/5</span>
                <span className="text-ivory/65">avis clients</span>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.name}
                  initial={{ opacity: 0, x: 22 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="border border-white/12 bg-white/8 p-5 backdrop-blur"
                >
                  <div className="mb-5 flex text-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={16} className={i < 4 ? "fill-gold" : ""} />
                    ))}
                  </div>
                  <p className="leading-7 text-ivory/82">"{review.text}"</p>
                  <div className="mt-5 text-sm font-bold text-ivory">{review.name}</div>
                  <div className="text-xs uppercase tracking-widest text-ivory/45">{review.detail}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Section id="services" eyebrow="Services" title="Commande rapide, plaisir sans complication.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Truck, "Livraison", "Desserts soigneusement emballes et livres a Abidjan."],
            [Car, "Drive disponible", "Commandez, passez, repartez avec vos douceurs."],
            [Utensils, "Repas sur place", "Une ambiance cafe chic pour savourer le moment."],
            [Clock, "Commande rapide", "Ajout au panier, contact direct et validation simple."]
          ].map(([Icon, title, text]) => {
            const ServiceIcon = Icon as typeof Truck;
            return (
              <motion.div
                key={title as string}
                whileHover={{ y: -8 }}
                className="border border-cocoa/10 bg-white/72 p-6 shadow-soft backdrop-blur"
              >
                <div className="mb-6 grid size-12 place-items-center bg-blush text-cocoa">
                  <ServiceIcon size={24} />
                </div>
                <h3 className="font-serif text-3xl font-bold">{title as string}</h3>
                <p className="mt-3 leading-7 text-cocoa/65">{text as string}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <Section id="galerie" eyebrow="Galerie" title="Un fil gourmand comme une vitrine Instagram.">
        <div className="masonry">
          {gallery.map((src, index) => (
            <motion.div
              key={src}
              className="masonry-item group overflow-hidden bg-white shadow-soft"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
            >
              <img
                src={src}
                alt="Dessert et ambiance Maison Deeya"
                className={`w-full object-cover transition duration-700 group-hover:scale-110 ${index % 3 === 0 ? "h-96" : "h-72"}`}
              />
            </motion.div>
          ))}
        </div>



      </Section>

      <Section id="commander" eyebrow="Commande en ligne" title="Composez votre panier Maison Deeya.">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-3">
            {products.map((product) => (
              <div key={product.id} className="flex flex-col gap-4 border border-cocoa/10 bg-white/70 p-4 shadow-soft backdrop-blur sm:flex-row sm:items-center">
                <img src={product.image} alt={product.name} className="h-28 w-full object-cover sm:w-36" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-2xl font-bold text-cocoa">{product.name}</h3>
                  <p className="mt-1 text-sm leading-6 text-cocoa/60">{product.description}</p>
                  <p className="mt-2 font-bold text-gold">{formatPrice(product.price)}</p>
                </div>
                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <button aria-label={`Retirer ${product.name}`} onClick={() => removeFromCart(product.id)} className="grid size-10 place-items-center border border-cocoa/12 bg-ivory text-cocoa">
                    <Minus size={17} />
                  </button>
                  <span className="w-8 text-center font-bold">{cart[product.id] ?? 0}</span>
                  <button aria-label={`Ajouter ${product.name}`} onClick={() => addToCart(product.id)} className="grid size-10 place-items-center bg-cocoa text-ivory">
                    <Plus size={17} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="h-fit border border-cocoa/10 bg-cocoa p-6 text-ivory shadow-glow lg:sticky lg:top-28">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-4xl font-bold">Votre panier</h3>
              <ShoppingBag className="text-gold" />
            </div>
            <div className="mt-6 space-y-3">
              {cartItems.length ? (
                cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4 border-b border-white/10 pb-3 text-sm">
                    <span>
                      {item.quantity} x {item.name}
                    </span>
                    <span className="font-bold">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))
              ) : (
                <p className="leading-7 text-ivory/65">Ajoutez vos creations preferees pour preparer votre commande.</p>
              )}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-white/14 pt-5">
              <span className="text-ivory/70">Total estime</span>
              <span className="font-serif text-3xl font-bold text-gold">{formatPrice(total)}</span>
            </div>
            <div className="mt-6 grid gap-3">
              <a
                href={`https://wa.me/2250700000000?text=${whatsappMessage}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gold px-4 py-3 font-bold text-cocoa transition hover:bg-ivory"
              >
                <ShoppingBag size={17} />
                Valider sur WhatsApp
              </a>
              <a href="https://glovoapp.com/" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 border border-white/20 px-4 py-3 font-bold text-ivory transition hover:bg-white/10">
                <Truck size={17} />
                Commander via Glovo
              </a>
              <a href="tel:+2250700000000" className="inline-flex items-center justify-center gap-2 border border-white/20 px-4 py-3 font-bold text-ivory transition hover:bg-white/10">
                <Phone size={17} />
                Appeler la boutique
              </a>
            </div>
          </aside>
        </div>
      </Section>

      <section id="localisation" className="px-5 py-24 sm:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden border border-cocoa/10 bg-white/70 shadow-soft backdrop-blur lg:grid-cols-[0.72fr_1.28fr]">
          <div className="p-7 sm:p-10">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">Localisation</p>
            <h2 className="mt-4 font-serif text-5xl font-bold text-cocoa">Faya, Abidjan</h2>
            <p className="mt-5 leading-8 text-cocoa/68">
              Retrouvez Maison Deeya pour vos pauses cafe, commandes de desserts, retraits drive et envies
              gourmandes du matin au soir.
            </p>
            <div className="mt-7 space-y-4">
              <Info icon={<MapPin size={20} />} text="Maison Deeya, Faya, Abidjan" />
              <Info icon={<Clock size={20} />} text="Ouvert de 06h00 a 21h30" />
              <Info icon={<Coffee size={20} />} text="Livraison, drive et repas sur place" />
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Maison%20Deeya%20Faya%20Abidjan"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-cocoa px-5 py-3 font-bold text-ivory transition hover:bg-gold hover:text-cocoa"
            >
              Itineraire rapide
              <ArrowRight size={17} />
            </a>
          </div>
          <iframe
            title="Carte Google Maps Maison Deeya"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.2460785160133!2d-3.9435299255248144!3d5.379404235401299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1ed7244f61fc3%3A0x38b2689bb5536af7!2sMaison%20Deeya!5e0!3m2!1sfr!2sci!4v1778672545255!5m2!1sfr!2sci"
            width="600"
            height="450"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="min-h-[440px] w-full border-0"
            allowFullScreen
          />
        </div>
      </section>

      <footer className="bg-cocoa px-5 py-12 text-ivory sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
          <div>
            <h2 className="font-serif text-4xl font-bold">Maison Deeya</h2>
            <p className="mt-4 max-w-md leading-7 text-ivory/65">
              Patisserie artisanale haut de gamme a Faya, creee pour les beaux moments, les cadeaux delicats et les envies spontanees.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Heart, ChefHat].map((Icon, index) => (
                <a key={index} href="#" aria-label="Reseau social Maison Deeya" className="grid size-10 place-items-center border border-white/15 text-gold transition hover:bg-white/10">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold uppercase tracking-[0.24em] text-gold">Contact</h3>
            <p className="mt-4 text-ivory/70">Faya, Abidjan</p>
            <p className="mt-2 text-ivory/70">Ouvert de 06h00 a 21h30</p>
            <p className="mt-2 text-ivory/70">+225 07 00 00 00 00</p>
          </div>
          {/* <form className="space-y-3">
            <h3 className="font-bold uppercase tracking-[0.24em] text-gold">Newsletter</h3>
            <div className="flex gap-2">
              <input type="email" placeholder="Votre email" className="min-w-0 flex-1 border border-white/12 bg-white/10 px-4 py-3 text-ivory placeholder:text-ivory/45 outline-none focus:border-gold" />
              <button type="button" className="bg-gold px-4 py-3 font-bold text-cocoa">
                OK
              </button>
            </div>
          </form> */}
        </div>
        <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-ivory/50">
          Copyright 2026 Maison Deeya. Tous droits reserves.
        </div>
      </footer>
    </main>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="mb-12 max-w-3xl"
        >
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
          <h2 className="mt-4 font-serif text-5xl font-bold leading-tight text-cocoa sm:text-6xl">{title}</h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function Info({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-cocoa/78">
      <span className="grid size-10 place-items-center bg-blush text-cocoa">{icon}</span>
      <span className="font-semibold">{text}</span>
    </div>
  );
}
