"use client";

import { useState, type FormEvent, type ReactNode } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const FORMSPREE_ESCOLA_ID = process.env.NEXT_PUBLIC_FORMSPREE_ESCOLA_ID;

const inputClass =
  "w-full rounded border border-uem-black/20 bg-white px-3 py-2.5 text-sm text-uem-black";

function Field({
  label,
  htmlFor,
  required,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium text-uem-black">
        {label}
        {required && (
          <span className="text-uem-red-deep" aria-hidden="true">
            {" "}
            *
          </span>
        )}
        {hint && <span className="ml-1.5 text-xs font-normal text-uem-black/50">{hint}</span>}
      </label>
      {children}
    </div>
  );
}

function Pill({
  type,
  id,
  name,
  value,
  label,
  defaultChecked,
}: {
  type: "radio" | "checkbox";
  id: string;
  name: string;
  value: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <div>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        className="peer sr-only"
      />
      <label
        htmlFor={id}
        className="inline-block cursor-pointer rounded-full border border-uem-black/25 px-4 py-2 text-sm font-medium text-uem-black transition-colors peer-checked:border-uem-green-deep peer-checked:bg-uem-green-deep peer-checked:text-uem-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-uem-green-deep"
      >
        {label}
      </label>
    </div>
  );
}

function LaneSection({
  number,
  title,
  subtitle,
  children,
}: {
  number: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col border-b border-uem-black/10 last:border-b-0 sm:flex-row">
      <div className="flex items-center bg-uem-black px-5 py-2.5 text-xs font-bold tracking-widest text-uem-white sm:w-16 sm:items-start sm:justify-center sm:py-8">
        <span aria-hidden="true">{number}</span>
      </div>
      <div className="flex-1 px-5 py-6 sm:px-8">
        <h2 className="text-lg font-bold uppercase tracking-wide text-uem-black">{title}</h2>
        <p className="mt-1 mb-6 text-sm text-uem-black/60">{subtitle}</p>
        <div className="flex flex-col gap-5">{children}</div>
      </div>
    </div>
  );
}

