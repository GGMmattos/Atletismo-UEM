export default function Markdown({ html }: { html: string }) {
  return (
    <div
      className="prose prose-neutral max-w-none prose-headings:text-uem-black prose-a:text-uem-green-deep"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
