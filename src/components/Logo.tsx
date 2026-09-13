import { motion } from "framer-motion";

type Props = {
  className?: string;
  height?: number;
};

/**
 * Animated BitLabs identity mark.
 * Features:
 * - Direct inline SVG for full theme adaptation and crisp Framer Motion path animations.
 * - Staggered entrance, stroke tracing on binary '0', and spring hover interaction.
 * - Zero glow, pulse, or gradient rings.
 */
export function Logo({ className = "", height = 36 }: Props) {
  const width = (height * 24) / 64;

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 24 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none inline-block align-middle ${className}`}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      {/* Top-Left Blue Block ('1' stem) */}
      <motion.path
        d="M0 10C0 4.47715 4.47715 0 10 0V30H0V10Z"
        fill="#2563FF"
        variants={{
          initial: { y: -6, opacity: 0 },
          animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
          hover: { x: -1, y: -1, transition: { type: "spring", stiffness: 400, damping: 15 } },
        }}
      />

      {/* Top-Right Binary '0' Traced Outline */}
      <motion.rect
        x="16"
        y="2"
        width="6"
        height="26"
        rx="2"
        stroke="currentColor"
        strokeWidth="4"
        className="text-foreground dark:text-white"
        variants={{
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1, transition: { duration: 0.7, delay: 0.15, ease: "easeInOut" } },
          hover: { x: 1, y: -1, transition: { type: "spring", stiffness: 400, damping: 15 } },
        }}
      />

      {/* Bottom-Left Purple Block */}
      <motion.path
        d="M0 34H10V64H0V34Z"
        fill="#7C3AED"
        variants={{
          initial: { x: -6, opacity: 0 },
          animate: { x: 0, opacity: 1, transition: { duration: 0.5, delay: 0.3, ease: "easeOut" } },
          hover: { x: -1, y: 1, transition: { type: "spring", stiffness: 400, damping: 15 } },
        }}
      />

      {/* Bottom-Right Blue Arch */}
      <motion.path
        d="M14 44C14 38.4772 18.4772 34 24 34V64H14V44Z"
        fill="#2563FF"
        variants={{
          initial: { y: 6, opacity: 0 },
          animate: { y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.45, ease: "easeOut" } },
          hover: { x: 1, y: 1, transition: { type: "spring", stiffness: 400, damping: 15 } },
        }}
      />
    </motion.svg>
  );
}
