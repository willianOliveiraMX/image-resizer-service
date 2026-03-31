import sharp from "sharp";
import {
  ImageSize,
  ResizedImage,
  OutputFormat,
  DEFAULT_FORMAT,
  DEFAULT_QUALITY,
} from "./config.js";

export async function resizeImage(
  buffer: Buffer,
  sizes: ImageSize[],
  format: OutputFormat = DEFAULT_FORMAT,
  quality: number = DEFAULT_QUALITY
): Promise<ResizedImage[]> {
  const results = await Promise.all(
    sizes.map(async (size) => {
      let pipeline = sharp(buffer).resize(size.width, size.height, {
        fit: "inside",
        withoutEnlargement: true,
      });

      switch (format) {
        case "webp":
          pipeline = pipeline.webp({ quality });
          break;
        case "jpeg":
          pipeline = pipeline.jpeg({ quality });
          break;
        case "png":
          pipeline = pipeline.png({ quality });
          break;
        case "avif":
          pipeline = pipeline.avif({ quality });
          break;
      }

      const outputBuffer = await pipeline.toBuffer();
      const metadata = await sharp(outputBuffer).metadata();

      return {
        name: size.name,
        width: metadata.width ?? size.width,
        height: metadata.height ?? size.height,
        format,
        data: outputBuffer.toString("base64"),
      };
    })
  );

  return results;
}