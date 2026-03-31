export interface ImageSize {
  name: string;
  width: number;
  height: number;
}

export interface ResizedImage {
  name: string;
  width: number;
  height: number;
  format: string;
  data: string;
}

export type OutputFormat = "webp" | "jpeg" | "png" | "avif";

export const SUPPORTED_FORMATS: OutputFormat[] = ["webp", "jpeg", "png", "avif"];

export const DEFAULT_FORMAT: OutputFormat = "webp";

export const DEFAULT_QUALITY = 80;

export const SIZES: ImageSize[] = [
  { name: "thumb", width: 150, height: 150 },
  { name: "small", width: 320, height: 240 },
  { name: "medium", width: 800, height: 600 },
  { name: "large", width: 1920, height: 1080 },
];

export const PORT = Number(process.env.PORT) || 3000;

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
