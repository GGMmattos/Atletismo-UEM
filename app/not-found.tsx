import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="font-display text-8xl font-bold leading-none text-uem-green-deep">404</p>
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight">Página não encontrada</h1>
      <p className="text-uem-black/70">A página que você procura não existe ou foi movida.</p>
      <Link href="/" className="mt-2 rounded-full bg-uem-green-deep px-6 py-3 font-medium text-uem-white transition-[background-color,transform] duration-200 ease-out-strong hover:bg-[#005c32] active:scale-[0.97]">
        Voltar para o início
      </Link>
    </div>
  );
}
