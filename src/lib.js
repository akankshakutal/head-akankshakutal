const { checkErrors } = require("./errorLib.js");

const getNLines = function(content, range) {
  return content
    .split("\n")
    .slice(range[0], range[1])
    .join("\n");
};

const getNBytes = function(content, range) {
  return content.slice(range[0], range[1]);
};

const addHeading = function(fileName, content) {
  return "==> " + fileName + " <==\n" + content;
};

const getContents = function(fileSystem, context, file) {
  if (!fileSystem.existsSync(file)) {
    return context + ": " + file + ": No such file or directory";
  }
  let contents = fileSystem.readFileSync(file, "utf8");
  return contents;
};

const getRequiredContents = function(userInput, range, contents) {
  if (userInput.option == "n") {
    return getNLines(contents, range);
  }
  return getNBytes(contents, range);
};

const formatContents = function(files, content, index) {
  if (content.match(/: No such file or directory/)) return content;
  return addHeading(files[index], content);
};

const getFilteredContents = function(userInput, operation, fileSystem) {
  let context = operation
    .match(/....\.js/)
    .join("")
    .slice(0, 4);
  let error = checkErrors(userInput, context);
  let range = [0, userInput.count];
  if (context === "tail") {
    range = [-userInput.count];
  }
  if (error) return error;
  let contents = userInput.files.map(
    getContents.bind(null, fileSystem, context)
  );
  let requiredContents = contents.map(
    getRequiredContents.bind(null, userInput, range)
  );
  if (requiredContents.length == 1) return requiredContents.join("\n\n");
  let formattedContents = requiredContents.map(
    formatContents.bind(null, userInput.files)
  );
  return formattedContents.join("\n\n");
};

module.exports = {
  getFilteredContents,
  getNLines,
  addHeading,
  getContents,
  getRequiredContents,
  formatContents,
  getNBytes
};
