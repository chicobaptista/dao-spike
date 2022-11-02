//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "./ICompany.sol";

contract Company is AccessControlEnumerable, ICompany {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    modifier isOwner() {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Only the contract owner is allowed to call this method."
        );
        _;
    }

    constructor() {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function owner() public view returns (address) {
        return getRoleMember(DEFAULT_ADMIN_ROLE, 0);
    }

    function addAdmin(address admin) public isOwner {
        grantRole(ADMIN_ROLE, admin);
    }

    function removeAdmin(address admin) public isOwner {
        revokeRole(ADMIN_ROLE, admin);
    }

    function getAdmins() public view returns (address[] memory) {
        uint adminCount = getRoleMemberCount(ADMIN_ROLE);
        address[] memory admins = new address[](adminCount);
        for (uint i; i < adminCount; ++i) {
            admins[i] = getRoleMember(ADMIN_ROLE, i);
        }

        return admins;
    }

    function isAdmin(address subject) public view returns (bool) {
        return hasRole(ADMIN_ROLE, subject);
    }
}
