//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Project {
    address public company;

    constructor(address _company) {
        company = _company;
    }
}
