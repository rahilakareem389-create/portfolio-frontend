import sharp from 'sharp';

async function processPng() {
  const sourcePng = 'C:/Users/Boss/.gemini/antigravity/brain/68ddd396-77b1-4f27-a417-23c2ff271222/.user_uploaded/media_1791900681519_81919135.png';
  
  // Trim the white/transparent background completely
  const trimmed = await sharp(sourcePng)
    .trim()
    .toFile('public/logo-usk-clean.png');

  console.log('Trimmed PNG output:', trimmed);
}

processPng().catch(console.error);
