import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-3xl font-bold">Página não encontrada</h1>
      <p className="text-uem-black/70">A página que você procura não existe ou foi movida.</p>
      <Link href="/" className="rounded bg-uem-red-deep px-6 py-2 font-medium text-uem-white hover:opacity-90">
        Voltar para o início
      </Link>
    </div>
  );
}
