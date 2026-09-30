import Link from "next/link";
import Image from "next/image";
import MobileNav from "@/components/MobileNav";
import NavLinks from "@/components/NavLinks";

export default function Header() {
  return (
    <header className="relative z-50 bg-uem-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logos/logo-branca.png" alt="" width={40} height={47} priority />
          <span className="font-display text-xl font-bold uppercase tracking-tight text-uem-white">Atletismo UEM</span>
        </Link>

        <nav aria-label="Menu principal" className="hidden lg:block">
          <NavLinks />
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
