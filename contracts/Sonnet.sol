// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Sonnet {
    string public name;
    uint public lineCount = 0;
    mapping(uint => Line) public lines;

    struct Line {
        uint id;
        string content;
        address payable poet;
        uint addedAt;
    }

    event LineAdded(
        uint id,
        string content,
        address payable poet,
        uint addedAt
    );

    constructor() {
        name = "Sonnet Dapp";
    }

    function addLine(string memory _content) public {
        // Require a valid name
        require(bytes(_content).length > 0);
        // Increment product count
        lineCount ++;
        // Create the product
        lines[lineCount] = Line(lineCount, _content, payable(msg.sender), block.timestamp);
        // Trigger an event
        emit LineAdded(lineCount, _content, payable(msg.sender), block.timestamp);
    }
}