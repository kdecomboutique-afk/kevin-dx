import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105"
      >
        <rect width="40" height="40" rx="10" className="fill-primary" />
        <text
          x="50%"
          y="54%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-white font-bold"
          fontSize="16"
          fontFamily="system-ui"
        >
          KD
        </text>
      </svg>
      <span className="font-heading text-xl font-bold text-primary">
        Kevin <span className="text-accent">DX</span>
      </span>
    </Link>
  );
}
