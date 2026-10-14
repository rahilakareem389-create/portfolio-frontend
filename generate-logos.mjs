import sharp from 'sharp';

async function generateCleanLogos() {
  const sourcePng = 'C:/Users/Boss/.gemini/antigravity/brain/68ddd396-77b1-4f27-a417-23c2ff271222/.user_uploaded/media_1791904728941_69bc9644.png';
  
  // 1. Trim transparent padding
  const trimmedBuffer = await sharp(sourcePng)
    .trim()
    .toBuffer();

  // Save the dark mode version (white text + orange USK, transparent background)
  await sharp(trimmedBuffer)
    .png()
    .toFile('public/logo-usk-dark.png');
  await sharp(trimmedBuffer)
    .png()
    .toFile('public/logo-usk.png');
  console.log('Saved public/logo-usk-dark.png & logo-usk.png');

  // 2. Generate light mode version:
  // Convert white/light text pixels to dark charcoal (#140d08), keep orange USK intact
  const { data, info } = await sharp(trimmedBuffer)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = Buffer.from(data);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const a = pixels[i + 3];

    if (a > 20) {
      // Check if it's white/gray text: r, g, b are close and high
      const isWhiteText = (r > 190 && g > 190 && b > 190) || (Math.abs(r - g) < 25 && Math.abs(g - b) < 25 && r > 160);
      if (isWhiteText) {
        // Change to deep dark charcoal #140d08
        pixels[i] = 20;     // R
        pixels[i + 1] = 13; // G
        pixels[i + 2] = 8;  // B
      }
    }
  }

  await sharp(pixels, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    }
  })
    .png()
    .toFile('public/logo-usk-light.png');

  console.log('Saved public/logo-usk-light.png');
}

generateCleanLogos().catch(console.error);
