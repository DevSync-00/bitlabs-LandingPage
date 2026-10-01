const RECOVERY_KEY = "bitlabs:stale-chunk-recovery";
const RECOVERY_PARAM = "_refresh";
const RECOVERY_WINDOW_MS = 60_000;

const staleChunkPatterns = [
  /failed to fetch dynamically imported module/i,
  /error loading dynamically imported module/i,
  /importing a module script failed/i,
  /failed to load module script/i,
];

function errorMessage(value: unknown): string {
  if (value instanceof Error) return value.message;
  if (typeof value === "string") return value;
  return "";
}

function isStaleChunkError(value: unknown): boolean {
  const message = errorMessage(value);
  return staleChunkPatterns.some((pattern) => pattern.test(message));
}

function recoverFromStaleChunk() {
  const now = Date.now();
  const previousAttempt = Number(window.sessionStorage.getItem(RECOVERY_KEY) ?? 0);

  // A missing chunk can keep failing during a bad deployment. Reload at most once
  // per minute so recovery never becomes an infinite refresh loop.
  if (now - previousAttempt < RECOVERY_WINDOW_MS) return;

  window.sessionStorage.setItem(RECOVERY_KEY, String(now));
  const url = new URL(window.location.href);
  url.searchParams.set(RECOVERY_PARAM, String(now));
  window.location.replace(url);
}

export function installStaleChunkRecovery() {
  if (typeof window === "undefined") return;

  window.addEventListener("error", (event) => {
    if (isStaleChunkError(event.error) || isStaleChunkError(event.message)) {
      recoverFromStaleChunk();
    }
  });

  window.addEventListener("unhandledrejection", (event) => {
    if (isStaleChunkError(event.reason)) recoverFromStaleChunk();
  });

  window.setTimeout(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has(RECOVERY_PARAM)) {
      url.searchParams.delete(RECOVERY_PARAM);
      window.history.replaceState(window.history.state, "", url);
    }
    window.sessionStorage.removeItem(RECOVERY_KEY);
  }, 5_000);
}
