const sass = require("node-sass");
const fs = require("fs");

const inFile = "./src/global/app.scss";
const outFile = "./dist/global.css";

sass.render(
  {
    file: inFile,
    outFile
  },
  (err, result) => {
    if (!err) {
      fs.writeFile(outFile, result.css, err => {
        if (err) {
          throw err;
        }
      });
    } else {
      throw err;
    }
  }
);
