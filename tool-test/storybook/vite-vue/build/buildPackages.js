import { readdirSync, writeFileSync } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { build } from 'vite';
import dts from 'vite-plugin-dts';
import { diffMasterBranch } from './diffMasterBranch';
// import { copySync } from 'fs-extra/esm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const packagesDir = path.join(__dirname, '../packages');
const outDir = path.join(__dirname, '../lib');
/** 是否增量构建 */
const isIncrement = process.argv.includes('--increment');

console.time('build cost');
main().then(() => {
  console.timeEnd('build cost');
});

async function main() {
  const packages = readdirSync(packagesDir);
  let indexFileContent = '';
  const exportNames = [];
  const promise = [];
  /**@type {Set<string> | null} */
  let needPackedComponentNames = null;
  if (isIncrement) {
    needPackedComponentNames = diffMasterBranch();
  }

  for (const folderName of packages) {
    // const stats = lstatSync(path.join(packagesDir, compName));
    // if (stats.isDirectory()) {
    //   // 如果是目录，则构建
    // }
    const firstLetter = folderName[0];
    const isFirstLetterUpperCase = /[A-Z]/.test(firstLetter);
    if (isFirstLetterUpperCase && folderName.indexOf('.ts') === -1) {
      indexFileContent += `import { ${folderName} } from './${folderName}/index.js';\n`;
      exportNames.push(folderName);

      if (!needPackedComponentNames || needPackedComponentNames.has(folderName)) {
        promise.push(buildAComponent(folderName));
      }
    }
  }
  await Promise.all(promise);
  indexFileContent += `export { ${exportNames.join(', ')} };`;
  writeFileSync(path.join(outDir, 'index.js'), indexFileContent);
  console.log('create entry file: lib/index.js');
  writeFileSync(path.join(packagesDir, 'index.d.ts'), '/** ⭐⭐此文件在打包时自动生成，请不要修改⭐⭐*/\n' + indexFileContent.replace(/\.js/g, ''));
  console.log('create declaration file: packages/index.d.ts');
  // 复制静态资源目录
  // copySync(path.join(packagesDir, 'assets'), path.join(outDir, 'assets'));
  // console.log('copied: packages/assets => lib/assets');
}

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
    plugins: [
      dts({
        outputDir: './lib',
        entryRoot: './packages',
      }),
      /**
       * 在产物js上导入css
       */
      (function () {
        return {
          name: 'auto-import-style',
          generateBundle(options, bundle) {
            bundle['index.js'].code = 'import "./style.css";\n' + bundle['index.js'].code;
          },
        };
      })(),
    ],
  });
}
