//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

contract Company {
    using EnumerableSet for EnumerableSet.AddressSet;

    address public owner;

    EnumerableSet.AddressSet admins;

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the contract owner is allowed to call this method."
        );
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addAdmin(address admin)
        public
        onlyOwner
        returns (address[] memory)
    {
        admins.add(admin);
        return admins.values();
    }

    function removeAdmin(address admin)
        public
        onlyOwner
        returns (address[] memory)
    {
        admins.remove(admin);
        return admins.values();
    }

    function getAdmins() public view returns (address[] memory) {
        return admins.values();
    }

    function ownerStub() public view onlyOwner returns (string memory) {
        return "Success string!";
    }
}
