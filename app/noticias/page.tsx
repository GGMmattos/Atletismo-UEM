import type { Metadata } from "next";
import EmBreve from "@/components/EmBreve";

export const metadata: Metadata = {
  title: "Notícias",
};

export default function NoticiasPage() {
  return <EmBreve titulo="Notícias" />;
}
