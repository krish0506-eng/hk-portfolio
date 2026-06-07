import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "rgb(3, 7, 18)" }}>
      <div className="max-w-md">
        <div className="font-mono text-accent text-xs tracking-widest uppercase mb-4">404</div>
        <h1 className="font-display font-bold text-4xl md:text-5xl text-light mb-4">
          Page not <span className="gradient-text">found</span>
        </h1>
        <p className="text-muted font-body text-base mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 glass-btn rounded-full px-7 py-3.5 font-body text-sm font-semibold text-light"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
