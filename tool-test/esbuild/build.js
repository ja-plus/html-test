require("esbuild")
  .build({
    entryPoints: [/* 'app.jsx' */ "./officialDoc/study.js"],
    outfile: "./officialDoc/study.out.js",
    bundle: true,
    // minify:true
    // sourcemap: true
    target: ["es2015"], // ['node10.4']
    // platform: 'node'
    // external: ['./node_modules/*']
  })
  .catch((err) => {
    console.log("err :>> ", err);
    process.exit(1);
  });
