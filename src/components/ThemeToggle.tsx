import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative h-9 w-9 rounded-lg bg-slate-100/90 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-center overflow-hidden hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-all shadow-xs"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "moon" : "sun"}
          initial={{ y: -16, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 16, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center text-slate-700 dark:text-slate-200"
        >
          {isDark ? <Moon className="h-4 w-4 text-amber-300" /> : <Sun className="h-4 w-4 text-amber-500" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
