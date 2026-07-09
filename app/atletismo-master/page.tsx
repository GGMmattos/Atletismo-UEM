import type { Metadata } from "next";
import EmBreve from "@/components/EmBreve";

export const metadata: Metadata = {
  title: "Atletismo Master",
};

export default function AtletismoMasterPage() {
  return <EmBreve titulo="Atletismo Master" />;
}
