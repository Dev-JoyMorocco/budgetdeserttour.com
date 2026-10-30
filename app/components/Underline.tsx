import underlineDarkSvg from '~/assets/underline-dark.svg?url';
import underlineLightSvg from '~/assets/underline-light.svg?url';

export interface UnderlineProps {
  /** `dark` is the orange swoosh for light grounds; `light` is sand, for dark ones. */
  tone?: 'dark' | 'light';
  className?: string;
}

/**
 * The hand-drawn swoosh under section eyebrows. Every underline on the site
 * uses one of the two files in ~/assets, so swapping a file restyles them all.
 */
export function Underline({tone = 'dark', className = ''}: UnderlineProps) {
  return (
    <img
      src={tone === 'light' ? underlineLightSvg : underlineDarkSvg}
      alt=""
      aria-hidden="true"
      width={52}
      height={10}
      className={`h-auto w-13 ${className}`}
    />
  );
}
