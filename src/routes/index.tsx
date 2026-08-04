import { createFileRoute } from "@tanstack/react-router";
import {
  BadgeCheck,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  Phone,
  Truck,
  Users,
  X,
} from "lucide-react";

import { useState } from "react";

import heroImg from "@/assets/hero-terraplenagem.jpg";
import { Carousel } from "@/components/escavterra/Carousel";
import { imagensDoServico } from "@/components/escavterra/imagens-servicos";
import { useCountUp, useReveal } from "@/components/escavterra/hooks";

/* ==== Dados de contato (atualize os números aqui) ==== */
const WHATSAPP = "https://wa.me/5511998044263";
const TELEFONE = "tel:+5511998044263";

const NAV = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#servicos", label: "Serviços" },
  
  { href: "#contato", label: "Contato" },
];

const SERVICOS = [
  {
    slug: "servico1",
    nome: "Guia Extruzada",
    desc: "Execução de guia extruzada com máquina extrusora, acabamento uniforme e alta durabilidade.",
  },
  {
    slug: "servico2",
    nome: "Água e Esgoto",
    desc: "Redes de água e esgoto, escavação, assentamento de tubulação e reaterro compactado.",
  },
  {
    slug: "servico3",
    nome: "Pavimentação e Asfalto",
    desc: "Preparo de base, sub-base, pavimentação e serviços de asfalto para vias públicas e particulares.",
  },
  {
    slug: "servico4",
    nome: "Guias e Sarjetas",
    desc: "Assentamento de guias e sarjetas com nivelamento preciso e drenagem eficiente.",
  },
  {
    slug: "servico6",
    nome: "Drenagem",
    desc: "Soluções de drenagem para controle de águas pluviais, escoamento e proteção da infraestrutura da obra.",
  },
  {
    slug: "servico7",
    nome: "Escada Hidráulica",
    desc: "Construção de escadas hidráulicas para dissipação de energia e controle de erosão.",
  },
];


const MAPA_JUNDIAI =
  "https://www.google.com/maps?q=Jundia%C3%AD%2C%20SP%2C%20Brasil&output=embed";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "ESCAVTERRA | Terraplenagem, Pavimentação e Drenagem em Jundiaí/SP" },
      {
        name: "description",
        content:
          "Terraplenagem, pavimentação, asfalto, drenagem, guias, sarjetas e redes de água e esgoto em Jundiaí/SP e região. Solicite orçamento com a ESCAVTERRA.",
      },
      {
        name: "keywords",
        content:
          "terraplenagem Jundiaí, pavimentação Jundiaí, asfalto Jundiaí, drenagem Jundiaí, guia extruzada, guias e sarjetas, água e esgoto, infraestrutura, escavação, ESCAVTERRA",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "author", content: "ESCAVTERRA" },
      { name: "geo.region", content: "BR-SP" },
      { name: "geo.placename", content: "Jundiaí" },
      { name: "theme-color", content: "#D4A017" },
      {
        property: "og:title",
        content: "ESCAVTERRA | Terraplenagem, Pavimentação e Drenagem em Jundiaí/SP",
      },
      {
        property: "og:description",
        content:
          "Soluções completas em terraplenagem, pavimentação, asfalto, drenagem e infraestrutura para obras públicas e particulares em Jundiaí/SP e região.",
      },
      { property: "og:site_name", content: "ESCAVTERRA" },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/images/logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "ESCAVTERRA | Terraplenagem, Pavimentação e Drenagem em Jundiaí/SP",
      },
      {
        name: "twitter:description",
        content:
          "Terraplenagem, pavimentação, asfalto, drenagem e infraestrutura em Jundiaí/SP e região.",
      },
      { name: "twitter:image", content: "/images/logo.png" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "ESCAVTERRA",
          legalName: "ESCAVTERRA",
          description:
            "Terraplenagem, pavimentação, asfalto, drenagem, guias, sarjetas e infraestrutura em Jundiaí/SP e região.",
          telephone: "+5511998044263",
          taxID: "53.473.235/0001-67",
          priceRange: "$$",
          url: "/",
          logo: "/images/logo.png",
          image: "/images/logo.png",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Jundiaí",
            addressRegion: "SP",
            addressCountry: "BR",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: -23.1857,
            longitude: -46.8978,
          },
          areaServed: [
            {
              "@type": "City",
              name: "Jundiaí",
            },
            {
              "@type": "AdministrativeArea",
              name: "São Paulo",
            },
          ],
          sameAs: [
            "https://www.facebook.com/Escavterra",
            "https://www.instagram.com/escav_terra/",
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Serviços de terraplenagem e infraestrutura",
            itemListElement: SERVICOS.map((servico) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: servico.nome,
                description: servico.desc,
                areaServed: "Jundiaí e região",
                provider: {
                  "@type": "LocalBusiness",
                  name: "ESCAVTERRA",
                },
              },
            })),
          },
        }),
      },
    ],
  }),
});

