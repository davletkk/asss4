const { expect } = require("chai");

describe("SimpleStorage", function () {
  let SimpleStorage;
  let simpleStorage;

  beforeEach(async function () {
    SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.deployed();
  });

  it("Should set the value correctly", async function () {
    await simpleStorage.setValue(42);
    const value = await simpleStorage.getValue();
    expect(value).to.equal(42);
  });

  it("Should revert if the value is set by a non-owner", async function () {
    const [, unauthorized] = await ethers.getSigners();
    await expect(simpleStorage.connect(unauthorized).setValue(42)).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });

  it("Should emit the ValueChanged event when the value is changed", async function () {
    await expect(simpleStorage.setValue(42))
      .to.emit(simpleStorage, "ValueChanged")
      .withArgs(42);
  });
});