export default function EscolaVisitaForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!FORMSPREE_ESCOLA_ID) {
      setStatus("error");
      return;
    }

    const data = new FormData(form);

    if (data.get("_gotcha")) {
      // honeypot preenchido — provavelmente spam, não envia mas finge sucesso.
      setStatus("success");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ESCOLA_ID}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="border-t-4 border-uem-green-deep bg-uem-black px-6 py-10 text-uem-white sm:px-10 sm:py-12">
        <h2 className="text-2xl font-bold">Solicitação enviada</h2>
        <p className="mt-3 max-w-prose text-sm text-uem-white/80">
          Recebemos o pedido de visita da sua escola. A equipe do Centro de Educação Física confirma a data e o
          horário por e-mail em até 5 dias úteis.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded border border-uem-white/30 px-4 py-2 text-sm font-medium transition-colors hover:bg-uem-white/10"
        >
          Preencher outra solicitação
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="border border-uem-black/10 bg-white">
      <p className="px-5 pt-6 text-xs text-uem-black/50 sm:px-8">
        Campos marcados com <span className="text-uem-red-deep">*</span> são obrigatórios.
      </p>

      <LaneSection number="01" title="Dados da escola" subtitle="Identificação da instituição solicitante.">
        <Field label="Nome da escola" htmlFor="escola" required>
          <input type="text" id="escola" name="escola" required className={inputClass} />
        </Field>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-uem-black">Rede de ensino</legend>
          <div className="flex flex-wrap gap-2">
            <Pill type="radio" id="r-municipal" name="rede" value="municipal" label="Municipal" defaultChecked />
            <Pill type="radio" id="r-estadual" name="rede" value="estadual" label="Estadual" />
            <Pill type="radio" id="r-particular" name="rede" value="particular" label="Particular" />
          </div>
        </fieldset>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Município" htmlFor="municipio" required>
            <input
              type="text"
              id="municipio"
              name="municipio"
              placeholder="Ex.: Maringá, Sarandi, Marialva..."
              required
              className={inputClass}
            />
          </Field>
          <Field label="Endereço da escola" htmlFor="endereco">
            <input type="text" id="endereco" name="endereco" className={inputClass} />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Telefone da secretaria" htmlFor="telefone-escola" required>
            <input type="tel" id="telefone-escola" name="telefone-escola" required className={inputClass} />
          </Field>
          <Field label="E-mail institucional da escola" htmlFor="email-escola">
            <input type="email" id="email-escola" name="email-escola" className={inputClass} />
          </Field>
        </div>
      </LaneSection>

      <LaneSection
        number="02"
        title="Responsável pela visita"
        subtitle="Quem organiza e acompanha o grupo no dia."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Nome do professor(a) ou coordenador(a)" htmlFor="responsavel" required>
            <input type="text" id="responsavel" name="responsavel" required className={inputClass} />
          </Field>
          <Field label="Função na escola" htmlFor="cargo">
            <input
              type="text"
              id="cargo"
              name="cargo"
              placeholder="Ex.: professor de Educação Física"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Telefone / WhatsApp direto" htmlFor="telefone-resp" required>
            <input type="tel" id="telefone-resp" name="telefone-resp" required className={inputClass} />
          </Field>
          <Field label="E-mail direto" htmlFor="email-resp" required>
            <input type="email" id="email-resp" name="email-resp" required className={inputClass} />
          </Field>
        </div>
      </LaneSection>

      <LaneSection number="03" title="A turma que vem visitar" subtitle="Ajuda a preparar as atividades para a idade certa.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Série / ano escolar" htmlFor="serie" required>
            <input
              type="text"
              id="serie"
              name="serie"
              placeholder="Ex.: 6º ano do Fundamental"
              required
              className={inputClass}
            />
          </Field>
          <Field label="Faixa etária" htmlFor="faixa-etaria" required>
            <input
              type="text"
              id="faixa-etaria"
              name="faixa-etaria"
              placeholder="Ex.: 11 a 12 anos"
              required
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Número de alunos" htmlFor="n-alunos" required>
            <input type="number" id="n-alunos" name="n-alunos" min={1} max={40} required className={inputClass} />
          </Field>
          <Field label="Número de professores / acompanhantes" htmlFor="n-acompanhantes" required>
            <input type="number" id="n-acompanhantes" name="n-acompanhantes" min={1} required className={inputClass} />
          </Field>
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-uem-black">
            Algum aluno necessita de acessibilidade ou cuidado específico?
          </legend>
          <div className="flex flex-wrap gap-2">
            <Pill type="radio" id="ac-nao" name="acessibilidade" value="nao" label="Não" defaultChecked />
            <Pill type="radio" id="ac-sim" name="acessibilidade" value="sim" label="Sim" />
          </div>
        </fieldset>

        <Field
          label="Se sim, descreva as necessidades"
          htmlFor="obs-acessibilidade"
          hint="para adaptarmos as atividades"
        >
          <textarea
            id="obs-acessibilidade"
            name="obs-acessibilidade"
            rows={3}
            placeholder="Ex.: aluno cadeirante, deficiência visual, condição respiratória..."
            className={`${inputClass} resize-y`}
          />
        </Field>
      </LaneSection>

      <LaneSection number="04" title="Data e horário" subtitle="Visitas de terça a sexta, das 8h às 17h.">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Data pretendida" htmlFor="data" required>
            <input type="date" id="data" name="data" required className={inputClass} />
          </Field>
          <Field label="Data alternativa" htmlFor="data-alt">
            <input type="date" id="data-alt" name="data-alt" className={inputClass} />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Horário previsto de chegada" htmlFor="hora-chegada" required>
            <input type="time" id="hora-chegada" name="hora-chegada" required className={inputClass} />
          </Field>
          <Field label="Transporte do grupo" htmlFor="transporte" required>
            <select id="transporte" name="transporte" required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Selecione
              </option>
              <option value="onibus-escolar">Ônibus escolar próprio</option>
              <option value="onibus-fretado">Ônibus fretado pela escola</option>
              <option value="transporte-publico">Transporte público</option>
              <option value="outro">Outro</option>
            </select>
          </Field>
        </div>
      </LaneSection>

      <LaneSection
        number="05"
        title="O que a turma quer vivenciar"
        subtitle="Selecione o que mais interessa ao grupo — a equipe monta o roteiro da visita com base nisso."
      >
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-uem-black">Modalidades de interesse</legend>
          <div className="flex flex-wrap gap-2">
            <Pill type="checkbox" id="m-corrida" name="modalidades" value="corrida" label="Corrida" />
            <Pill type="checkbox" id="m-salto" name="modalidades" value="saltos" label="Saltos" />
            <Pill type="checkbox" id="m-arremesso" name="modalidades" value="arremesso" label="Arremesso / lançamento" />
            <Pill
              type="checkbox"
              id="m-geral"
              name="modalidades"
              value="geral"
              label="Não sei, quero conhecer tudo"
              defaultChecked
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-uem-black">Objetivo principal da visita</legend>
          <div className="flex flex-wrap gap-2">
            <Pill type="radio" id="obj-conhecer" name="objetivo" value="conhecer" label="Conhecer o esporte e o espaço" defaultChecked />
            <Pill type="radio" id="obj-experimentar" name="objetivo" value="experimentar" label="Experimentar as provas na prática" />
            <Pill type="radio" id="obj-projeto" name="objetivo" value="projeto" label="Complementar um projeto pedagógico" />
          </div>
        </fieldset>

        <Field label="Observações" htmlFor="observacoes" hint="opcional">
          <textarea
            id="observacoes"
            name="observacoes"
            rows={3}
            placeholder="Ex.: projeto de Educação Física em andamento, alunos com receio de atividade física, restrição alimentar para lanche, etc."
            className={`${inputClass} resize-y`}
          />
        </Field>
      </LaneSection>

      <LaneSection number="06" title="Confirmação" subtitle="Última etapa antes de enviar a solicitação.">
        <div className="border border-uem-black/10 bg-uem-black/5 px-5 py-4 text-sm leading-relaxed text-uem-black/70">
          <strong className="text-uem-black">Responsabilidade durante a visita.</strong> A escola solicitante é
          responsável pelo acompanhamento e pela integridade física dos alunos durante todo o período na UEM,
          incluindo o deslocamento até o local. Recomenda-se roupa e calçado apropriados para atividade física e
          levar água.
        </div>

        <div className="flex items-start gap-3">
          <input type="checkbox" id="termo" name="termo" required className="mt-1 h-4 w-4 accent-uem-green-deep" />
          <label htmlFor="termo" className="text-sm text-uem-black">
            A escola está ciente e de acordo com as condições de participação descritas acima.
          </label>
        </div>

        <div className="flex items-start gap-3">
          <input type="checkbox" id="imagem" name="imagem" className="mt-1 h-4 w-4 accent-uem-green-deep" />
          <label htmlFor="imagem" className="text-sm text-uem-black">
            Autorizo o uso de imagens da visita para fins de divulgação institucional da UEM{" "}
            <span className="text-uem-black/50">(opcional)</span>
          </label>
        </div>
      </LaneSection>

      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input type="hidden" name="_subject" value="Nova solicitação de visita — Escola na Pista" />

      <div className="flex flex-col gap-4 border-t border-uem-black/10 px-5 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="max-w-sm text-xs text-uem-black/60">
          A confirmação de data e horário é enviada por e-mail ao responsável indicado.
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded bg-uem-green-deep px-8 py-3 text-sm font-bold uppercase tracking-wide text-uem-white transition-opacity hover:opacity-90 disabled:opacity-50 sm:w-auto"
        >
          {status === "submitting" ? "Enviando..." : "Solicitar agendamento"}
        </button>
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <p role="alert" className="border-t border-uem-black/10 px-5 py-4 text-sm text-uem-red-deep sm:px-8">
            Não foi possível enviar sua solicitação agora. Tente novamente mais tarde ou entre em contato pelo
            e-mail institucional.
          </p>
        )}
      </div>
    </form>
  );
}
