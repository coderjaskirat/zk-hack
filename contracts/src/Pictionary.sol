// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Pictionary {
    address public owner;
    uint256 public lastGameId;
    uint256 public categoryCount;

    struct Game {
        uint16 startTime;
        address creator;
        uint256 playerCount;
    }

    mapping(uint256 => string) public categories;
    mapping(uint256 => Game) public games;
    mapping(uint256 => address[]) public players;
    mapping(uint256 => uint256) public targets;

    event GameCreated(uint256 gameId);

    modifier isOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
        categories[0] = 'apple';
        categories[1] = 'banana';
        categories[2] = 'cherry';
        categories[3] = 'dog';
        categories[4] = 'elephant';
        categories[5] = 'frog';
        categories[6] = 'giraffe';
        categories[7] = 'horse';
        categories[8] = 'iguana';
        categories[9] = 'jaguar';
        categoryCount = 10;
    }

    function createGame(uint16 startTime, uint256 playerCount) public {
        lastGameId++;

        games[lastGameId] = Game({
            startTime: startTime,
            creator: msg.sender,
            playerCount: playerCount
        });

        emit GameCreated(lastGameId);
    }

    function joinGame(uint256 gameId, uint256 randomNumber) public {
        require(games[gameId].playerCount > players[gameId].length, "Game is full");
        players[gameId].push(msg.sender);
        targets[gameId] = uint256(keccak256(abi.encodePacked(randomNumber, block.timestamp, block.prevrandao))) % categoryCount;
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

    function getGameTarget(uint256 gameId) public view returns (uint256) {
        return targets[gameId];
    }

    function getCategorie(uint256 index) public view returns (string memory) {
        return categories[index];
    }

    function getGameTargetCategorie(uint256 gameId) public view returns (string memory) {
        return getCategorie(targets[gameId]);
    }

    function setCategories(string[] memory _categories) public isOwner {
        uint256 i = 0;
        for (i; i < _categories.length; i++) {
            categories[i] = _categories[i];
        }
        categoryCount = i;
    }
}
