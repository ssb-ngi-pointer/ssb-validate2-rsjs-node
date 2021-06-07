const fs = require('fs');

async function move(orig, dest) {
  await fs.promises.rename(orig, dest);
}

async function mkdirp(folder) {
  if (fs.existsSync(folder)) return;
  try {
    fs.mkdirSync(folder);
  } catch (err) {}
}


(async function main() {
  // npm_config_platform exists only when nodejs-mobile is building our module
  const platform = process.env['npm_config_platform'];

  // On iOS nodejs-mobile we need index.node to be a folder that
  // will be converted to a .framework
  if (platform === 'ios') {
    move('dist/index.node', 'dist/index');
    mkdirp('dist/index.node');
    move('dist/index', 'dist/index.node/index');
  }
})();
