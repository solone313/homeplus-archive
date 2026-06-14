type SaiLogoProps = {
  className?: string;
  alt?: string;
};

/**
 * 사이집가양 small logo mark — rendered from /public/saijip-mark.png.
 * Color (wine-red) is baked into the image; the `text-*` className is
 * accepted for compatibility but doesn't affect the image color.
 */
export function SaiLogo({ className, alt = "" }: SaiLogoProps) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}saijip-mark.png`}
      alt={alt}
      aria-hidden={alt === "" ? true : undefined}
      draggable={false}
      className={`block w-auto select-none ${className ?? ""}`}
    />
  );
}

export default SaiLogo;
