export const DAWN_STOPS = [
  "#121A3A",
  "#1B3B45",
  "#2F5D57",
  "#7A9B87",
  "#F7F2E7",
] as const;

const DARK_TEXT = "#F7F2E7";
const LIGHT_TEXT = "#0B0E1F";

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const hexToRgb = (hex: string) => {
  const clean = hex.replace("#", "");
  return {
    r: Number.parseInt(clean.slice(0, 2), 16),
    g: Number.parseInt(clean.slice(2, 4), 16),
    b: Number.parseInt(clean.slice(4, 6), 16),
  };
};

const rgbToHex = ({ r, g, b }: { r: number; g: number; b: number }) =>
  `#${[r, g, b]
    .map((channel) => Math.round(channel).toString(16).padStart(2, "0"))
    .join("")}`;

const mixHex = (from: string, to: string, amount: number) => {
  const a = hexToRgb(from);
  const b = hexToRgb(to);
  return rgbToHex({
    r: a.r + (b.r - a.r) * amount,
    g: a.g + (b.g - a.g) * amount,
    b: a.b + (b.b - a.b) * amount,
  });
};

export const interpolateDawnColor = (progress: number) => {
  const p = clamp(progress);
  const segmentLength = 1 / (DAWN_STOPS.length - 1);
  const index = Math.min(
    DAWN_STOPS.length - 2,
    Math.floor(p / segmentLength),
  );

  const segmentStart = index * segmentLength;
  const local = easeInOutCubic((p - segmentStart) / segmentLength);

  return mixHex(DAWN_STOPS[index], DAWN_STOPS[index + 1], local);
};

export const interpolateTextColor = (progress: number) => {
  const p = clamp(progress);
  if (p <= 0.45) return DARK_TEXT;
  if (p >= 0.55) return LIGHT_TEXT;
  return mixHex(DARK_TEXT, LIGHT_TEXT, (p - 0.45) / 0.1);
};

export const getReducedMotionColor = (sectionIndex: number) => {
  const stop = DAWN_STOPS[Math.min(sectionIndex, DAWN_STOPS.length - 1)];
  return stop;
};
