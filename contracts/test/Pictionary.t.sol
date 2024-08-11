// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Pictionary} from "../src/Pictionary.sol";

contract PictionaryTest is Test {
    Pictionary public game;

    function setUp() public {
        game = new Pictionary();
    }

    function test_createGame() public {
        uint16 startTime = uint16(block.timestamp + 2000);
        game.createGame(startTime, 2);
        assertEq(game.getGameStartTime(1), startTime);
        assertEq(game.getGameMaxPlayerCount(1), 2);
    }

    function testFuzz_joinGame(uint256 randomNum) public {
        uint16 startTime = uint16(block.timestamp + 2000);
        game.createGame(startTime, 2);
        game.joinGame(1, randomNum);
        assertEq(game.getGameCurrentPlayerCount(1), 1);
    }

    function test_verify() public {
        uint256[] memory randomNums = new uint256[](5);
        for (uint256 i = 0; i < 5; i++) {
            randomNums[i] = 1 + i;
        }
        console.log(game.verify(randomNums));
        assertEq(game.verify(randomNums), 4);
    }

    function test_verify2() public {
        uint256[] memory randomNums = new uint256[](6);
        for (uint256 i = 0; i < 5; i++) {
            randomNums[i] = 1 + i;
        }
        randomNums[5] = 1;

        console.log(game.verify(randomNums));
        assertEq(game.verify(randomNums), 4);
    }
}
