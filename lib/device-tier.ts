export type DeviceTier = "high" | "mid" | "low";

const hasWebGl = () => {
  if (typeof window === "undefined") return false;
  const canvas = document.createElement("canvas");
  return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
};

const fpsProbe = async () => {
  const frames = 24;
  let count = 0;
  return new Promise<number>((resolve) => {
    const start = performance.now();
    const tick = () => {
      count += 1;
      if (count >= frames) {
        const seconds = (performance.now() - start) / 1000;
        resolve(frames / seconds);
        return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
};

export const detectDeviceTier = async () => {
  if (typeof window === "undefined") return "low" as DeviceTier;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isMobile = window.innerWidth < 1024;
  if (reducedMotion || isMobile || !hasWebGl()) return "low";

  const concurrency = navigator.hardwareConcurrency ?? 4;
  const fps = await fpsProbe();

  if (concurrency >= 8 && fps >= 45) return "high";
  if (concurrency >= 4 && fps >= 25) return "mid";
  return "low";
};
