import fs from 'fs';
import https from 'https';
import path from 'path';

const logosDir = 'frontend/public/assets/logos';
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir, { recursive: true });
}

const brands = [
  { slug: 'toyota', name: 'Toyota' },
  { slug: 'honda', name: 'Honda' },
  { slug: 'bmw', name: 'BMW' },
  { slug: 'mercedes', name: 'Mercedes-Benz' },
  { slug: 'dodge', name: 'Dodge' },
  { slug: 'ford', name: 'Ford' },
  { slug: 'chevrolet', name: 'Chevrolet' },
  { slug: 'jeep', name: 'Jeep' },
  { slug: 'audi', name: 'Audi' },
  { slug: 'nissan', name: 'Nissan' },
  { slug: 'tesla', name: 'Tesla' },
  { slug: 'lexus', name: 'Lexus' }
];

function fetchLogo(brand) {
  return new Promise((resolve) => {
    const url = `https://cdn.simpleicons.org/${brand.slug}`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200 && data.includes('<svg')) {
          // Replace fill with currentColor so it responds seamlessly to dark and light mode!
          const cleanSvg = data.replace(/fill="[^"]*"/g, 'fill="currentColor"');
          fs.writeFileSync(path.join(logosDir, `${brand.slug}.svg`), cleanSvg, 'utf8');
          console.log(`Saved logo for ${brand.name}`);
        } else {
          console.log(`Failed to fetch ${brand.name}, status ${res.statusCode}`);
        }
        resolve();
      });
    }).on('error', (err) => {
      console.error(`Error fetching ${brand.name}:`, err.message);
      resolve();
    });
  });
}

async function run() {
  for (const b of brands) {
    await fetchLogo(b);
  }
  console.log('Finished downloading brand logos.');
}

run();
