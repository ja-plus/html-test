import { readdirSync, writeFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { build } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packagesDir = path.join(__dirname, './packages');
const outDir = path.join(__dirname, './lib');

async function main() {
  const packages = readdirSync(packagesDir);
  let indexFileContent = '';
  const promise = [];
  for (const compName of packages) {
    // const stats = lstatSync(path.join(packagesDir, compName));
    // if (stats.isDirectory()) {
    //   // 如果是目录，则构建
    // }
    if (compName.indexOf('index.ts') === -1) {
      promise.push(buildAComponent(compName));
      indexFileContent += `export { default as ${compName} } from './${compName}/index.ts';\n`;
    }
  }
  await Promise.all(promise);
  createIndexFile(indexFileContent);
  console.log('index.js created');
}
main();

/**
 * 构建一个组件
 * @param {string} compName 组件名称，对应packages目录下的文件夹名称
 */
async function buildAComponent(compName) {
  const entry = path.join(packagesDir, compName, 'index.ts');
  await build({
    build: {
      outDir: path.join(outDir, compName),
      lib: {
        entry: [entry],
        formats: ['es'],
      },
    },
  });
}

/**
 * 生成index文件
 * @param {string} fileContent
 */
function createIndexFile(fileContent) {
  writeFileSync(path.join(outDir, 'index.js'), fileContent);
}
