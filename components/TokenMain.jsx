import * as React from 'react';
import styles from '../styles/Home.module.css';
import Web3 from 'web3';
import DummyToken from '../abis/DummyToken.json';
import Navbar from './Navbar';
import PoemBuilder from './PoemBuilder';

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

const TokenMain = ({pathId}) => {
  const [account, setAccount] = React.useState(undefined);
  const [contract, setContract] = React.useState(undefined);
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
    const networkData = DummyToken.networks[networkId]
    if(networkData) {
      const con = new web3.eth.Contract(DummyToken.abi, networkData.address);
      setContract(con);
      // const lineCount = await con?.methods.lineCount().call()
      // // Load lines
      // const loadedLines = [];
      // for (var i = 1; i <= lineCount; i++) {
      //   const line = await con?.methods.lines(i).call();
      //   loadedLines.push(line);
      // }
      // setLines(loadedLines);
      setLoading(false);
    } else {
      window.alert('Dummy Token contract not deployed to detected network.')
    }
  }

  const mintToken = React.useCallback((lines) => {
    setLoading(true);
    contract?.methods.mint(lines).send({ from: account })
    .on('confirmation', (confNumber, receipt) => {
      console.log("confirmed token minted", confNumber, receipt);
      loadBlockchainData();
    })
    .on('error', (error) => {
      console.log("error minting", error);
      setLoading(false);
    })
  }, [contract, account]);

  const poemCount = Math.ceil((lines.length + 1) / LINES_PER_POEM);
  const poemId = pathId && pathId < poemCount ? pathId : poemCount - 1;

  const isLatest = lines.length < (LINES_PER_POEM * poemId) + LINES_PER_POEM;
  const activeLineCount = isLatest ? lines.length % LINES_PER_POEM : LINES_PER_POEM;
  const startLineId = poemId * LINES_PER_POEM;
  const endLineId = startLineId + activeLineCount;
  const activeLines = lines.slice(startLineId, endLineId);

  return (
    <div className={styles.container}>
      <Navbar account={account} poemCount={poemCount} poemId={pathId == 'about' ? undefined : poemId} />
      {/* <div style={{paddingTop: 96}}><PoemDisplay lines={activeLines} addLine={addLine} isLatest={isLatest} /></div> */}
      <div style={{paddingTop: 96}}><PoemBuilder onPublish={mintToken}/></div>
    </div>
  )
}

export default TokenMain
