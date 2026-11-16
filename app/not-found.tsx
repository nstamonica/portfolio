import Link from "next/link";

export default function NotFound() {
  return (
    <div className="notfound">
      <p className="notfound-mark" aria-hidden="true">
        lost
      </p>
      <h1>This page took a wrong turn.</h1>
      <p className="text-muted">The page you’re looking for doesn’t exist or has moved.</p>
      <Link href="/" className="link mt-4">
        Back to the portfolio
      </Link>
    </div>
  );
}
