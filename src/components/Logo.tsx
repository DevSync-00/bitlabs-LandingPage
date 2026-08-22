import logoLight from "@/assets/logo-light.svg";
import logoDark from "@/assets/logo-dark.svg";

type Props = {
  className?: string;
  height?: number;
};

/**
 * BitLabs identity mark.
 * - Dark mode → renders the light logo (white stroke).
 * - Light mode → renders the dark logo (black stroke).
 * Crossfade is handled with paired <img> tags + theme-driven opacity for
 * flicker-free, GPU-accelerated transitions.
 */
export function Logo({ className = "", height = 36 }: Props) {
  return (
    <span
      className={`relative inline-block align-middle ${className}`}
      style={{ height, width: (height * 24) / 64 }}
      aria-hidden
    >
      <img
        src={logoLight}
        alt=""
        draggable={false}
        className="absolute inset-0 h-full w-full select-none opacity-0 transition-opacity duration-500 ease-out [transform:translateZ(0)] dark:opacity-100"
      />
      <img
        src={logoDark}
        alt=""
        draggable={false}
        className="absolute inset-0 h-full w-full select-none opacity-100 transition-opacity duration-500 ease-out [transform:translateZ(0)] dark:opacity-0"
      />
    </span>
  );
}
