import { Reveal } from "@/components/ui/Reveal";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function PageHeader({ eyebrow, title, description, align = "center" }: PageHeaderProps) {
  return (
    <header
      className={`mx-auto max-w-site px-site pt-16 md:pt-24 ${
        align === "center" ? "text-center" : ""
      }`}
    >
      {eyebrow && (
        <Reveal>
          <p className="text-label uppercase tracking-label text-gold">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h1 className="mt-4 font-display text-h1 font-light text-ivory">{title}</h1>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p
            className={`mt-5 text-body text-mist ${
              align === "center" ? "mx-auto max-w-xl" : "max-w-xl"
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </header>
  );
}
