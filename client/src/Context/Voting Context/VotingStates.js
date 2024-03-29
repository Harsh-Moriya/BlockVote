import Context from "./VotingContext";
import { useState } from "react";
import { ethers } from 'ethers';
import ABI from '../../Contract/Voting.json';

const VotingStates = (props) => {

    const contractAddress = "0x98446D36e13E81B3ceECD83cFe58D9A1A9Da4365";
    const contractABI = ABI.abi;
    const [voting, setVoting] = useState({
        provider: null,
        signer: null,
        contract: null
    })
    const [account, setAccount] = useState(null);
    const [ETHElections, setETHElections] = useState(null)

    const connectWallet = async () => {

        let success = false;
        let refused = false;
        try {

            const { ethereum } = window;

            if (ethereum) {
                const account = await ethereum.request({ method: "eth_requestAccounts", }).catch((err) => {
                    refused = true;
                })
                setAccount(account);
            } else {
                success = false;
                return success;
            }

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            setVoting({ provider, signer, contract });
            success = true;
            return { success, refused };

        } catch (error) {
            console.log(error);
        }
    }

    const fetchETHElections = async () => {

        setETHElections(null)
        let ETHElections = await voting.contract.getElections();
        let allCandidates = [];

        ETHElections.forEach((election) => {
            let candidates = election.votesPerCandidate.map((value) => {
                return (ethers.utils.formatEther(value.toString()) * Math.pow(10, 18))
            })
            allCandidates.push(candidates);
        })

        let parsedElections = ETHElections.map((election, index) => ({
            title: election.title,
            description: election.description,
            votesCollected: (ethers.utils.formatEther(election.votesCollected.toString()) * Math.pow(10, 18)),
            votesPerCandidate: allCandidates[index],
        }))

        setETHElections(parsedElections);
    }

    return (
        <Context.Provider value={{ voting, setVoting, account, setAccount, ETHElections, setETHElections, connectWallet, fetchETHElections }}>
            {props.children}
        </Context.Provider>
    )

}

export default VotingStates;