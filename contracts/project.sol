//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "./company.sol";

contract Project {
    address public company;

    modifier onlyAdmin() {
        Company companyInstance = Company(company);
        require(
            companyInstance.isAdmin(msg.sender),
            "Must be a Company admin to perform this action"
        );
        _;
    }

    constructor(address _company) {
        company = _company;
    }

    function onlyCompanyAdminStub() public view onlyAdmin returns (bool) {
        return true;
    }
}
