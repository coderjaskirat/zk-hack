// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Pictionary} from "../src/Pictionary.sol";

/* 
source .env && forge script script/Pictionary.s.sol:PictionaryScript --rpc-url $NOVA_RPC_URL --private-key $DEPLOYER_PRIVATE_KEY --broadcast --verify --verifier blockscout --verifier-url $NOVA_VERIFIER_URL
*/

contract PictionaryScript is Script {
    Pictionary public game;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        game = new Pictionary();

        vm.stopBroadcast();
    }
}
