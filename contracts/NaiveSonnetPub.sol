// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NaiveSonnetPub {
    string public name;
    uint public poetCount = 0;
    uint public poemCount = 0;
    mapping(uint => Poet) public poets;
    mapping(uint => Poem) public poems;

    struct Poet {
        uint id;
        uint createdAt;
        string name;
        string pfpUrl;
        address payable wallet;
    }

    struct Poem {
        uint id;
        uint createdAt;
        uint poetId;
        string name;
        string content;
    }

    event PoetAdded(
        uint id,
        uint createdAt,
        string name,
        string pfpUrl,
        address payable wallet
    );

    event PoemAdded(
        uint id,
        uint createdAt,
        uint poetId,
        string name,
        string content
    );

    constructor() {
        name = "Naive Sonnet Publisher";
    }

    function addPoet(string memory _name, string memory _pfpUrl) public {
        // Require name to exist and be shorter than or equal 18 chars
        require(bytes(_name).length > 0);
        require(bytes(_name).length <= 18);

        // Require name be unique #naive O(n)
        bool uniqueName = true;
        for (uint256 i = 0; i < poetCount; i ++) {
            if(hashCompareWithLengthCheck(_name, poets[i].name)) {
                uniqueName = false;
            }
        }
        require(uniqueName, "That name is already in use.");

        poets[poetCount] = Poet(poetCount, block.timestamp, _name, _pfpUrl, payable(msg.sender));
        poetCount++;
        
        emit PoetAdded(poetCount, block.timestamp, _name, _pfpUrl, payable(msg.sender));
    }

    function addPoem(string memory _name, string memory _content) public {
        // Require content to exist and be less than 1024 byte length
        require(bytes(_content).length > 0);
        require(bytes(_content).length < 1024);

        // Require there to be a poet for the wallet address
        uint poetId = 0;
        bool poetFound = false;
        for (uint256 i = 0; i < poetCount; i ++) {
            if(msg.sender == poets[i].wallet) {
                poetFound = true;
                poetId = i;
            }
        }
        require(poetFound, "No poet exists for this wallet. Setup as a poet before creating a poem.");
        
        poems[poemCount] = Poem(poemCount, block.timestamp, poetId, _name, _content);
        poemCount++;

        emit PoemAdded(poemCount, block.timestamp, poetId, _name, _content);
    }

    function hashCompareWithLengthCheck(string memory a, string memory b) internal pure returns (bool) {
        if(bytes(a).length != bytes(b).length) {
            return false;
        } else {
            return keccak256(bytes(a)) == keccak256(bytes(b));
        }
    }
}