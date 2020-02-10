const postcss = require("postcss");
const fs = require("fs");
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

const inFile = __dirname + "./../dist/global.css";
const outFile = __dirname + "./../global.css";

fs.readFile(inFile, (err, css) => {
  postcss([tailwindcss, autoprefixer, purgecss])
    .process(css, {
      from: inFile,
      to: outFile
    })
    .then(result => {
      fs.writeFile(outFile, result.css, () => true);
      fs.unlinkSync(inFile);
    });
});
