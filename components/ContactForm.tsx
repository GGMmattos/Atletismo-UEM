"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!FORMSPREE_ID) {
      setStatus("error");
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("_gotcha")) {
      // honeypot preenchido — provavelmente spam, não envia mas finge sucesso.
      setStatus("success");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="rounded border border-uem-black/20 px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded border border-uem-black/20 px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="text-sm font-medium">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="rounded border border-uem-black/20 px-3 py-2"
        />
      </div>

      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input type="hidden" name="_subject" value="Nova mensagem — Contato do site Atletismo UEM" />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-fit rounded bg-uem-green-deep px-6 py-2 font-medium text-uem-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "submitting" ? "Enviando..." : "Enviar mensagem"}
      </button>

      <div aria-live="polite">
        {status === "success" && (
          <p className="text-green-700">Mensagem enviada com sucesso! Em breve entraremos em contato.</p>
        )}
        {status === "error" && (
          <p className="text-uem-red-deep">
            Não foi possível enviar sua mensagem agora. Tente novamente mais tarde ou use o e-mail institucional.
          </p>
        )}
      </div>
    </form>
  );
}
