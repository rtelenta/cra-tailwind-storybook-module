const sass = require("node-sass");
const fs = require("fs");

const inFile = __dirname + "./../src/global/app.scss";
const outFile = __dirname + "./../dist/global.css";

sass.render(
  {
    file: inFile,
    outFile
  },
  (error, result) => {
    if (!error) {
      fs.writeFile(outFile, result.css, err => {
        if (!err) {
        }
      });
    }
  }
);