function Logo({ light = false }: { light?: boolean }) {
  const [logoErro, setLogoErro] = useState(false);

  return (
    <a href="#inicio" className="flex items-center gap-2">
      {/* LOGO: coloque o arquivo em public/images/logo.png (ou troque o src abaixo).
          Enquanto a imagem não existir, é exibido o ícone padrão. */}
      {logoErro ? (
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
          <Truck className="h-5 w-5" />
        </span>
      ) : (
        <img
          src="/images/logo.png"
          alt="Logo ESCAVTERRA"
          className="h-17 w-auto shrink-0 object-contain"
          onError={() => setLogoErro(true)}
        />
      )}
      <span
        className={`text-lg font-extrabold tracking-tight ${light ? "text-secondary-foreground" : "text-foreground"}`}
      >
        ESCAV<span className="text-primary">TERRA</span>
      </span>
    </a>
  );
}

/** Ícone oficial do WhatsApp */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.896 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.886-9.885 9.886m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}


function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: v } = useCountUp(value);
  return (
    <div className="text-center">
      <p className="text-4xl font-extrabold text-primary sm:text-5xl">
        <span ref={ref}>{v}</span>
        {suffix}
      </p>
      <p className="mt-2 text-sm text-secondary-foreground/80">{label}</p>
    </div>
  );
}

