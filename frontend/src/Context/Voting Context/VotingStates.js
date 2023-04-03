import Context from "./VotingContext";
import { useState } from "react";
import { ethers } from 'ethers';
import ABI from '../../Contract/Voting.json';

const VotingStates = (props) => {

    const [voting, setVoting] = useState({
        provider: null,
        signer: null,
        contract: null
    })
    const [account, setAccount] = useState(null)

    const connectWallet = async () => {
        const contractAddress = "0xd9Bdd719eeA3B5FE5306fC0467cC0547D007B811";
        const contractABI = ABI.abi;

        try {

            const { ethereum } = window;

            if (ethereum) {
                const account = await ethereum.request({ method: "eth_requestAccounts", });
                setAccount(account);
            }

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            console.log(contract);
            setVoting({ provider, signer, contract });

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Context.Provider value={{voting, setVoting, account, setAccount, connectWallet}}>
            {props.children}
        </Context.Provider>
    )

}

export default VotingStates;