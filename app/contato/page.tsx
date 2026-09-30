import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import ContactForm from "@/components/ContactForm";
import Markdown from "@/components/Markdown";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com o Atletismo UEM.",
};

export default async function ContatoPage() {
  const conteudo = await getContent("contato-intro");

  return (
    <>
      <PageHeader title={conteudo.titulo} eyebrow="Fale com a gente" />
      <Section>
      <div className="grid gap-10 md:grid-cols-2 lg:gap-16">
        <div>
          <Markdown html={conteudo.html} />
          <dl className="mt-8 flex flex-col gap-5">
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-uem-black/60">E-mail institucional</dt>
              <dd>
                {SITE.emailInstitucional ? (
                  <a href={`mailto:${SITE.emailInstitucional}`} className="text-uem-green-deep hover:underline">
                    {SITE.emailInstitucional}
                  </a>
                ) : (
                  "[e-mail institucional a definir]"
                )}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-uem-black/60">Telefone</dt>
              <dd>
                {SITE.telefone ? (
                  <a
                    href={`tel:+55${SITE.telefone.replace(/\D/g, "")}`}
                    className="text-uem-green-deep hover:underline"
                  >
                    {SITE.telefone}
                  </a>
                ) : (
                  "[telefone institucional a definir]"
                )}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-uem-black/60">Redes sociais</dt>
              <dd>
                {SITE.instagram ? (
                  <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="text-uem-green-deep hover:underline">
                    Instagram
                  </a>
                ) : (
                  "[redes sociais a definir]"
                )}
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium uppercase tracking-[0.14em] text-uem-black/60">Localização</dt>
              <dd>
                {SITE.localizacao ? (
                  <a href={SITE.localizacao} target="_blank" rel="noopener noreferrer" className="text-uem-green-deep hover:underline">
                    Ver no Google Maps
                  </a>
                ) : (
                  "[localização do CT / pista de treino a definir]"
                )}
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-3xl bg-uem-surface p-6 sm:p-8">
          <ContactForm />
        </div>
      </div>
      </Section>
    </>
  );
}
