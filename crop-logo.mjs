import sharp from 'sharp';
import path from 'path';

async function cropLogo() {
  const sourceJpg = 'C:/Users/Boss/.gemini/antigravity/brain/68ddd396-77b1-4f27-a417-23c2ff271222/.user_uploaded/media_1791899757707_7065d92b.jpg';
  const meta = await sharp(sourceJpg).metadata();
  console.log('Original JPG dimensions:', meta.width, meta.height);

  // In the 1024x683 wallpaper, let's find the bounding box
  // Let's trim or crop the center logo area
  // The logo is approximately located around: left: 90, top: 190, width: 850, height: 300
  // Let's do sharp trim or extract
  const trimmed = await sharp(sourceJpg)
    .extract({ left: 80, top: 180, width: 860, height: 310 })
    .toFile('public/logo-cropped.png');

  console.log('Created logo-cropped.png:', trimmed);

  // Also let's inspect media_1791900681519_81919135.png (which has white background)
  const sourcePng = 'C:/Users/Boss/.gemini/antigravity/brain/68ddd396-77b1-4f27-a417-23c2ff271222/.user_uploaded/media_1791900681519_81919135.png';
  const metaPng = await sharp(sourcePng).metadata();
  console.log('Original PNG dimensions:', metaPng.width, metaPng.height);

  // In this 579x388 PNG, let's find the actual non-white bounding box
  const pngTrimmed = await sharp(sourcePng)
    .trim({ threshold: 10 })
    .toFile('public/logo-transparent.png');
  console.log('Trimmed PNG dimensions:', pngTrimmed);
}

cropLogo().catch(console.error);
