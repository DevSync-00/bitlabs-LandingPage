import { motion } from "framer-motion";

interface AnimatedTechIconProps {
  className?: string;
  size?: number;
}

/**
 * Clean SVG animation featuring:
 *  - Path stroke tracing (pathLength)
 *  - Floating vector physics (translate & rotate)
 *  - Staggered node entry
 *  - Interactive hover state
 *  (No glow, pulse, or gradient rings)
 */
export function AnimatedTechIcon({ className = "", size = 120 }: AnimatedTechIconProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
    >
      {/* Floating Outer Octagon Frame */}
      <motion.polygon
        points="36,12 84,12 108,36 108,84 84,108 36,108 12,84 12,36"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary/40"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
      />

      {/* Floating Inner Structural Geometry */}
      <motion.g
        animate={{ y: [-2, 2, -2], rotate: [0, 1.5, -1.5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Core Diamond Circuit */}
        <motion.polygon
          points="60,28 92,60 60,92 28,60"
          stroke="currentColor"
          strokeWidth="2"
          className="text-primary"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "easeInOut" }}
        />

        {/* Center Node Star */}
        <motion.circle
          cx="60"
          cy="60"
          r="6"
          fill="currentColor"
          className="text-primary"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8, ease: "backOut" }}
        />

        {/* Connecting Trace Lines */}
        <motion.path
          d="M60 12V28 M60 92V108 M12 60H28 M92 60H108"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.6, delay: 1 }}
        />

        {/* Corner Micro Nodes */}
        {[
          { cx: 36, cy: 36 },
          { cx: 84, cy: 36 },
          { cx: 84, cy: 84 },
          { cx: 36, cy: 84 },
        ].map((node, i) => (
          <motion.circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r="3.5"
            fill="currentColor"
            className="text-primary"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9 + i * 0.1, duration: 0.3 }}
          />
        ))}
      </motion.g>
    </motion.svg>
  );
}
