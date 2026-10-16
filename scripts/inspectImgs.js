import fs from 'fs';

const assetsDir = 'frontend/public/assets';
const files = fs.readdirSync(assetsDir);

const imgs = files.filter(f => /^img\d+\.(jpg|jpeg|png)$/i.test(f)).sort((a,b)=>parseInt(a.match(/\d+/)[0])-parseInt(b.match(/\d+/)[0]));
const vids = files.filter(f => /^vid\d+\.mp4$/i.test(f)).sort((a,b)=>parseInt(a.match(/\d+/)[0])-parseInt(b.match(/\d+/)[0]));

console.log('Images:', imgs);
console.log('Videos:', vids);

const testimoniesDir = 'frontend/public/assets/testimonies';
const testFiles = fs.readdirSync(testimoniesDir);
const testImgs = testFiles.filter(f => /^test\d+\.(jpg|jpeg|png)$/i.test(f)).sort((a,b)=>parseInt(a.match(/\d+/)[0])-parseInt(b.match(/\d+/)[0]));
const testVids = testFiles.filter(f => /^vid\d+\.mp4$/i.test(f)).sort((a,b)=>parseInt(a.match(/\d+/)[0])-parseInt(b.match(/\d+/)[0]));

console.log(`Testimony images (${testImgs.length}):`, testImgs.slice(0, 5), '...', testImgs.slice(-3));
console.log(`Testimony videos (${testVids.length}):`, testVids);
