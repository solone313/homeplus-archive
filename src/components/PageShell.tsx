import type { ReactNode } from "react";

type Props = {
  /** small uppercase mono tag shown above title */
  tag?: string;
  /** big page title */
  title?: string;
  /** sub copy under title */
  subtitle?: string;
  children: ReactNode;
};

export function PageShell({ tag, title, subtitle, children }: Props) {
  return (
    <main className="relative w-full pb-28 pt-16 md:pb-12 md:pt-20">
      {(tag || title || subtitle) && (
        <header className="mx-auto max-w-[1440px] px-4 pt-8 md:px-10 md:pt-16">
          {tag && (
            <p className="rule-dim mb-4 md:mb-6">
              {tag}
            </p>
          )}
          {title && (
            <h1 className="text-[14vw] font-extrabold leading-[0.92] tracking-[-0.035em] md:text-[clamp(3.5rem,7vw,6.5rem)]">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft md:text-lg">
              {subtitle}
            </p>
          )}
        </header>
      )}
      {children}
    </main>
  );
}
