"use client";

import { useState } from "react";

const categoryGradients: Record<string, string> = {
  Restaurant: "from-orange-400 to-red-500",
  Artisan: "from-amber-400 to-orange-500",
  Immobilier: "from-blue-400 to-indigo-500",
  Beauté: "from-pink-400 to-rose-500",
  BTP: "from-slate-500 to-gray-700",
  Commerce: "from-emerald-400 to-teal-500",
  Garage: "from-zinc-500 to-slate-700",
  Fleuriste: "from-rose-400 to-pink-500",
  Santé: "from-cyan-400 to-blue-500",
  Coach: "from-lime-400 to-green-500",
  Photographe: "from-violet-400 to-purple-500",
  Juridique: "from-indigo-500 to-slate-700",
  "E-commerce": "from-purple-500 to-violet-600",
  Agence: "from-cyan-500 to-blue-600",
  "Bien-être": "from-teal-400 to-emerald-500",
  "Tech / SaaS": "from-indigo-600 to-slate-800",
};

type WireframeLayout =
  | "restaurant"
  | "artisan"
  | "immobilier"
  | "beaute"
  | "sante"
  | "tech";

function getCategoryLayout(category: string): WireframeLayout {
  switch (category) {
    case "Restaurant":
    case "Fleuriste":
      return "restaurant";
    case "Artisan":
    case "BTP":
      return "artisan";
    case "Immobilier":
    case "Commerce":
    case "E-commerce":
      return "immobilier";
    case "Beauté":
    case "Bien-être":
    case "Coach":
      return "beaute";
    case "Santé":
    case "Juridique":
    case "Garage":
      return "sante";
    case "Tech / SaaS":
    case "Agence":
    case "Photographe":
    default:
      return "tech";
  }
}

/* ================================================================
   WIREFRAME COLOR HELPERS
   ================================================================ */
interface WireframeColors {
  bar: string;
  block: string;
  line: string;
  accent: string;
  dot: string;
}

function getWireframeColors(colorScheme?: { primary: string; accent: string; bg: string }): WireframeColors {
  if (!colorScheme) {
    return {
      bar: "bg-white/20",
      block: "bg-white/10",
      line: "bg-white/15",
      accent: "bg-white/25",
      dot: "bg-white/20",
    };
  }

  return {
    bar: "bg-white/25",
    block: "bg-white/12",
    line: "bg-white/18",
    accent: "bg-white/30",
    dot: "bg-white/25",
  };
}

/* ================================================================
   WIREFRAME LAYOUTS
   ================================================================ */

function RestaurantWireframe({ colors }: { colors: WireframeColors }) {
  return (
    <div className="w-full max-w-[180px] space-y-2">
      {/* Nav */}
      <div className="flex items-center gap-2">
        <div className={`h-3 w-3 rounded-full ${colors.dot}`} />
        <div className={`h-2 w-12 rounded ${colors.line}`} />
        <div className="ml-auto flex gap-1.5">
          <div className={`h-2 w-6 rounded ${colors.block}`} />
          <div className={`h-2 w-6 rounded ${colors.block}`} />
          <div className={`h-2 w-8 rounded-md ${colors.accent}`} />
        </div>
      </div>
      {/* Large hero image */}
      <div className={`h-16 w-full rounded-lg ${colors.block} relative overflow-hidden`}>
        <div className={`absolute bottom-1.5 left-2 h-2 w-16 rounded ${colors.line}`} />
        <div className={`absolute bottom-1.5 right-2 h-4 w-12 rounded-md ${colors.accent}`} />
      </div>
      {/* Menu grid - 3 columns */}
      <div className="grid grid-cols-3 gap-1.5">
        <div className="space-y-1">
          <div className={`h-8 rounded ${colors.block}`} />
          <div className={`h-1.5 w-full rounded ${colors.line}`} />
          <div className={`h-1.5 w-2/3 rounded ${colors.bar}`} />
        </div>
        <div className="space-y-1">
          <div className={`h-8 rounded ${colors.block}`} />
          <div className={`h-1.5 w-full rounded ${colors.line}`} />
          <div className={`h-1.5 w-3/4 rounded ${colors.bar}`} />
        </div>
        <div className="space-y-1">
          <div className={`h-8 rounded ${colors.block}`} />
          <div className={`h-1.5 w-full rounded ${colors.line}`} />
          <div className={`h-1.5 w-1/2 rounded ${colors.bar}`} />
        </div>
      </div>
      {/* Reservation bar */}
      <div className={`flex items-center gap-2 rounded-md ${colors.block} p-1.5`}>
        <div className={`h-2 w-2 rounded-full ${colors.accent}`} />
        <div className={`h-1.5 flex-1 rounded ${colors.line}`} />
        <div className={`h-4 w-10 rounded ${colors.accent}`} />
      </div>
    </div>
  );
}

