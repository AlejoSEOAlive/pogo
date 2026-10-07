import { LOGO, cdn } from "@/lib/pogo";

const links = [
  { label: "Home", href: "/" },
  { label: "User Agreement", href: "https://www.ea.com/legal/user-agreement" },
  { label: "Privacy and Cookie Policy (Your Privacy Rights)", href: "https://www.ea.com/legal/privacy-and-cookie-policy" },
  { label: "Online Service Updates", href: "https://www.ea.com/service-updates" },
  { label: "Terms of Sale", href: "https://tos.ea.com/legalapp/termsofsale/US/en/PC" },
  { label: "Legal & Privacy", href: "https://www.ea.com/legal" },
];
const links2 = [
  { label: "Security", href: "https://www.ea.com/security" },
  { label: "IAB", href: "https://www.pogo.com/server/iab-compliance" },
];
const social = [
  { label: "Facebook", icon: "/static/v2/media/src/components/common/footer/social-f__2_N4c.svg", href: "https://www.facebook.com/pogo" },
  { label: "X", icon: "/static/v2/media/src/components/common/footer/social-x__1VH25.svg", href: "https://x.com/pogo" },
  { label: "Youtube", icon: "/static/v2/media/src/components/common/footer/social-yt__33IxW.svg", href: "https://www.youtube.com/pogo" },
  { label: "Instagram", icon: "/static/v2/media/src/components/common/footer/social-i__AgzAr.svg", href: "https://www.instagram.com/pogogames" },
];

export default function Footer() {
  const ext = { target: "_blank", rel: "noopener noreferrer" } as const;
  return (
    <footer className="px-6 pb-3 pt-2 text-xs font-medium md:px-14">
      <div className="flex flex-col gap-6 border-b border-white/20 py-8 md:flex-row md:items-center md:justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={LOGO} alt="Pogo Logo" width={100} height={36} className="h-9 w-auto" />
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-4 gap-y-3 md:justify-end">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="underline hover:text-link" {...(l.href.startsWith("http") ? ext : {})}>
              {l.label}
            </a>
          ))}
          <span className="hidden w-4 md:block" />
          {links2.map((l) => (
            <a key={l.label} href={l.href} className="underline hover:text-link" {...ext}>
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex flex-col items-start gap-6 py-6 md:flex-row md:items-center md:justify-between">
        <a href="https://www.ea.com/" className="underline" {...ext}>
          © 2018-2026 Electronic Arts Inc.
        </a>
        <div className="flex items-center gap-5">
          {social.map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label} {...ext}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cdn(s.icon)} alt={`${s.label} Icon`} width={22} height={22} loading="lazy" />
            </a>
          ))}
        </div>
        <a href="https://privacy.trustarc.com/privacy-seal/validation?rid=7d587a12-773f-4bf9-a209-d18047ee5f05" {...ext}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://hostedseal.trustarc.com/privacy-seal/seal?rid=7d587a12-773f-4bf9-a209-d18047ee5f05"
            alt="TRUSTe"
            width={130}
            height={45}
            loading="lazy"
          />
        </a>
      </div>
    </footer>
  );
}
