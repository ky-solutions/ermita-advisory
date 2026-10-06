const sharp = require('sharp');
const fs = require('node:fs/promises');
async function main() {
  const svg = await fs.readFile('public/brand/favicon.svg');
  await fs.writeFile('app/icon.svg', svg);
  const png = await sharp(svg).resize(32,32).png().toBuffer();
  const header = Buffer.alloc(22);
  header.writeUInt16LE(1,2); header.writeUInt16LE(1,4);
  header[6]=32; header[7]=32;
  header.writeUInt16LE(1,10); header.writeUInt16LE(32,12);
  header.writeUInt32LE(png.length,14); header.writeUInt32LE(22,18);
  await fs.writeFile('app/favicon.ico',Buffer.concat([header,png]));
  await sharp(svg).resize(180,180).flatten({background:'#F7F6F2'}).png().toFile('app/apple-icon.png');
}
main().catch(error=>{console.error(error);process.exit(1)});
