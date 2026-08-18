import Link from "next/link";
import Image from "next/image";
import { NAV_ITEMS } from "@/lib/nav";
import MobileNav from "@/components/MobileNav";

export default function Header() {
  return (
    <header className="relative z-50 bg-uem-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logos/logo-branca.png" alt="" width={40} height={47} priority />
          <span className="text-lg font-semibold text-uem-white">Atletismo UEM</span>
        </Link>

        <nav aria-label="Menu principal" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm font-medium text-uem-white transition-colors hover:text-uem-green"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
