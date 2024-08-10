// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Pictionary} from "../src/Pictionary.sol";

contract PictionaryScript is Script {
    Pictionary public game;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        game = new Pictionary();

        vm.stopBroadcast();
    }
}