function ArtisanWireframe({ colors }: { colors: WireframeColors }) {
  return (
    <div className="w-full max-w-[180px] space-y-2">
      {/* Nav */}
      <div className="flex items-center gap-2">
        <div className={`h-3 w-3 rounded-full ${colors.dot}`} />
        <div className={`h-2 w-14 rounded ${colors.line}`} />
        <div className="ml-auto flex gap-1.5">
          <div className={`h-2 w-7 rounded ${colors.block}`} />
          <div className={`h-2 w-7 rounded ${colors.block}`} />
        </div>
      </div>
      {/* Hero with text overlay */}
      <div className={`h-12 w-full rounded-md ${colors.block} relative`}>
        <div className="absolute inset-0 flex flex-col justify-center px-2">
          <div className={`h-2 w-3/4 rounded ${colors.line}`} />
          <div className={`mt-1 h-1.5 w-1/2 rounded ${colors.bar}`} />
        </div>
      </div>
      {/* 2-column portfolio grid */}
      <div className="grid grid-cols-2 gap-1.5">
        <div className={`h-12 rounded ${colors.block}`} />
        <div className={`h-12 rounded ${colors.block}`} />
        <div className={`h-12 rounded ${colors.block}`} />
        <div className={`h-12 rounded ${colors.block}`} />
      </div>
      {/* Testimonial bar */}
      <div className={`flex items-center gap-2 rounded-md ${colors.block} p-1.5`}>
        <div className={`h-4 w-4 rounded-full ${colors.accent}`} />
        <div className="flex-1 space-y-0.5">
          <div className={`h-1 w-full rounded ${colors.line}`} />
          <div className={`h-1 w-2/3 rounded ${colors.bar}`} />
        </div>
      </div>
      {/* CTA */}
      <div className="flex gap-2 pt-0.5">
        <div className={`h-5 flex-1 rounded-md ${colors.accent}`} />
        <div className={`h-5 flex-1 rounded-md ${colors.block}`} />
      </div>
    </div>
  );
}

