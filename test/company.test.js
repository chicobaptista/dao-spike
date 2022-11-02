const { expect } = require("chai");

describe("Company Contract", () => {
  let owner;
  let CompanyContract;
  let companyContractInstance;
  const ONLY_OWNER_ERROR_MSG =
    "Only the contract owner is allowed to call this method.";

  beforeEach(async () => {
    [owner, admin, maliciousAcc] = await ethers.getSigners();

    CompanyContract = await ethers.getContractFactory("Company");

    companyContractInstance = await CompanyContract.deploy();
  });
  it("should have the deployer assigned as owner", async () => {
    expect(await companyContractInstance.owner()).to.equal(owner.address);
  });
  describe("addAdmin method", () => {
    context("called by not an owner", () => {
      it("should revert", async () => {
        await expect(
          companyContractInstance
            .connect(maliciousAcc)
            .addAdmin(maliciousAcc.address)
        ).to.be.revertedWith(ONLY_OWNER_ERROR_MSG);
      });
    });
    context("called by owner", () => {
      it("should add admin to enum", async () => {
        expect(await companyContractInstance.getAdmins()).to.be.empty;
        await companyContractInstance.addAdmin(admin.address);
        expect(await companyContractInstance.getAdmins()).to.contain(
          admin.address
        );
      });
    });
  });

  describe("getAdmins method", () => {
    it("should return the current registered admins set", async () => {
      expect(await companyContractInstance.getAdmins()).to.be.empty;
      await companyContractInstance.addAdmin(admin.address);
      expect(await companyContractInstance.getAdmins()).to.contain(
        admin.address
      );
    });
  });
  describe("removeAdmin method", () => {
    context("called by not an owner", () => {
      it("should revert", async () => {
        await expect(
          companyContractInstance
            .connect(maliciousAcc)
            .removeAdmin(maliciousAcc.address)
        ).to.be.revertedWith(ONLY_OWNER_ERROR_MSG);
      });
    });
    context("called by owner", () => {
      context("admin is registered", () => {
        it("should remove admin from enum", async () => {
          await companyContractInstance.addAdmin(admin.address);
          await companyContractInstance.removeAdmin(admin.address);
          expect(await companyContractInstance.getAdmins()).to.not.contain(
            admin.address
          );
        });
      });
      context("admin is NOT registered", () => {
        it("should 'remove' admin from enum anyways", async () => {
          await companyContractInstance.removeAdmin(maliciousAcc.address);
          expect(await companyContractInstance.getAdmins()).to.not.contain(
            maliciousAcc.address
          );
        });
      });
    });
  });
  describe("isAdmin method", () => {
    it("should return whether address is registered as Admin", async () => {
      await companyContractInstance.addAdmin(admin.address);
      expect(
        await companyContractInstance.isAdmin(admin.address),
        "should return true for registered admin"
      ).to.be.true;
      expect(
        await companyContractInstance.isAdmin(maliciousAcc.address),
        "should return false for malicious account"
      ).to.be.false;
    });
  });
});
