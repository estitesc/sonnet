import * as React from 'react';
import loadWeb3 from '../utils/loadWeb3';
import NaiveSonnetPub from '../abis/NaiveSonnetPub.json';

const useSinglePoetData = () => {
  // web3 state
  const [account, setAccount] = React.useState("");
  const [poet, setPoet] = React.useState([]);
  const [poems, setPoems] = React.useState([]);

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
  }

  return {
      account,
      poet,
      poems,
  }
}

export default useSinglePoetData;
