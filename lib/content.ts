import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkHtml from "remark-html";

const CONTENT_DIR = path.join(process.cwd(), "content");

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
