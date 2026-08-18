import type { Metadata } from "next";
import EscolaVisitaForm from "@/components/EscolaVisitaForm";

export const metadata: Metadata = {
  title: "Escola na Pista",
  description:
    "Agende a visita da sua escola à pista de atletismo da UEM: vivências de corrida, saltos e arremesso para estudantes.",
};

const INFO = [
  { k: "Duração", v: "Aprox. 2h por visita" },
  { k: "Vagas por turma", v: "Até 40 alunos por período" },
  { k: "Confirmação", v: "Por e-mail, em até 5 dias úteis" },
];

export default function EscolaNaPistaPage() {
  return (
    <>
      <div className="bg-uem-black text-uem-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-uem-red">
            Centro de Educação Física, Fisioterapia e Terapia Ocupacional
          </p>
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

      <div className="mx-auto max-w-3xl px-4 pb-16 sm:pb-24">
        <div className="-mt-8 grid divide-y divide-uem-black/10 overflow-hidden border border-uem-black/10 bg-white shadow-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {INFO.map((item) => (
            <div key={item.k} className="px-6 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-uem-green-deep">{item.k}</p>
              <p className="mt-1 text-sm text-uem-black/70">{item.v}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <EscolaVisitaForm />
        </div>
      </div>
    </>
  );
}
