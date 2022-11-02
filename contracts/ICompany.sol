//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

interface ICompany {
    function owner() external view returns (address);

    function addAdmin(address admin) external;

    function removeAdmin(address admin) external;

    function getAdmins() external view returns (address[] calldata);

    function isAdmin(address subject) external view returns (bool);
}
