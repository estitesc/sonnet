import * as React from 'react';
import loadWeb3 from '../utils/loadWeb3';
import NaiveSonnetPub from '../abis/NaiveSonnetPub.json';

const useCreatePoem = () => {
  // web3 state
  const [account, setAccount] = React.useState(undefined);
  const [sonnetCon, setSonnetCon] = React.useState(undefined);

  React.useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId()
    const networkData = NaiveSonnetPub.networks[networkId]
    if(networkData) {
      const sonnet = new web3.eth.Contract(NaiveSonnetPub.abi, networkData.address);
      setSonnetCon(sonnet);
    } else {
      window.alert('Sonnet contract not deployed to this network. Make sure you are using Polygon Mainnet.')
    }
  }

  const addPoem = React.useCallback(async (name, content, setErrorMsg, onSuccess) => {
    console.log("adding poem like", name, content);
    let gasPrice = 50000000000;
    const web3 = window.web3
    await web3.eth.getGasPrice().then((price) => gasPrice = price);
    const gasPlusBoost = Math.floor(gasPrice * 1.15);

    sonnetCon?.methods.addPoem(name, content).send({ from: account, gasPrice: gasPlusBoost })
    .on('confirmation', (confNumber, receipt) => {
      console.log("confirmed poem added", confNumber, receipt);
      onSuccess();
    })
    .on('error', (error) => {
      setErrorMsg("There was a problem saving this poem.");
      console.log("error adding poem", error);
    })
  }, [account, sonnetCon?.methods]);

  return {
      account,
      addPoem,
  }
}

export default useCreatePoem;
