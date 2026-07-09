export default function EmBreve({ titulo }: { titulo: string }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">{titulo}</h1>
      <p className="text-uem-black/70">Esta página está em construção e chega em breve.</p>
    </div>
  );
}
