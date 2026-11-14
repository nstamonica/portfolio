import Link from "next/link";
import { LogoMark } from "@/components/logo-mark";

export default function NotFound() {
  return (
    <div className="grid min-h-svh place-items-center px-4 py-16">
      <section className="card w-full max-w-lg px-8 py-12 text-center md:px-12 md:py-14">
        <LogoMark className="mx-auto size-12" />
        <h1 className="mt-7 text-[clamp(1.9rem,4.4vw,2.5rem)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance">
          This page took a wrong turn.
        </h1>
        <p className="mt-3 text-[17px] text-muted">The page you’re looking for doesn’t exist or has moved.</p>
        <Link href="/" className="btn btn-primary mt-8">
          Back to the portfolio
        </Link>
      </section>
    </div>
  );
}
