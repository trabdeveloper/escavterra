/**
 * ===== COMO ADICIONAR AS FOTOS DOS SERVIÇOS =====
 *
 * OPÇÃO 1 (recomendada - automática):
 * Basta jogar os arquivos de imagem dentro da pasta do serviço:
 *
 *   src/assets/servicos/servico1/qualquer-nome.jpg
 *   src/assets/servicos/servico1/outra-foto.png
 *   src/assets/servicos/servico2/...
 *
 * Pode colocar QUANTAS imagens quiser (1, 5, 20...). O carrossel se ajusta
 * sozinho, em ordem alfabética do nome do arquivo. Não precisa mexer no código.
 * Formatos aceitos: jpg, jpeg, png, webp, avif.
 *
 * OPÇÃO 2 (manual):
 * Se preferir usar a pasta public/ ou links externos, adicione as URLs em
 * IMAGENS_EXTRAS abaixo. Elas aparecem depois das imagens da opção 1.
 */

const modulos = import.meta.glob<string>(
  "/src/assets/servicos/*/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,WEBP,avif,AVIF}",
  { eager: true, import: "default" },
);

const porSlug: Record<string, string[]> = {};
for (const caminho of Object.keys(modulos).sort()) {
  const partes = caminho.split("/");
  const slug = partes[partes.length - 2];
  const url = modulos[caminho];
  if (!slug || !url) continue;
  (porSlug[slug] ??= []).push(url);
}

/** Imagens adicionais manuais (public/ ou URL externa) por slug de serviço. */
export const IMAGENS_EXTRAS: Record<string, string[]> = {
  // servico1: ["/images/servico1/foto1.jpg", "/images/servico1/foto2.jpg"],
};

export function imagensDoServico(slug: string): string[] {
  return [...(porSlug[slug] ?? []), ...(IMAGENS_EXTRAS[slug] ?? [])];
}
