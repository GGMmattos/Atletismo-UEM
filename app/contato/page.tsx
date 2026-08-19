import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import ContactForm from "@/components/ContactForm";
import Markdown from "@/components/Markdown";
import Section from "@/components/Section";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com o Atletismo UEM.",
};

export default async function ContatoPage() {
  const conteudo = await getContent("contato-intro");

  return (
    <Section title={conteudo.titulo}>
      <div className="grid gap-10 sm:grid-cols-2">
        <div>
          <Markdown html={conteudo.html} />
          <dl className="mt-6 flex flex-col gap-3 text-sm">
            <div>
              <dt className="font-medium">E-mail institucional</dt>
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
              <dt className="font-medium">Telefone</dt>
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
              <dt className="font-medium">Redes sociais</dt>
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
              <dt className="font-medium">Localização</dt>
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

        <ContactForm />
      </div>
    </Section>
  );
}
