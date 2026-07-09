import type { MetadataRoute } from "next";
import { NAV_ITEMS } from "@/lib/nav";
import atletas from "@/data/atletas.json";
import type { Atleta } from "@/lib/types";

const BASE_URL = "https://atletismo-uem.vercel.app";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginasEstaticas = NAV_ITEMS.map((item) => ({
    url: `${BASE_URL}${item.href}`,
  }));

  const subsecoesUniversitario = [
    "ranking",
    "atletas",
    "resultados",
    "galeria",
  ].map((slug) => ({ url: `${BASE_URL}/atletismo-universitario/${slug}` }));

  const perfisAtletas = (atletas as Atleta[]).map((atleta) => ({
    url: `${BASE_URL}/atletismo-universitario/atletas/${atleta.slug}`,
  }));

  return [...paginasEstaticas, ...subsecoesUniversitario, ...perfisAtletas];
}
