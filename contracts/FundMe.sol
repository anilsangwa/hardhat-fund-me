// SPDX-License-Identifier: UNLICENSED
// Pragma
pragma solidity ^0.8.17;

// Imports
// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "./PriceConverter.sol";

// Error Codes
error FundMe__NotOwner();

// Interfaces, Libraries, Contracts

/// @title A contract for crowd funding
/// @author Anil Sangwa
/// @notice This contract is to demo a sample funding contract
/// @dev This implements price feed as our library
contract FundMe {
    // Type Declaration
    using PriceConverter for uint256;

    // State Variables
    // Constant Variables
    uint256 public constant MINIMUM_USD = 50 * 1e18;
    // Storage Variables
    address[] private s_funders; // changes from public to private a created fn at bottom
    mapping(address => uint256) private s_addressTOAmountFunded; // changes from public to private a created fn at bottom
    AggregatorV3Interface public s_priceFeed; // changes from public to private a created fn at bottom
    // Immutable Variable
    address private immutable i_owner; // changes from public to private a created fn at bottom

    // Modifiers
    modifier onlyOwner() {
        if (msg.sender != i_owner) {
            revert FundMe__NotOwner();
        }
        _;
    }

    // Functions Order:
    //// constructor
    //// receive
    //// fallback
    //// external
    //// public
    //// internal
    //// private
    //// view/pure

    constructor(address priceFeedAddress) {
        i_owner = msg.sender;
        s_priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    // Not required for now but good to have
    receive() external payable {
        fund();
    }

    // Not required for now but good to have
    fallback() external payable {
        fund();
    }

    /// @notice This function Funds this contract
    /// @dev This implements price feed as our library
    function fund() public payable {
        require(
            msg.value.getConversionRate(s_priceFeed) >= MINIMUM_USD,
            "You need to spend more ETH!"
        );
        s_addressTOAmountFunded[msg.sender] = msg.value;
        s_funders.push(msg.sender);
    }

    function withdraw() public onlyOwner {
        for (
            uint256 funderIndex = 0;
            funderIndex < s_funders.length;
            funderIndex++
        ) {
            address funder = s_funders[funderIndex];
            s_addressTOAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        (bool callSuccess, ) = payable(msg.sender).call{
            value: address(this).balance
        }("");
        require(callSuccess, "call failed!");
    }

    function cheaperWithdraw() public onlyOwner {
        address[] memory funders = s_funders;
        // mapping is not allowed in mermory so we use for loop
        for (uint256 funderIndex; funderIndex < funders.length; funderIndex++) {
            address funder = funders[funderIndex];
            s_addressTOAmountFunded[funder] = 0;
        }
        s_funders = new address[](0);
        (bool success, ) = i_owner.call{value: address(this).balance}("");
        require(success, "call failed!");
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getFunder(uint256 index) public view returns (address) {
        return s_funders[index];
    }

    function getAddressTOAmountFunded(
        address funder
    ) public view returns (uint256) {
        return s_addressTOAmountFunded[funder];
    }

    function getPriceFeed() public view returns (AggregatorV3Interface) {
        return s_priceFeed;
    }
}
