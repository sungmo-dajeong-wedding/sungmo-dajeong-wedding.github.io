import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

// ===============================
// 갤러리 설정
// ===============================
const GALLERY_INPUT = path.resolve('src/assets/gallery-original');
const GALLERY_OUTPUT = path.resolve('src/assets/gallery');

const THUMB_WIDTH = 800;
const LARGE_WIDTH = 3000;

const WEBP_QUALITY = 82;
const AVIF_QUALITY = 65;

// ===============================
// 배경 설정
// ===============================
const BG_INPUT = path.resolve('src/assets/background-original');
const BG_OUTPUT = path.resolve('src/assets/background');

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

function isJpg(name) {
  const lower = name.toLowerCase();
  return lower.endsWith('.jpg') || lower.endsWith('.jpeg');
}

// ===============================
// 갤러리 최적화
// ===============================
async function optimizeGalleryImage(filePath, base) {
  await sharp(filePath)
    .rotate()
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(path.join(GALLERY_OUTPUT, `${base}-600.webp`));

  await sharp(filePath)
    .rotate()
    .resize({ width: LARGE_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(path.join(GALLERY_OUTPUT, `${base}-2000.webp`));

  await sharp(filePath)
    .rotate()
    .resize({ width: LARGE_WIDTH, withoutEnlargement: true })
    .avif({ quality: AVIF_QUALITY })
    .toFile(path.join(GALLERY_OUTPUT, `${base}-2000.avif`));
}

// ===============================
// 배경 최적화
// ===============================
async function optimizeBackgroundImage(filePath, base) {
  await sharp(filePath)
    .rotate()
    .resize({ width: LARGE_WIDTH, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(path.join(BG_OUTPUT, `${base}-2000.webp`));

  await sharp(filePath)
    .rotate()
    .resize({ width: LARGE_WIDTH, withoutEnlargement: true })
    .avif({ quality: AVIF_QUALITY })
    .toFile(path.join(BG_OUTPUT, `${base}-2000.avif`));
}

async function main() {
  await ensureDir(GALLERY_OUTPUT);
  await ensureDir(BG_OUTPUT);

  // 갤러리 처리
  const galleryFiles = (await fs.readdir(GALLERY_INPUT))
    .filter(isJpg)
    .sort((a, b) => Number(path.parse(a).name) - Number(path.parse(b).name));

  for (const file of galleryFiles) {
    const filePath = path.join(GALLERY_INPUT, file);
    const base = path.parse(file).name;
    console.log(`Gallery: ${file}`);
    await optimizeGalleryImage(filePath, base);
  }

  // 배경 처리
  const bgFiles = (await fs.readdir(BG_INPUT)).filter(isJpg);

  for (const file of bgFiles) {
    const filePath = path.join(BG_INPUT, file);
    const base = path.parse(file).name;
    console.log(`Background: ${file}`);
    await optimizeBackgroundImage(filePath, base);
  }

  console.log('모든 이미지 최적화 완료');
}

main().catch(console.error);