type SaiLogoProps = {
  className?: string;
  alt?: string;
};

/**
 * 사이집가양 small logo mark — rendered from /public/saijip-mark-light.png
 * (sub off-white #F3F2EE 변종, dark theme bg 에서도 visible). `text-*`
 * className 은 호환을 위해 받지만 이미지 색에는 영향 없음.
 */
export function SaiLogo({ className, alt = "" }: SaiLogoProps) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}saijip-mark-light.png`}
      alt={alt}
      aria-hidden={alt === "" ? true : undefined}
      draggable={false}
      className={`block w-auto select-none ${className ?? ""}`}
    />
  );
}

export default SaiLogo;
