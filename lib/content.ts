import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";
import type { FotoNoticia, Noticia, NoticiaMeta } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const NOTICIAS_DIR = path.join(CONTENT_DIR, "noticias");

export async function getContent(
  slug: string
): Promise<{ titulo: string; frase: string; html: string }> {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(remarkHtml).process(content);

  return {
    titulo: typeof data.titulo === "string" ? data.titulo : "",
    frase: typeof data.frase === "string" ? data.frase : "",
    html: processed.toString(),
  };
}

function readNoticiaFile(slug: string) {
  const filePath = path.join(NOTICIAS_DIR, slug, "index.md");
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw);
}

function toFotos(value: unknown): FotoNoticia[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null)
    .map((item) => ({
      src: typeof item.src === "string" ? item.src : "",
      alt: typeof item.alt === "string" ? item.alt : "",
    }))
    .filter((foto) => foto.src !== "");
}

function toNoticiaMeta(slug: string, data: Record<string, unknown>): NoticiaMeta {
  return {
    slug,
    titulo: typeof data.titulo === "string" ? data.titulo : "",
    data: typeof data.data === "string" ? data.data : null,
    resumo: typeof data.resumo === "string" ? data.resumo : "",
    capa: typeof data.capa === "string" ? data.capa : null,
    capaAlt: typeof data.capaAlt === "string" ? data.capaAlt : null,
    fotos: toFotos(data.fotos),
  };
}

/** Lista todas as notícias (uma pasta por notícia em `/content/noticias/<slug>/index.md`), mais recente primeiro. */
export function getAllNoticias(): NoticiaMeta[] {
  if (!fs.existsSync(NOTICIAS_DIR)) return [];

  return fs
    .readdirSync(NOTICIAS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .map((slug) => toNoticiaMeta(slug, readNoticiaFile(slug).data))
    .sort((a, b) => (b.data ?? "").localeCompare(a.data ?? ""));
}

/** Lê uma notícia específica, com o corpo já convertido de Markdown para HTML. */
export async function getNoticia(slug: string): Promise<Noticia> {
  const { data, content } = readNoticiaFile(slug);
  const processed = await remark().use(remarkHtml).process(content);

  return {
    ...toNoticiaMeta(slug, data),
    html: processed.toString(),
  };
}
