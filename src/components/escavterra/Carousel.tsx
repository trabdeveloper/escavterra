import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { useRef, useState } from "react";

/**
 * Carrossel horizontal simples (scroll-snap + swipe nativo no celular).
 * Aceita qualquer quantidade de imagens (0, 1, 2, 10...).
 */
export function Carousel({ images, alt }: { images: string[]; alt: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [broken, setBroken] = useState<Record<string, boolean>>({});
  const [ativo, setAtivo] = useState(0);

  const visiveis = images.filter((src) => !broken[src]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el || el.clientWidth === 0) return;
    setAtivo(Math.round(el.scrollLeft / el.clientWidth));
  };

  if (visiveis.length === 0) {
    return (
      <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-2 rounded-t-xl bg-muted text-muted-foreground">
        <ImageIcon className="h-8 w-8" aria-hidden="true" />
        <span className="px-4 text-center text-[11px] leading-tight">
          Adicione fotos deste serviço
        </span>
      </div>
    );
  }

  return (
    <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-t-xl bg-muted">
      <div ref={trackRef} onScroll={onScroll} className="carousel-track h-full w-full">
        {visiveis.map((src) => (
          <div key={src} className="relative h-full w-full">
            <img
              src={src}
              alt={alt}
              loading="lazy"
              className="h-full w-full object-cover"
              onError={() => setBroken((b) => ({ ...b, [src]: true }))}
            />
          </div>
        ))}
      </div>

      {visiveis.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Imagem anterior"
            onClick={() => scrollBy(-1)}
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-secondary/70 p-2 text-secondary-foreground opacity-0 transition hover:bg-secondary focus-visible:opacity-100 group-hover:opacity-100"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Próxima imagem"
            onClick={() => scrollBy(1)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-secondary/70 p-2 text-secondary-foreground opacity-0 transition hover:bg-secondary focus-visible:opacity-100 group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          <div className="pointer-events-none absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
            {visiveis.map((src, i) => (
              <span
                key={src}
                className={`h-1.5 rounded-full transition-all ${
                  i === ativo ? "w-4 bg-primary" : "w-1.5 bg-background/70"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
