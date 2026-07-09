import type { ReactNode } from "react";

export default function Section({
  title,
  children,
  className = "",
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`mx-auto max-w-6xl px-4 py-12 ${className}`}>
      {title && <h2 className="mb-6 text-2xl font-bold">{title}</h2>}
      {children}
    </section>
  );
}
