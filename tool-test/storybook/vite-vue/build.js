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
  const exportNames = [];
  const promise = [];
  for (const compName of packages) {
    // const stats = lstatSync(path.join(packagesDir, compName));
    // if (stats.isDirectory()) {
    //   // 如果是目录，则构建
    // }
    if (compName.indexOf('index.ts') === -1) {
      promise.push(buildAComponent(compName));
      indexFileContent += `import { ${compName} } from './${compName}/index.js';\n`;
      exportNames.push(compName);
    }
  }
  await Promise.all(promise);
  indexFileContent += `export { ${exportNames.join(',')} }`;
  writeFileSync(path.join(outDir, 'index.js'), indexFileContent);
  console.log('index.js created');
}
main();

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
        fileName: compName,
        formats: ['es'],
      },
      rollupOptions: {
        external: ['vue', 'd3-interpolate'], // 排除三方包
      },
    },
  });
  const indexFileContent = `import './style.css';\nimport { ${compName} } from './${compName}.js';\nexport { ${compName} };`;
  writeFileSync(path.join(out, 'index.js'), indexFileContent);
}
