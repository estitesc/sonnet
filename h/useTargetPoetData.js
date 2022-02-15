import * as React from 'react';
import loadWeb3 from '../utils/loadWeb3';
import NaiveSonnetPub from '../abis/NaiveSonnetPub.json';

const useTargetPoetData = (poetName, setAccount, setPoet, setPoems) => {
  const loadBlockchainData = React.useCallback(async () => {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId()
    const networkData = NaiveSonnetPub.networks[networkId]
    if(networkData) {
      const sonnet = new web3.eth.Contract(NaiveSonnetPub.abi, networkData.address);
      const poetCount = await sonnet?.methods.poetCount().call();
      // Load the poet associated with the poet Name passed in
      let foundPoetId = null;
      for (var i = 0; i < poetCount; i++) {
        const poet = await sonnet?.methods.poets(i).call();
        if(poet.name == poetName) {
          setPoet(poet);
          foundPoetId=poet.id;
          break;
        }
      }
      // Find all poems associated with this poet
      if(foundPoetId) {
        const poemCount = await sonnet?.methods.poemCount().call();
        const loadedPoems = [];
        for (var i = 0; i < poemCount; i++) {
          const poem = await sonnet?.methods.poems(i).call();
          if(poem.poetId === foundPoetId) {
            loadedPoems.push(poem);
          }
        }
        setPoems(loadedPoems);
      }
    } else {
      window.alert('Naive Sonnet contract not deployed to detected network.')
    }
  }, [poetName, setAccount, setPoems, setPoet]);

  React.useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, [loadBlockchainData]);
}

export default useTargetPoetData;
