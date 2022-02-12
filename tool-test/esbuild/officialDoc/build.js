require('esbuild').build({
  entryPoints: ['app.jsx'],
  bundle: true,
  outfile: 'out.js',
  // minify:true
  // sourcemap: true
  // target: ['chrome 49'],// ['node10.4']
  // platform: 'node'
  // external: ['./node_modules/*']
}).catch((err) => {
  console.log('err :>> ', err);
  process.exit(1);
});