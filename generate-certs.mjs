import sharp from 'sharp';

async function createCertImage(bgFile, outFile, courseName, batchName, issueDate, certId) {
  const svgText = Buffer.from(`
    <svg width="3000" height="2100" viewBox="0 0 3000 2100" xmlns="http://www.w3.org/2000/svg">
      <style>
        .name { font-family: 'Arial', 'Helvetica', sans-serif; font-size: 82px; font-weight: 800; fill: #1c2430; letter-spacing: 5px; text-anchor: middle; }
        .text { font-family: 'Arial', 'Helvetica', sans-serif; font-size: 44px; font-weight: 400; fill: #2c3848; text-anchor: middle; }
        .course { font-family: 'Arial', 'Helvetica', sans-serif; font-size: 48px; font-weight: 800; fill: #102238; }
        .batch { font-family: 'Arial', 'Helvetica', sans-serif; font-size: 42px; font-weight: 700; fill: #1c2430; text-anchor: middle; }
        .footer-left { font-family: 'Arial', 'Helvetica', sans-serif; font-size: 34px; font-weight: 400; fill: #2c3848; text-anchor: start; }
        .footer-center { font-family: 'Arial', 'Helvetica', sans-serif; font-size: 34px; font-weight: 400; fill: #2c3848; text-anchor: middle; }
        .footer-right { font-family: 'Arial', 'Helvetica', sans-serif; font-size: 34px; font-weight: 400; fill: #2c3848; text-anchor: end; }
      </style>

      <!-- Recipient Name -->
      <text x="1500" y="1375" class="name">RAHILA KAREEM</text>

      <!-- Completion line with bold course name -->
      <text x="1500" y="1495" class="text">
        has completed the training in <tspan class="course">${courseName}</tspan> course under DigiSkills Training Program
      </text>

      <!-- Batch line -->
      <text x="1500" y="1615" class="batch">${batchName}</text>

      <!-- Footer elements -->
      <text x="130" y="2030" class="footer-left">Issue Date : ${issueDate}</text>
      <text x="1500" y="2030" class="footer-center">This document may be verified online at: https://digiskills.pk/verify</text>
      <text x="2870" y="2030" class="footer-right">Certificate ID: ${certId}</text>
    </svg>
  `);

  await sharp('public/' + bgFile)
    .composite([{ input: svgText, top: 0, left: 0 }])
    .jpeg({ quality: 95 })
    .toFile('public/' + outFile);
  console.log('Successfully created public/' + outFile);
}

async function main() {
  await createCertImage(
    'cert-wordpress-bg.jpg',
    'certificate-wordpress.jpg',
    'WORDPRESS',
    'DSTP2.0-Batch-08 Jul 2024-Oct 2024',
    '24/10/2024',
    'PAU58RYMK'
  );

  await createCertImage(
    'cert-design-bg.jpg',
    'certificate-graphic-design.jpg',
    'GRAPHIC DESIGN',
    'Batch-04 Aug 2019-Oct 2019',
    '12/11/2019',
    'JNNAUY6PQ'
  );

  await createCertImage(
    'cert-marketing-bg.jpg',
    'certificate-digital-marketing.jpg',
    'DIGITAL MARKETING',
    'DSTP2.0-Batch-08 Jul 2024-Oct 2024',
    '24/10/2024',
    'BXMW4SUMK'
  );

  await createCertImage(
    'cert-design-bg.jpg',
    'certificate-freelancing.jpg',
    'FREELANCING',
    'Batch-04 Aug 2019-Oct 2019',
    '12/11/2019',
    'FL-JNNAUY6PQ'
  );

  await createCertImage(
    'cert-marketing-bg.jpg',
    'certificate-seo.jpg',
    'SEARCH ENGINE OPTIMIZATION (SEO)',
    'DSTP2.0-Batch-08 Jul 2024-Oct 2024',
    '24/10/2024',
    'SEO-BXMW4SUMK'
  );
}

main().catch(console.error);
