import type { Metadata } from "next";
import EscolaVisitaForm from "@/components/EscolaVisitaForm";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Escola na Pista",
  description:
    "Agende a visita da sua escola à pista de atletismo da UEM: vivências de corrida, saltos e arremesso para estudantes.",
};

export default function EscolaNaPistaPage() {
  return (
    <>
      <PageHeader title="Agende a visita da sua escola à pista de atletismo" eyebrow="Escola na Pista">
        <p>
          Um programa aberto a escolas de Maringá e região para que estudantes conheçam de perto o atletismo: pisar na
          pista, experimentar provas de corrida, salto e arremesso, e conversar com professores e atletas da UEM.
        </p>
        <p className="mt-3 text-sm text-uem-white/60">
          Preencha os dados abaixo com atenção, eles são usados para confirmar data, organizar a atividade e receber o
          grupo com segurança.
        </p>
      </PageHeader>

      <div className="mx-auto max-w-3xl px-4 pb-16 pt-10 sm:pb-24 sm:pt-12">
        <EscolaVisitaForm />
      </div>
    </>
  );
}
