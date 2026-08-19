import type { Metadata } from "next";
import EscolaVisitaForm from "@/components/EscolaVisitaForm";

export const metadata: Metadata = {
  title: "Escola na Pista",
  description:
    "Agende a visita da sua escola à pista de atletismo da UEM: vivências de corrida, saltos e arremesso para estudantes.",
};

export default function EscolaNaPistaPage() {
  return (
    <>
      <div className="bg-uem-black text-uem-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            Agende a visita da sua escola à pista de atletismo
          </h1>
          <p className="mt-5 max-w-prose text-uem-white/80">
            Um programa aberto a escolas de Maringá e região para que estudantes conheçam de perto o atletismo:
            pisar na pista, experimentar provas de corrida, salto e arremesso, e conversar com professores e
            atletas da UEM.
          </p>
          <p className="mt-3 text-sm text-uem-white/60">
            Preencha os dados abaixo com atenção — eles são usados para confirmar data, organizar a atividade e
            receber o grupo com segurança.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-16 pt-10 sm:pb-24 sm:pt-12">
        <EscolaVisitaForm />
      </div>
    </>
  );
}
