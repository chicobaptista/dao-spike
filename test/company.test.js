const { expect } = require("chai");

describe("Company Contract", () => {
  let owner;

  let CompanyContract;

  let companyContractInstance;

  beforeEach(async () => {
    [owner, admin, maliciousAcc] = await ethers.getSigners();

    CompanyContract = await ethers.getContractFactory("Company");

    companyContractInstance = await CompanyContract.deploy();
  });
  it("should have the deployer assigned as owner", async () => {
    expect(await companyContractInstance.owner()).to.equal(owner.address);
  });
  context("onlyOwnerStub", () => {
    it("should return a sample string on being called by the owner address", async () => {
      expect(await companyContractInstance.connect(owner).ownerStub()).to.equal(
        "Success string!"
      );
    });
    it("should return an error when called by another address", async () => {
      await expect(
        companyContractInstance.connect(maliciousAcc).ownerStub()
      ).to.be.revertedWith(
        "Only the contract owner is allowed to call this method."
      );
    });
  });
});