function ImmobilierWireframe({ colors }: { colors: WireframeColors }) {
  return (
    <div className="w-full max-w-[180px] space-y-2">
      {/* Nav */}
      <div className="flex items-center gap-2">
        <div className={`h-3 w-3 rounded-full ${colors.dot}`} />
        <div className={`h-2 w-10 rounded ${colors.line}`} />
        <div className="ml-auto flex gap-1.5">
          <div className={`h-2 w-6 rounded ${colors.block}`} />
          <div className={`h-2 w-6 rounded ${colors.block}`} />
          <div className={`h-2 w-6 rounded ${colors.block}`} />
        </div>
      </div>
      {/* Hero */}
      <div className={`h-10 w-full rounded-md ${colors.block}`} />
      {/* Search bar */}
      <div className={`flex items-center gap-1 rounded-lg ${colors.accent} p-1.5`}>
        <div className={`h-3 flex-1 rounded ${colors.block}`} />
        <div className={`h-3 flex-1 rounded ${colors.block}`} />
        <div className={`h-3 w-6 rounded ${colors.line}`} />
        <div className={`h-4 w-8 rounded-md ${colors.dot}`} />
      </div>
      {/* Property cards grid */}
      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-0.5">
            <div className={`h-7 rounded ${colors.block}`} />
            <div className={`h-1 w-full rounded ${colors.line}`} />
            <div className={`h-1 w-2/3 rounded ${colors.bar}`} />
            <div className={`h-1 w-1/2 rounded ${colors.accent}`} />
          </div>
        ))}
      </div>
      {/* Stats bar */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex-1 text-center">
            <div className={`mx-auto h-3 w-6 rounded ${colors.accent}`} />
            <div className={`mx-auto mt-0.5 h-1 w-8 rounded ${colors.bar}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

function BeauteWireframe({ colors }: { colors: WireframeColors }) {
  return (
    <div className="w-full max-w-[180px] space-y-2">
      {/* Nav centered */}
      <div className="flex items-center justify-center gap-3">
        <div className={`h-2 w-7 rounded ${colors.block}`} />
        <div className={`h-3 w-3 rounded-full ${colors.accent}`} />
        <div className={`h-2 w-7 rounded ${colors.block}`} />
      </div>
      {/* Centered hero */}
      <div className="flex flex-col items-center text-center space-y-1.5 py-2">
        <div className={`h-2.5 w-3/4 rounded ${colors.line}`} />
        <div className={`h-1.5 w-1/2 rounded ${colors.bar}`} />
        <div className={`h-5 w-16 rounded-full ${colors.accent} mt-1`} />
      </div>
      {/* Service bands */}
      {[0, 1, 2].map((i) => (
        <div key={i} className={`flex items-center gap-2 rounded-lg ${colors.block} p-1.5`}>
          <div className={`h-5 w-5 rounded-full ${colors.accent}`} />
          <div className="flex-1 space-y-0.5">
            <div className={`h-1.5 w-3/4 rounded ${colors.line}`} />
            <div className={`h-1 w-1/2 rounded ${colors.bar}`} />
          </div>
          <div className={`h-1.5 w-6 rounded ${colors.accent}`} />
        </div>
      ))}
      {/* CTA centered */}
      <div className="flex justify-center pt-1">
        <div className={`h-5 w-20 rounded-full ${colors.accent}`} />
      </div>
    </div>
  );
}

function SanteWireframe({ colors }: { colors: WireframeColors }) {
  return (
    <div className="w-full max-w-[180px] space-y-2">
      {/* Nav */}
      <div className="flex items-center gap-2">
        <div className={`h-2 w-2 rounded-sm ${colors.accent}`} />
        <div className={`h-2 w-12 rounded ${colors.line}`} />
        <div className="ml-auto flex gap-1">
          <div className={`h-2 w-6 rounded ${colors.block}`} />
          <div className={`h-2 w-6 rounded ${colors.block}`} />
          <div className={`h-3 w-8 rounded ${colors.accent}`} />
        </div>
      </div>
      {/* Sober hero */}
      <div className={`h-10 w-full rounded-md ${colors.block} flex items-center px-2`}>
        <div className="space-y-1">
          <div className={`h-2 w-20 rounded ${colors.line}`} />
          <div className={`h-1.5 w-14 rounded ${colors.bar}`} />
        </div>
      </div>
      {/* 3-column info */}
      <div className="grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`rounded ${colors.block} p-1.5 space-y-1`}>
            <div className={`h-3 w-3 mx-auto rounded-full ${colors.accent}`} />
            <div className={`h-1 w-full rounded ${colors.line}`} />
            <div className={`h-1 w-2/3 mx-auto rounded ${colors.bar}`} />
          </div>
        ))}
      </div>
      {/* Form */}
      <div className={`rounded-md ${colors.block} p-2 space-y-1.5`}>
        <div className={`h-1 w-1/3 rounded ${colors.line}`} />
        <div className={`h-3 w-full rounded ${colors.bar}`} />
        <div className={`h-3 w-full rounded ${colors.bar}`} />
        <div className="flex gap-1.5">
          <div className={`h-3 flex-1 rounded ${colors.bar}`} />
          <div className={`h-3 flex-1 rounded ${colors.bar}`} />
        </div>
        <div className={`h-4 w-full rounded ${colors.accent}`} />
      </div>
    </div>
  );
}

function TechWireframe({ colors }: { colors: WireframeColors }) {
  return (
    <div className="w-full max-w-[180px] space-y-2">
      {/* Nav */}
      <div className="flex items-center gap-2">
        <div className={`h-2.5 w-2.5 rounded ${colors.accent}`} />
        <div className={`h-1.5 w-10 rounded ${colors.line}`} />
        <div className="ml-auto flex gap-1">
          <div className={`h-1.5 w-5 rounded ${colors.block}`} />
          <div className={`h-1.5 w-5 rounded ${colors.block}`} />
          <div className={`h-3 w-8 rounded ${colors.accent}`} />
        </div>
      </div>
      {/* Dark hero area */}
      <div className={`h-12 w-full rounded-md ${colors.block} relative`}>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`h-2 w-2/3 rounded ${colors.line}`} />
          <div className={`mt-1 h-1.5 w-1/3 rounded ${colors.bar}`} />
          <div className={`mt-1.5 h-3 w-14 rounded ${colors.accent}`} />
        </div>
      </div>
      {/* Mosaic grid - asymmetric */}
      <div className="grid grid-cols-3 gap-1">
        <div className={`col-span-2 h-10 rounded ${colors.block}`} />
        <div className={`h-10 rounded ${colors.block}`} />
        <div className={`h-8 rounded ${colors.block}`} />
        <div className={`col-span-2 h-8 rounded ${colors.block}`} />
      </div>
      {/* Stats row */}
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex-1 text-center">
            <div className={`mx-auto h-2.5 w-4 rounded ${colors.accent}`} />
            <div className={`mx-auto mt-0.5 h-1 w-6 rounded ${colors.bar}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
interface TemplateThumbProps {
  src: string;
  alt: string;
  category: string;
  hoverText?: string;
  lighthouseScore?: number;
  colorScheme?: { primary: string; accent: string; bg: string };
}

export default function TemplateThumb({
  src,
  alt,
  category,
  hoverText = "Voir la démo",
  lighthouseScore,
  colorScheme,
}: TemplateThumbProps) {
  const [imgError, setImgError] = useState(false);
  const gradient =
    categoryGradients[category] || "from-primary to-secondary";
  const layout = getCategoryLayout(category);
  const colors = getWireframeColors(colorScheme);

  return (
    <div
      className={`relative aspect-[4/3] overflow-hidden bg-gradient-to-br ${gradient}`}
    >
      {!imgError && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
          onError={() => setImgError(true)}
        />
      )}
      {imgError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          {/* Category-specific wireframe */}
          {layout === "restaurant" && <RestaurantWireframe colors={colors} />}
          {layout === "artisan" && <ArtisanWireframe colors={colors} />}
          {layout === "immobilier" && <ImmobilierWireframe colors={colors} />}
          {layout === "beaute" && <BeauteWireframe colors={colors} />}
          {layout === "sante" && <SanteWireframe colors={colors} />}
          {layout === "tech" && <TechWireframe colors={colors} />}

          {/* "Bientôt" badge */}
          <div className="absolute bottom-3 right-3">
            <span className="rounded-full bg-white/15 backdrop-blur-sm px-2.5 py-1 text-[10px] font-semibold text-white/60 uppercase tracking-wider">
              Aperçu
            </span>
          </div>
        </div>
      )}
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/60 transition-colors duration-300 flex items-center justify-center">
        <span className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
          {hoverText}
        </span>
      </div>
      {/* Lighthouse score */}
      {lighthouseScore && !imgError && (
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-1 shadow-sm">
            <svg
              className="h-3.5 w-3.5 text-green-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-xs font-bold text-green-700">
              {lighthouseScore}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
