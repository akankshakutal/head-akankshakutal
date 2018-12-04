const assert = require("assert");
const { execute, 
  getNLines } = require("../src/lib.js");

const add = num => num+10;
const sub = (num1,num2) => num1-num2;

describe("execute",function() {
  it("should call function with one argument ",function() {
    assert.equal(execute(add,[5]),15);
  });
  it("should call function with two arguments ",function() { 
      assert.equal(execute(sub,[10,5]),5)
  });
});

describe("getNLines",function() {
  let contents = "AB\nCD\nEF\nGH\nIJ\nKL\nMN\nOP\nQR\nST\nUV\nWX\nYZ"

  it("should return 10 lines when number of lines is not specified ",function() {
    let expectedOutput = "AB\nCD\nEF\nGH\nIJ\nKL\nMN\nOP\nQR\nST";
    assert.equal(getNLines(contents),expectedOutput);
  });

  it("should return specified number of lines when number of lines is given ",function() { 
    let expectedOutput = "AB\nCD\nEF";
    assert.equal(getNLines(contents,3),expectedOutput);
  });

  it("should return empty string when number of line is 0",function() { 
    let expectedOutput = "";
    assert.equal(getNLines(contents,0),expectedOutput);
  });
  
  it("should return empty string when contents is empty string ",function() {
    let contents = "";
    let expectedOutput = "";
    assert.equal(getNLines(contents,5),expectedOutput);
  });

});
