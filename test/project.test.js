const { expect } = require("chai");

describe("Project Contract", () => {
  let ProjectContract;
  let projectInstance;
  let companyAddress;
  const ONLY_COMPANY_ADMIN_ERROR_MSG =
    "Must be a Company admin to perform this action";
  before(async () => {
    [owner, admin, maliciousAcc] = await ethers.getSigners();

    const CompanyContract = await ethers.getContractFactory("Company");
    const companyInstance = await CompanyContract.deploy();
    companyAddress = companyInstance.address;
    await companyInstance.addAdmin(admin.address);
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

  describe("onlyAdminStub method", () => {
    context("called by a registerd Admin", () => {
      it("should return true", async () => {
        expect(await projectInstance.connect(admin).onlyCompanyAdminStub()).to
          .be.true;
      });
    });
    context("called by a malicious account", () => {
      it("should throw an access denied error", async () => {
        await expect(
          projectInstance.connect(maliciousAcc).onlyCompanyAdminStub()
        ).to.be.revertedWith(ONLY_COMPANY_ADMIN_ERROR_MSG);
      });
    });
  });
});
