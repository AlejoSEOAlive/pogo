import Image from "next/image";
import Link from "next/link";
import { cdn } from "@/lib/links";

/** Página "Page Not Found" con el estilo de pogo.com */
export default function NotFoundView() {
  return (
    <section className="mx-auto flex min-h-[560px] max-w-[1100px] items-center gap-8 px-6 py-12">
      <div className="flex-1">
        <h1 className="text-4xl font-medium md:text-5xl">Page Not Found</h1>
        <p className="mt-6 max-w-[420px] text-lg text-muted">
          Sorry, but this page cannot be found or is no longer part of the Pogo website.
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex h-11 items-center rounded-lg px-6 font-cond text-lg font-medium uppercase">
          Back to Home
        </Link>
      </div>
      <div className="relative hidden h-[420px] w-[260px] md:block">
        <Image src={cdn("/static/v2/media/src/routes/error/joyce__2EfFf.png")} alt="" fill sizes="260px" className="object-contain" />
      </div>
    </section>
  );
}
