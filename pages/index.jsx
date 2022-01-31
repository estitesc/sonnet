import * as React from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3 from 'web3'
import Sonnet from '../abis/Sonnet.json';
import Navbar from '../components/Navbar';
import PoemDisplay from '../components/PoemDisplay';

export const LINES_PER_POEM = 14;

const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  }
  else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
}

const Home = () => {
  const [account, setAccount] = React.useState(undefined);
  const [sonnet, setSonnet] = React.useState(undefined);
  const [lines, setLines] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

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
    const networkData = Sonnet.networks[networkId]
    if(networkData) {
      const sonnet = new web3.eth.Contract(Sonnet.abi, networkData.address);
      setSonnet(sonnet);
      const lineCount = await sonnet.methods.lineCount().call()
      // Load lines
      const loadedLines = [];
      for (var i = 1; i <= lineCount; i++) {
        const line = await sonnet.methods.lines(i).call();
        loadedLines.push(line);
      }
      console.log("loaded lines", lines);
      setLines(loadedLines);
      setLoading(false);
    } else {
      window.alert('Poem contract not deployed to detected network.')
    }
  }

  const addLine = React.useCallback((content) => {
    setLoading(true);
    sonnet.methods.addLine(content).send({ from: account })
    .on('confirmation', (confNumber, receipt) => {
      console.log("confirmed line added", confNumber, receipt);
      loadBlockchainData();
    })
    .on('error', (error) => {
      console.log("error adding line", error);
      setLoading(false);
    })
  }, [sonnet, setLoading]);

  const pathId = 0;
  const poemCount = Math.ceil((lines.length + 1) / LINES_PER_POEM);
  const poemId = pathId < poemCount ? pathId : poemCount - 1;

  const isLatest = lines.length < (LINES_PER_POEM * poemId) + LINES_PER_POEM;
  const activeLineCount = isLatest ? lines.length % LINES_PER_POEM : LINES_PER_POEM;
  const startLineId = poemId * LINES_PER_POEM;
  const endLineId = startLineId + activeLineCount;
  const activeLines = lines.slice(startLineId, endLineId);

  return (
    <div className={styles.container}>
      <Navbar account={account} poemCount={poemCount} poemId={poemId} />
      <div style={{paddingTop: 96}}>
        { loading
          ? <div id="loader" className="text-center"><p className="text-center">Writing...</p></div>
          : <PoemDisplay lines={activeLines} addLine={addLine} isLatest={isLatest} />
        }
      </div>
    </div>
  )
}

export default Home
