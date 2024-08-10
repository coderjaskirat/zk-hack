// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Pictionary {
    uint256 public lastGameId;

    struct Game {
        uint16 startTime;
        address creator;
        uint256 playerCount;
    }

    mapping(uint256 => Game) public games;
    mapping(uint256 => address[]) public players;

    event GameCreated(uint256 gameId);

    function createGame(uint16 startTime, uint256 playerCount) public {
        lastGameId++;

        games[lastGameId] = Game({
            startTime: startTime,
            creator: msg.sender,
            playerCount: playerCount
        });

        emit GameCreated(lastGameId);
    }

    function joinGame(uint256 gameId) public {
        require(games[gameId].playerCount > players[gameId].length, "Game is full");
        players[gameId].push(msg.sender);
    }

    function getGameStartTime(uint256 gameId) public view returns (uint16) {
        return games[gameId].startTime;
    }

    function getGameCurrentPlayerCount(uint256 gameId) public view returns (uint256) {
        return players[gameId].length;
    }

    function getGameMaxPlayerCount(uint256 gameId) public view returns (uint256) {
        return games[gameId].playerCount;
    }
}
