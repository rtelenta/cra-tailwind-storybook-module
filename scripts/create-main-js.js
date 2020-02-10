const { readdirSync, appendFile, unlinkSync, existsSync } = require("fs");

const componentsDirectory = "./src/components";
const mainJsFile = `${componentsDirectory}/index.tsx`;

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

const contentFile = () => {
  const directories = getDirectories(componentsDirectory);
  const importComponents = directories.map(
    component => `import ${component} from "./${component}";`
  );

  const exportComponents = `export { ${directories.join(", ")} }`;

  return `${importComponents.join("\n")}\n\n${exportComponents}`;
};

if (existsSync(mainJsFile)) {
  unlinkSync(mainJsFile);
}

appendFile(mainJsFile, contentFile(), err => {
  if (err) throw err;
});
