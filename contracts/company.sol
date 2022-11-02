//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Company {
    address public owner;

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

    function ownerStub() public view onlyOwner returns (string memory) {
        return "Success string!";
    }
}
