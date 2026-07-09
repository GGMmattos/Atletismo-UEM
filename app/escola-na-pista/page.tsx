import type { Metadata } from "next";
import EmBreve from "@/components/EmBreve";

export const metadata: Metadata = {
  title: "Escola na Pista",
};

export default function EscolaNaPistaPage() {
  return <EmBreve titulo="Escola na Pista" />;
}
