import * as React from 'react';
import loadWeb3 from '../utils/loadWeb3';
import NaiveSonnetPub from '../abis/NaiveSonnetPub.json';

const usePoetsData = () => {
  // web3 state
  const [account, setAccount] = React.useState(undefined);
  const [sonnetCon, setSonnetCon] = React.useState(undefined);
  const [poets, setPoets] = React.useState([]);

  React.useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const loadBlockchainData = async () => {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId()
    const networkData = NaiveSonnetPub.networks[networkId]
    if(networkData) {
      const sonnet = new web3.eth.Contract(NaiveSonnetPub.abi, networkData.address);
      setSonnetCon(sonnet);
      const poetCount = await sonnet?.methods.poetCount().call();
      // Load lines
      const loadedPoets = [];
      for (var i = 0; i < poetCount; i++) {
        const poet = await sonnet?.methods.poets(i).call();
        loadedPoets.push(poet);
      }
      setPoets(loadedPoets);
    } else {
      window.alert('Naive Sonnet contract not deployed to detected network.')
    }
  }

  const addPoet = React.useCallback((alias, pfpUrl, setErrorMsg) => {
    sonnetCon?.methods.addPoet(alias, pfpUrl).send({ from: account })
    .on('confirmation', (confNumber, receipt) => {
      console.log("confirmed poet added", confNumber, receipt);
      loadBlockchainData();
    })
    .on('error', (error) => {
      setErrorMsg("There was a problem setting up the account.");
      console.log("error adding poet", error);
    })
  }, [account, sonnetCon?.methods]);

  return {
      account,
      poets,
      addPoet,
  }
}

export default usePoetsData;