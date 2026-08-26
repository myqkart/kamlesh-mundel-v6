export type InkPreset = {
  id: string;
  name: string;
  hex: string;
};

export const INK_PRESETS: readonly InkPreset[] = [
  { id: "sun", name: "Sun", hex: "#FFD93B" },
  { id: "peach", name: "Peach", hex: "#FFB347" },
  { id: "pink", name: "Pink", hex: "#FF8FB1" },
  { id: "coral", name: "Coral", hex: "#FF6F61" },
  { id: "lime", name: "Lime", hex: "#C5E86C" },
  { id: "mint", name: "Mint", hex: "#7DDE92" },
  { id: "sky", name: "Sky", hex: "#7EC8E3" },
  { id: "teal", name: "Teal", hex: "#78CDD7" },
  { id: "lilac", name: "Lilac", hex: "#C9A0DC" },
] as const;

export const DEFAULT_INK = INK_PRESETS[0];
export const INK_STORAGE_KEY = "km-highlighter-ink";
export const INK_CHANGE_EVENT = "sketch-ink-change";

export type InkChoice = {
  id: string;
  hex: string;
};

export function normalizeHex(value: string) {
  const hex = value.trim().toUpperCase();
  if (/^#[0-9A-F]{6}$/.test(hex)) return hex;
  if (/^#[0-9A-F]{3}$/.test(hex)) {
    return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  }
  return DEFAULT_INK.hex;
}

export function readStoredInk(): InkChoice {
  if (typeof window === "undefined") return { id: DEFAULT_INK.id, hex: DEFAULT_INK.hex };

  try {
    const raw = window.localStorage.getItem(INK_STORAGE_KEY);
    if (!raw) return { id: DEFAULT_INK.id, hex: DEFAULT_INK.hex };
    const parsed = JSON.parse(raw) as Partial<InkChoice>;
    const hex = normalizeHex(parsed.hex ?? DEFAULT_INK.hex);
    const preset = INK_PRESETS.find((item) => item.hex === hex);
    return { id: preset?.id ?? parsed.id ?? "custom", hex };
  } catch {
    return { id: DEFAULT_INK.id, hex: DEFAULT_INK.hex };
  }
}

export function applyInk(choice: InkChoice) {
  const hex = normalizeHex(choice.hex);
  const preset = INK_PRESETS.find((item) => item.hex === hex);
  const next: InkChoice = { id: preset?.id ?? "custom", hex };

  document.documentElement.style.setProperty("--highlighter", next.hex);
  window.localStorage.setItem(INK_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent<InkChoice>(INK_CHANGE_EVENT, { detail: next }));
  return next;
}

export function pencilSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M2 2 L9.2 3.6 L4.2 9.2 Z" fill="#2B2B2B"/>
    <path d="M4.2 9.2 L9.2 3.6 L15.6 10.6 L10.4 16 Z" fill="#F3D7A4"/>
    <path d="M7.2 8.6 L13.4 14.6" stroke="#E0BE86" stroke-width="0.9"/>
    <path d="M10.4 16 L15.6 10.6 L33.2 28.4 L28 33.8 Z" fill="#F5C518"/>
    <path d="M12.8 15.2 L15.6 10.6 L33.2 28.4 L30.6 31.2 Z" fill="#E3B40E"/>
    <path d="M14.6 16.8 L31.2 33.2" stroke="#FFF4B0" stroke-width="1.3" stroke-linecap="round" opacity=".55"/>
    <path d="M28 33.8 L33.2 28.4 L36.6 31.8 L31.4 37.2 Z" fill="#D9E1E4"/>
    <path d="M29.2 32.6 L35.2 33.8" stroke="#9AA7AD" stroke-width="0.7"/>
    <path d="M31.4 37.2 L36.6 31.8 L40.6 35.8 L35.4 41.2 Z" fill="#F2A0A0"/>
    <path d="M2 2 L9.4 3.4 L40.6 35.8 L35.4 41.2 L4 9.4 Z" stroke="#1C3D40" stroke-width="1.35" stroke-linejoin="round"/>
  </svg>`;
}

export function penSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M2 2 L6.4 3.1 L3.3 6.5 Z" fill="#0D5C63"/>
    <path d="M3.3 6.5 L6.4 3.1 L12.8 10.6 L9.2 13.6 Z" fill="#E8D7B0"/>
    <path d="M9.2 13.6 L12.8 10.6 L31.4 29.4 L27.6 32.8 Z" fill="#0D5C63"/>
    <path d="M11.4 13.8 L29.6 32" stroke="#78CDD7" stroke-width="1.15" stroke-linecap="round" opacity=".45"/>
    <path d="M27.6 32.8 L31.4 29.4 L35.8 33.8 L32 37.2 Z" fill="#247B7B"/>
    <path d="M33.4 31.2 C 38.6 28.4 41.4 34.2 36.6 37.2" stroke="#0D5C63" stroke-width="1.3" stroke-linecap="round"/>
    <path d="M2 2 L6.6 2.9 L35.8 33.8 L32 37.2 L3.1 6.6 Z" stroke="#0D5C63" stroke-width="1.3" stroke-linejoin="round"/>
  </svg>`;
}

export function markerSvg(hex: string) {
  const ink = normalizeHex(hex);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M2 4.2 L11.6 1.6 L14.2 10.4 L4.8 12.8 Z" fill="${ink}"/>
    <path d="M4.8 12.8 L14.2 10.4 L18.2 20.2 L9.2 22.4 Z" fill="${ink}" opacity=".85"/>
    <path d="M9.2 22.4 L18.2 20.2 L34.8 38.6 L26 41.4 Z" fill="${ink}"/>
    <path d="M12.6 22 L31.8 39.8" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".35"/>
    <path d="M26 41.4 L34.8 38.6 L38.4 43.2 L29.8 46 Z" fill="#247B7B"/>
    <path d="M2 4.2 L11.8 1.4 L38.4 43.2 L29.8 46 L4.6 13 Z" stroke="#0D5C63" stroke-width="1.3" stroke-linejoin="round"/>
  </svg>`;
}

export function svgToCursor(svg: string, hotspotX = 2, hotspotY = 2) {
  return new Promise<string>((resolve, reject) => {
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 48;
      canvas.height = 48;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("cursor canvas"));
        return;
      }
      ctx.drawImage(image, 0, 0, 48, 48);
      URL.revokeObjectURL(objectUrl);
      resolve(`url("${canvas.toDataURL("image/png")}") ${hotspotX} ${hotspotY}, auto`);
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("cursor image"));
    };
    image.src = objectUrl;
  });
}
