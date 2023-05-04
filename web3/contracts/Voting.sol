// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

contract Voting {

    struct Election {
        address owner;
        string title;
        string description;
        uint256 votesCollected;
        uint256 votesCollectedInETH;
        uint256[] votesPerCandidate;
        uint256[] votesInETH;
    }

    constructor() {
        owner = msg.sender;
    }

    mapping(uint256 => Election) public elections;

    address public owner;
    
    uint256 public numberOfElections = 0;

    function createElection(address _owner, string memory _title, string memory _description, uint256 _noOfCandidates) public returns (uint256) {

        Election storage election = elections[numberOfElections];

        election.owner = _owner;
        election.title = _title;
        election.description = _description;
        election.votesCollected = 0;
        election.votesCollectedInETH = 0;

        for(uint256 i = 0; i < _noOfCandidates; i++) {
            election.votesPerCandidate.push(0);
        }

        numberOfElections++;

        return numberOfElections - 1;
    }

    function voteToElection(uint256 _electionID, uint _candidateID) public payable {

        uint256 votes = msg.value;

        Election storage election = elections[_electionID];

        election.votesPerCandidate[_candidateID] = election.votesPerCandidate[_candidateID] + 1;
        election.votesCollected = election.votesCollected + 1;
        election.votesInETH.push(votes);

        (bool sent,) = payable(election.owner).call{value: votes}("");

        if(sent) {
            election.votesCollectedInETH = election.votesCollectedInETH + votes;
        }

    }

    function getElections() public view returns (Election[] memory) {

        Election[] memory allElections = new Election[](numberOfElections);

        for(uint i = 0; i < numberOfElections; i++) {
            Election storage item = elections[i];

            allElections[i] = item;
        }

        return allElections;
        
    }

    function destroy() public {
        require(msg.sender == owner, "msg.sender is not the owner");
        selfdestruct(payable(owner));
    }

}