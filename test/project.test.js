const { expect } = require("chai");

describe("Project Contract", () => {
  let ProjectContract;
  let projectInstance;
  let companyAddress;
  before(async () => {
    const CompanyContract = await ethers.getContractFactory("Company");
    const companyInstance = await CompanyContract.deploy();
    companyAddress = companyInstance.address;
  });
  beforeEach(async () => {
    [owner, admin, maliciousAcc] = await ethers.getSigners();

    ProjectContract = await ethers.getContractFactory("Project");

    projectInstance = await ProjectContract.deploy(companyAddress);
  });
  context("on deploy", () => {
    it("should have an address of a parent Company contract", async () => {
      expect(await projectInstance.company()).to.equal(companyAddress);
    });
  });
});
