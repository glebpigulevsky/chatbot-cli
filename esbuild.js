const envFilePlugin = require('esbuild-envfile-plugin');

    // Config: relative to where npm command is run:
const ENTRY_FILE = 'index.js';
const OUTPUT_DIR = 'build';
const OUTPUT_FILE = 'app.js';
const IS_DEV = true;
const TARGET = 'es2018';


    function build(entryFile, outFile) {
      require('esbuild').build({
          entryPoints: [entryFile],
          outfile: outFile,
          platform: 'node',
          bundle: true,
          define: { "process.env.NODE_ENV": IS_DEV ? "\"development\"" : "\"product\"" },
          target: TARGET,
          logLevel: 'silent',
          plugins: [envFilePlugin]
      })
      .then(r => { console.log("Build succeeded.") })
      .catch((e) => {
          console.log("Error building:", e.message);
          process.exit(1)
      })
  }
  
  build(`${ENTRY_FILE}`, `${OUTPUT_DIR}/${OUTPUT_FILE}`);