function Index() {
  const pageRef = useReveal<HTMLDivElement>();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      {/* ===== Cabeçalho fixo ===== */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 lg:flex lg:justify-between">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden lg:block">
            <a
              href="#contato"
              className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:brightness-105"
            >
              Solicitar Orçamento
            </a>
          </div>
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="justify-self-end rounded-lg border border-border p-2 lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menuOpen && (
          <nav className="border-t border-border bg-background px-4 py-3 lg:hidden">
            {NAV.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-md px-2 py-2.5 text-sm font-medium hover:bg-accent"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Solicitar Orçamento
            </a>
          </nav>
        )}
      </header>

      {/* ===== Botões flutuantes ===== */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="pulse-ring fixed bottom-6 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-whats text-secondary-foreground shadow-[var(--shadow-card)] transition hover:scale-105"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
      <a
        href={TELEFONE}
        aria-label="Ligar agora"
        className="pulse-ring fixed bottom-6 left-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-call text-secondary-foreground shadow-[var(--shadow-card)] transition hover:scale-105"
      >
        <Phone className="h-6 w-6" />
      </a>

      <main>
        {/* ===== Hero ===== */}
        <section id="inicio" className="relative isolate overflow-hidden">
          <img
            src={heroImg}
            alt="Escavadeira e trator realizando terraplenagem em obra"
            width={1920}
            height={1080}
            className="absolute inset-0 -z-10 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 -z-10"
            style={{ background: "var(--gradient-dark)" }}
            aria-hidden="true"
          />
          <div className="mx-auto max-w-6xl px-4 py-28 sm:py-36">
            <div className="max-w-3xl">
              <p className="reveal mb-4 inline-block rounded-full border border-primary/50 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                Terraplenagem e Infraestrutura
              </p>
              <h1 className="reveal text-3xl font-extrabold leading-tight text-secondary-foreground sm:text-5xl">
                Há mais de 14 anos transformando terrenos em{" "}
                <span className="text-primary">grandes obras.</span>
              </h1>
              <p className="reveal mt-5 max-w-2xl text-base text-secondary-foreground/85 sm:text-lg">
                A ESCAVTERRA oferece soluções completas em terraplenagem, pavimentação e
                infraestrutura para obras públicas e particulares.
              </p>
              <div className="reveal mt-8 flex flex-wrap gap-3">
                <a
                  href="#contato"
                  className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 hover:brightness-105"
                >
                  Solicitar orçamento
                </a>
                <a
                  href="#servicos"
                  className="rounded-lg border border-secondary-foreground/40 px-6 py-3 text-sm font-semibold text-secondary-foreground transition hover:border-primary hover:text-primary"
                >
                  Ver serviços
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Sobre ===== */}
        <section id="sobre" className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
          <div className="reveal max-w-3xl">
            <h2 className="text-2xl font-extrabold sm:text-3xl">Sobre a ESCAVTERRA</h2>
            <div className="mt-3 h-1 w-16 rounded bg-primary" />
            <p className="mt-6 text-muted-foreground">
              Com mais de 14 anos de mercado, a ESCAVTERRA se consolidou como referência em
              terraplenagem e infraestrutura, entregando obras com segurança, precisão e
              cumprimento de prazos.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Mais de 14 anos de experiência",
                "Atendimento profissional",
                "Máquinas modernas",
                "Equipe qualificada",
                "Obras públicas e particulares",
                "Atendimento em Jundiaí e toda região",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>


        {/* ===== Serviços ===== */}
        <section id="servicos" className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
          <h2 className="reveal text-center text-2xl font-extrabold sm:text-3xl">
            Nossos Serviços
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded bg-primary" />
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICOS.map((s) => (
              <article
                key={s.slug}
                className="reveal overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
              >
                {/* Fotos: coloque os arquivos em src/assets/servicos/<slug>/ (quantas quiser) */}
                <Carousel alt={s.nome} images={imagensDoServico(s.slug)} />
                <div className="p-6">
                  <h3 className="text-lg font-bold">{s.nome}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                  <a
                    href="#contato"
                    className="mt-5 inline-flex rounded-lg bg-secondary px-4 py-2.5 text-sm font-semibold text-secondary-foreground transition hover:bg-primary hover:text-primary-foreground"
                  >
                    Solicitar orçamento
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ===== Estatísticas ===== */}
        <section className="bg-secondary py-16">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-4 lg:grid-cols-4">
            <Stat value={14} suffix="+" label="Anos de mercado" />
            <Stat value={500} suffix="+" label="Obras realizadas" />
            <Stat value={30} suffix="+" label="Municípios atendidos" />
            <Stat value={100} suffix="%" label="Clientes satisfeitos" />
          </div>
        </section>

        {/* ===== Atendimento ===== */}
        <section className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="reveal">
              <h2 className="text-2xl font-extrabold sm:text-3xl">
                Atendemos Jundiaí e toda a região.
              </h2>
              <div className="mt-3 h-1 w-16 rounded bg-primary" />
              <p className="mt-6 text-muted-foreground">
                A ESCAVTERRA atende Jundiaí/SP e todos os municípios vizinhos, oferecendo
                serviços com qualidade, segurança e compromisso.
              </p>
              <p className="mt-6 flex items-center gap-2 text-sm font-semibold">
                <MapPin className="h-5 w-5 text-primary" /> Jundiaí — São Paulo
              </p>
            </div>
            <div className="reveal overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-card)]">
              <iframe
                title="Mapa de Jundiaí - SP"
                src={MAPA_JUNDIAI}
                loading="lazy"
                className="h-72 w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* ===== Contato ===== */}
        <section id="contato" className="bg-muted/60 py-20 sm:py-24">
          <div className="mx-auto max-w-2xl px-4">
            <h2 className="reveal text-center text-2xl font-extrabold sm:text-3xl">
              Solicite seu orçamento
            </h2>
            <div className="mx-auto mt-3 h-1 w-16 rounded bg-primary" />
            <form
              className="reveal mt-10 space-y-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                const msg = `Olá! Meu nome é ${f.get("nome")} (${f.get("telefone")}). ${f.get("mensagem")}`;
                window.open(`${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
              }}
            >
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Nome</span>
                <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 focus-within:border-primary">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <input
                    name="nome"
                    required
                    placeholder="Seu nome completo"
                    className="w-full bg-transparent py-3 text-sm outline-none"
                  />
                </div>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Telefone</span>
                <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3 focus-within:border-primary">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <input
                    name="telefone"
                    type="tel"
                    required
                    pattern="[0-9()+\-\s]{8,}"
                    placeholder="(11) 90000-0000"
                    className="w-full bg-transparent py-3 text-sm outline-none"
                  />
                </div>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium">Mensagem</span>
                <div className="flex gap-2 rounded-lg border border-input bg-background px-3 focus-within:border-primary">
                  <Mail className="mt-3.5 h-4 w-4 shrink-0 text-muted-foreground" />
                  <textarea
                    name="mensagem"
                    required
                    rows={4}
                    placeholder="Conte sobre a sua obra"
                    className="w-full resize-none bg-transparent py-3 text-sm outline-none"
                  />
                </div>
              </label>
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition hover:-translate-y-0.5 hover:brightness-105"
              >
                Solicitar Orçamento
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* ===== Rodapé ===== */}
      <footer className="bg-secondary py-14 text-secondary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-3">
          <div>
            <Logo light />
            <p className="mt-4 text-sm text-secondary-foreground/75">
              Especialistas em Terraplenagem e Infraestrutura.
            </p>
            <p className="mt-4 text-sm text-secondary-foreground/75">
              CNPJ: 53.473.235/0001-67
            </p>
            <div className="mt-5 flex gap-3">
              {/* Insira os links das redes sociais aqui */}
              <a
                href="https://www.facebook.com/Escavterra"
                aria-label="Facebook da ESCAVTERRA"
                className="grid h-10 w-10 place-items-center rounded-lg border border-secondary-foreground/20 transition hover:border-primary hover:text-primary"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/escav_terra/"
                aria-label="Instagram da ESCAVTERRA"
                className="grid h-10 w-10 place-items-center rounded-lg border border-secondary-foreground/20 transition hover:border-primary hover:text-primary"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
              Localização
            </h3>
            <p className="mt-4 text-sm text-secondary-foreground/75">Jundiaí - SP</p>
            <h3 className="mt-6 text-sm font-bold uppercase tracking-wider text-primary">
              Atendimento
            </h3>
            <p className="mt-3 text-sm text-secondary-foreground/75">
              Todos os municípios vizinhos e São Paulo.
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm">
              <a href={WHATSAPP} className="hover:text-primary">
                WhatsApp
              </a>
              <a href={TELEFONE} className="hover:text-primary">
                Telefone
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-secondary-foreground/15">
            <iframe
              title="Mapa Jundiaí - SP no rodapé"
              src={MAPA_JUNDIAI}
              loading="lazy"
              className="h-52 w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl border-t border-secondary-foreground/15 px-4 pt-6 text-center text-xs text-secondary-foreground/60">
          Copyright © 2026 ESCAVTERRA. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
}
