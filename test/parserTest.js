const {
  parse,
  createObject,
  isNumber,
  isOnlyType,
  isValidOption
} = require("../src/parser.js");

const assert = require("assert");

describe("isNumber", function() {
  it("it Should return null if suplied argument is not number", function() {
    assert.deepEqual(isNumber("aa"), null);
    assert.deepEqual(isNumber("8"), null);
  });

  it("it should return array if supplied argument is -anyNumber", function() {
    assert.deepEqual(isNumber("-8"), ["-8"]);
  });
});

describe("isOnlyType", function() {
  it("should return null if the arguments are not alphabate", function() {
    assert.deepEqual(isOnlyType("-e"), ["-e"]);
  });

  it("should return array of alphabate if the arguments are alphabate and value", function() {
    assert.deepEqual(isOnlyType("-r4"), ["-r"]);
  });
});

describe("isValidOption", function() {
  it("should return null if number is not given ", function() {
    assert.deepEqual(isValidOption("-n"), null);
  });

  it("should return null if arguments are only numbers", function() {
    assert.deepEqual(isValidOption("-4"), null);
  });

  it("should return array if arguments are both type and values", function() {
    assert.deepEqual(isValidOption("-n4"), ["-n4"]);
  });
});

describe("createObject", function() {
  it("should return object that contains three keys", function() {
    let expectedOutput = {
      option: "n",
      count: 5,
      fileNames: ["Hello", "Hiii"]
    };
    assert.deepEqual(createObject("n", 5, ["Hello", "Hiii"]), expectedOutput);
  });

  it("should return object with undefined when args are not given ", function() {
    let expectedOutput = {
      option: undefined,
      count: undefined,
      fileNames: undefined
    };
    assert.deepEqual(createObject(), expectedOutput);
  });
});

describe("parse", function() {
  describe("for -n option", function() {
    it("should return object when count is with option", function() {
      let input = ["-n4", "File1"];
      let expectedOutput = {
        option: "n",
        count: 4,
        fileNames: ["File1"]
      };
      assert.deepEqual(parse(input), expectedOutput);
    });

    it("should give default option -n if option is not specified", function() {
      input = ["-5", "file1"];
      expectedOutput = {
        option: "n",
        count: 5,
        fileNames: ["file1"]
      };
      assert.deepEqual(parse(input), expectedOutput);
    });

    it("should return object when count is on second index ", function() {
      let input = ["-n", "4", "File2"];
      let expectedOutput = {
        option: "n",
        count: 4,
        fileNames: ["File2"]
      };
      assert.deepEqual(parse(input), expectedOutput);
    });

    it("should return object which contains string in count", function() {
      let input = ["-n", "File1"];
      let expectedOutput = {
        option: "n",
        count: "File1",
        fileNames: []
      };
      assert.deepEqual(parse(input), expectedOutput);
    });
  });
  describe("for -c option", function() {
    it("should return object which contains c as a option ", function() {
      let input = ["-c20", "File1"];
      let expectedOutput = {
        option: "c",
        count: "20",
        fileNames: ["File1"]
      };
      assert.deepEqual(parse(input), expectedOutput);
    });

    it("should return type n, range 10 and given input in fileNames if there is no type or range specified", function() {
      let input = ["file1"];
      let expectedOutput = {
        option: "n",
        count: 10,
        fileNames: ["file1"]
      };
      assert.deepEqual(parse(input), expectedOutput);
    });

    it("should return object when count is on second index ", function() {
      let input = ["-c", "4", "File2"];
      let expectedOutput = {
        option: "c",
        count: 4,
        fileNames: ["File2"]
      };
      assert.deepEqual(parse(input), expectedOutput);
    });
  });
});
