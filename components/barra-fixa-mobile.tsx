import Link from "next/link";

const WHATSAPP_COMERCIAL = "558233281831";

export function BarraFixaMobile() {
  return (
    <div className="sticky bottom-0 z-20 flex gap-px border-t border-osso/14 bg-mata sm:hidden">
      <a
        href={`https://wa.me/${WHATSAPP_COMERCIAL}`}
        className="flex min-h-[60px] flex-1 items-center justify-center bg-cana font-display text-[13px] font-extrabold tracking-[.14em] text-mata uppercase"
      >
        WhatsApp
      </a>
      <Link
        href="/unidades"
        className="flex min-h-[60px] flex-1 items-center justify-center bg-mata-fundo font-display text-[13px] font-extrabold tracking-[.14em] text-osso uppercase"
      >
        Unidades
      </Link>
    </div>
  );
}
