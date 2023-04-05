import Context from "./VotingContext";
import { useState } from "react";
import { ethers } from 'ethers';
import ABI from '../../Contract/Voting.json';

const VotingStates = (props) => {

    const contractAddress = "";
    const contractABI = ABI.abi;
    const [voting, setVoting] = useState({
        provider: null,
        signer: null,
        contract: null
    })
    const [account, setAccount] = useState(null);
    const [allElections, setAllElections] = useState(null)

    const connectWallet = async () => {

        try {

            const { ethereum } = window;

            if (ethereum) {
                const account = await ethereum.request({ method: "eth_requestAccounts", });
                setAccount(account);
            }

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            setVoting({ provider, signer, contract });

        } catch (error) {
            console.log(error);
        }
    }

    const fetchETHElections = async () => {

        let allElections = await voting.contract.getElections();
        let allCandidates = [];

        allElections.forEach((election)=>{
            let candidates = election.votesPerCandidate.map((value)=>{
                return ethers.utils.formatEther(value.toString())
            })
            allCandidates.push(candidates);
        })
        
        let parsedElections = allElections.map((election, index) => ({
            title: election.title,
            description: election.description,
            votesCollected: ethers.utils.formatEther(election.votesCollected.toString()),
            votesPerCandidate: allCandidates[index],
        }))

        setAllElections(parsedElections);
    }

    return (
        <Context.Provider value={{ voting, setVoting, account, setAccount, allElections, setAllElections, connectWallet, fetchETHElections }}>
            {props.children}
        </Context.Provider>
    )

}

export default VotingStates;