export default function Markdown({ html }: { html: string }) {
  return (
    <div
      className="prose prose-neutral max-w-[68ch] prose-headings:font-display prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tight prose-headings:text-uem-black prose-h2:text-3xl prose-h3:text-xl prose-a:text-uem-green-deep prose-strong:text-uem-black"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
