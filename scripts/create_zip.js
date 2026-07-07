const fs = require('fs');
const archiver = require('archiver'); // I hope archiver is installed, if not I'll use a simpler way

const output = fs.createWriteStream('public.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => console.log('public.zip created.'));
archive.on('error', (err) => { throw err; });

archive.pipe(output);
archive.directory('public/', false);
archive.finalize();
