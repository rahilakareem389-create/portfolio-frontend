import sharp from 'sharp';

async function processLogos() {
  const sourceJpg = 'C:/Users/Boss/.gemini/antigravity/brain/68ddd396-77b1-4f27-a417-23c2ff271222/.user_uploaded/media_1791899757707_7065d92b.jpg';
  
  // Crop precisely to the logo graphic
  // In 1024x686: USK emblem starts at x: 95, y: 310; Text ends at x: 920, y: 590
  // Let's extract the exact logo region
  await sharp(sourceJpg)
    .extract({ left: 95, top: 310, width: 825, height: 280 })
    .toFile('public/logo-dark-40.png');

  console.log('Saved logo-dark-40.png');

  // Let's also create an emblem-only version (USK emblem only)
  await sharp(sourceJpg)
    .extract({ left: 95, top: 310, width: 335, height: 280 })
    .toFile('public/logo-emblem.png');

  console.log('Saved logo-emblem.png');
}

processLogos().catch(console.error);
