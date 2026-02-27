"use client";

import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/animations/FadeIn";
import { comparisonRows } from "@/data/offres";
import { cn } from "@/lib/utils";

const columns = [
  { label: "Template", price: "99€", highlight: false },
  { label: "Starter", price: "599€", highlight: false },
  { label: "Pro", price: "999€+", highlight: true },
];

function CellValue({ value }: { value: string }) {
  if (value === "Inclus") {
    return (
      <span className="flex items-center justify-center gap-1 text-green-600 font-medium">
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </span>
    );
  }
  if (value === "Non" || value === "Non inclus") {
    return <span className="text-text-muted">&mdash;</span>;
  }
  if (value === "Avancé") {
    return (
      <span className="flex items-center justify-center gap-1 text-green-600 font-medium">
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Avancé
      </span>
    );
  }
  return <span>{value}</span>;
}

function MobileCard({
  label,
  price,
  highlight,
}: {
  label: string;
  price: string;
  highlight: boolean;
}) {
  const getColValue = (row: (typeof comparisonRows)[0]) => {
    if (label === "Template") return row.template;
    if (label === "Starter") return row.starter;
    return row.pro;
  };

  return (
    <div
      className={cn(
        "rounded-2xl border-2 p-6",
        highlight
          ? "border-accent bg-white shadow-lg shadow-accent/10"
          : "border-border bg-white"
      )}
    >
      {highlight && (
        <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
          Recommandé
        </span>
      )}
      <div className="mb-4">
        <h4 className="font-heading text-xl font-bold text-primary">{label}</h4>
        <p className="text-2xl font-bold text-accent">{price}</p>
      </div>
      <ul className="space-y-3">
        {comparisonRows.map((row) => (
          <li key={row.criteria} className="flex items-center justify-between text-sm">
            <span className="text-text-muted">{row.criteria}</span>
            <span className="font-medium text-text">
              <CellValue value={getColValue(row)} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function OffresComparison() {
  return (
    <section id="guide" className="scroll-mt-20 bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading
          badge="Aide au choix"
          title="Template ou prestation : que choisir ?"
          subtitle="Comparez les options en un coup d'œil pour trouver ce qui correspond le mieux à votre situation."
        />

        {/* Desktop table */}
        <FadeIn>
          <div className="mx-auto hidden max-w-4xl overflow-hidden rounded-2xl border border-border bg-white shadow-sm md:block">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="px-6 py-4 text-left text-sm font-medium text-text-muted">
                    Critère
                  </th>
                  {columns.map((col) => (
                    <th
                      key={col.label}
                      className={cn(
                        "px-6 py-4 text-center",
                        col.highlight && "bg-accent/5"
                      )}
                    >
                      <div className="font-heading text-base font-bold text-primary">
                        {col.label}
                      </div>
                      <div className="text-sm font-semibold text-accent">
                        {col.price}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.criteria}
                    className={cn(
                      "border-b border-border last:border-0",
                      i % 2 === 1 && "bg-surface/50"
                    )}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-text">
                      {row.criteria}
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      <CellValue value={row.template} />
                    </td>
                    <td className="px-6 py-4 text-center text-sm">
                      <CellValue value={row.starter} />
                    </td>
                    <td className="bg-accent/5 px-6 py-4 text-center text-sm">
                      <CellValue value={row.pro} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>

        {/* Mobile cards */}
        <div className="grid gap-4 md:hidden">
          {columns.map((col, i) => (
            <FadeIn key={col.label} delay={i * 0.1}>
              <MobileCard
                label={col.label}
                price={col.price}
                highlight={col.highlight}
              />
            </FadeIn>
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.3}>
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-border bg-white p-6 text-center shadow-sm sm:p-8">
            <h3 className="font-heading text-xl font-bold text-primary">
              Toujours pas sûr ?
            </h3>
            <p className="mt-2 text-text-muted">
              Échangeons 15 minutes ensemble. Je vous conseillerai la solution
              la plus adaptée à votre situation, sans engagement.
            </p>
            <div className="mt-6">
              <Button href="/devis" variant="primary" size="lg">
                Échangeons gratuitement
              </Button>
            </div>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
