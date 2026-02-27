import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import TemplateThumb from "@/components/ui/TemplateThumb";
import type { Template } from "@/types";

interface OffresTemplateCardProps {
  template: Template;
}

export default function OffresTemplateCard({ template }: OffresTemplateCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/templates/${template.id}`}>
        <TemplateThumb
          src={template.image}
          alt={template.title}
          category={template.category}
          lighthouseScore={template.lighthouseScore}
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-heading text-base font-bold text-primary">
            {template.title}
          </h3>
          <span className="font-heading text-lg font-bold text-accent">
            {template.price}&euro;
          </span>
        </div>

        <p className="mb-3 text-sm text-text-muted line-clamp-2">
          {template.description}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {template.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="default">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex gap-2">
          <Button
            href={template.purchaseUrl || "/devis?pack=template"}
            variant="primary"
            size="sm"
            className="flex-1"
          >
            Acheter
          </Button>
          <Button
            href={`/templates/${template.id}`}
            variant="secondary"
            size="sm"
            className="flex-1"
          >
            Démo
          </Button>
        </div>
      </div>
    </div>
  );
}
