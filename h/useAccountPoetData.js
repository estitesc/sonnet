import * as React from 'react';
import loadWeb3 from '../utils/loadWeb3';
import NaiveSonnetPub from '../abis/NaiveSonnetPub.json';

const useAccountPoetData = (setAccount, setPoet) => {
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
      // Load the poet associated with the account
      let foundPoetId = null;
      for (var i = 0; i < poetCount; i++) {
        const poet = await sonnet?.methods.poets(i).call();
        if(poet.wallet == accounts[0]) {
          setPoet(poet);
          foundPoetId=poet.id;
          break;
        }
      }
    } else {
      window.alert('Sonnet contract not deployed to this network. Make sure you are using Polygon Mainnet.')
    }
  }, [setAccount, setPoet]);

  React.useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, [loadBlockchainData]);
}

export default useAccountPoetData;
