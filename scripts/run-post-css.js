const postcss = require("postcss");
const { readFile, writeFile, unlinkSync } = require("fs");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: [
    "./src/**/*.html",
    "./src/**/*.js",
    "./src/**/*.jsx",
    "./src/**/*.ts",
    "./src/**/*.tsx",
    "./public/index.html"
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

const inFile = "./dist/global.css";
const outFile = "./global.css";

readFile(inFile, (err, css) => {
  if (!err) {
    postcss([tailwindcss, autoprefixer, purgecss])
      .process(css, {
        from: inFile,
        to: outFile
      })
      .then(result => {
        writeFile(outFile, result.css, () => true);
        unlinkSync(inFile);
      })
      .catch(err => {
        throw err;
      });
  } else {
    throw err;
  }
});
