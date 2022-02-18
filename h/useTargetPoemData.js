import * as React from 'react';
import loadWeb3 from '../utils/loadWeb3';
import NaiveSonnetPub from '../abis/NaiveSonnetPub.json';

const useTargetPoemData = (poemId, setAccount, setPoem, setPoet) => {
  
  const loadBlockchainData = React.useCallback(async () => {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId()
    const networkData = NaiveSonnetPub.networks[networkId]
    if(networkData && poemId) {
      const sonnet = new web3.eth.Contract(NaiveSonnetPub.abi, networkData.address);

      const poem = await sonnet?.methods.poems(poemId).call();
      const poet = await sonnet?.methods.poets(poem.poetId).call();

      setPoem(poem);
      setPoet(poet);
    } else {
      window.alert('Naive Sonnet contract not deployed to detected network.')
    }
  }, [poemId, setAccount, setPoem, setPoet]);

  React.useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, [loadBlockchainData]);
}

export default useTargetPoemData;
