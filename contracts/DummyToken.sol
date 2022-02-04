// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract DummyToken is ERC721, ReentrancyGuard, Ownable {
    string[][] private words = [
        ["ONE_a", "ONE_b", "ONE_c", "ONE_d"],
        ["TWO_a", "TWO_b", "TWO_c", "TWO_d"],
        ["THREE_a", "THREE_b", "THREE_c", "THREE_d"],
        ["FOUR_a", "FOUR_b", "FOUR_c", "FOUR_d"]
    ];

    mapping(uint => Poem) public poems;

    struct Poem {
        uint id;
        string[] lines;
        address payable poet;
        // Figure out how to track the owner separately from tracking the poet
        uint addedAt;
    }

    uint256 PUBLIC_SUPPLY = 9500;
    uint256 OWNER_SUPPLY = 500;
    uint256 publicMintCount = 0;
    uint256 ownerMintCount = 0;

    function tokenURI(uint256 tokenId) override public view returns (string memory) {
        string memory svg = '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350"><style>.base { fill: black; font-family: serif; font-size: 12px; }</style><rect x = "10" width="100%" height="100%" fill="white" />';
        uint256 x = 10;
        for (uint256 i = 0; i < words.length; i ++) {
            uint256 seed = uint256(keccak256(abi.encodePacked(i, tokenId)));
            string memory word = words[i][seed % words[i].length];
            svg = string(abi.encodePacked(svg, '<text x="', uint_to_str(x), '" y="10" class="base">', word, '</text>'));
            x += 10 * bytes(word).length;
        }
        return string(abi.encodePacked(svg, '</svg>'));
    }

    function mint(string[] calldata _content) public nonReentrant {
        // Figure out how to limit minting depending on the senders individual limit
        require(publicMintCount < PUBLIC_SUPPLY, 'All declarations have been minted');
        // Validate content to make sure it follows the format of "Sonnet" (28 char max split by |)
        bool validPoem = true;
        if(_content.length > 14) {
            validPoem = false;
        }
        require(validPoem, 'Poem has too many lines');

        bool validLines = true;
        for (uint256 i = 0; i < _content.length; i ++) {
            if(bytes(_content[i]).length > 28) {
                validLines = false;
            }
        }
        require(validLines, 'One or more lines of the poem are too long');

        _safeMint(_msgSender(), publicMintCount);
        poems[publicMintCount] = Poem(publicMintCount, _content, payable(msg.sender), block.timestamp);
        publicMintCount += 1;
    }

    function ownerMint() public nonReentrant {
        require(ownerMintCount < OWNER_SUPPLY, "All declarations have been minted");
        _safeMint(_msgSender(), PUBLIC_SUPPLY + ownerMintCount);
        ownerMintCount += 1;
    }

    function uint_to_str(uint256 _i)
        internal
        pure
        returns (string memory _uintAsString)
    {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    constructor() ERC721("DummyToken", "DCLR") Ownable() {}
}