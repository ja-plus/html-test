import { readdirSync, writeFile, writeFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { build } from 'vite';
// import { copySync } from 'fs-extra/esm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packagesDir = path.join(__dirname, './packages');
const outDir = path.join(__dirname, './lib');
async function main() {
  const packages = readdirSync(packagesDir);
  let indexFileContent = '';
  const exportNames = [];
  const promise = [];
  for (const folderName of packages) {
    // const stats = lstatSync(path.join(packagesDir, compName));
    // if (stats.isDirectory()) {
    //   // 如果是目录，则构建
    // }
    const firstLetter = folderName[0];
    const isFirstLetterUpperCase = /[A-Z]/.test(firstLetter);
    if (isFirstLetterUpperCase && folderName.indexOf('.ts') === -1) {
      promise.push(buildAComponent(folderName));
      indexFileContent += `import { ${folderName} } from './${folderName}/index.js';\n`;
      exportNames.push(folderName);
    }
  }
  await Promise.all(promise);
  indexFileContent += `export { ${exportNames.join(', ')} };`;
  writeFileSync(path.join(outDir, 'index.js'), indexFileContent);
  console.log('created: lib/index.js');
  writeFileSync(path.join(packagesDir, 'index.ts'), '/** ⭐⭐此文件在打包时自动生成，请不要修改⭐⭐*/\n' + indexFileContent.replace(/\.js/g, ''));
  console.log('updated: packages/index.ts');
  // 复制静态资源目录
  // copySync(path.join(packagesDir, 'assets'), path.join(outDir, 'assets'));
  // console.log('copied: packages/assets => lib/assets');
}
console.time('build cost');
main().then(() => {
  console.timeEnd('build cost');
});

/**
 * 构建一个组件
 * @param {string} compName 组件名称，对应packages目录下的文件夹名称
 */
async function buildAComponent(compName) {
  const entry = path.join(packagesDir, compName, 'index.ts');
  const out = path.join(outDir, compName);
  await build({
    build: {
      outDir: out,
      lib: {
        entry: [entry],
        formats: ['es'],
      },
    },
  });
}
