import { useRouter } from 'next/router';
import * as React from 'react';
import Navbar from '../components/NavbarNew';
import PicSetup from '../components/PicSetup';
import UserSetup from '../components/UserSetup';
import styles from '../styles/Home.module.css';
import loadWeb3 from '../utils/loadWeb3';
import NaiveSonnetPub from '../abis/NaiveSonnetPub.json';
import usePoetsData from '../h/usePoetsData';

const Welcome = ({props}) => {
  console.log("props are", props);
  const [ alias, setAlias ] = React.useState("");
  const [ pfpUrl, setPfpUrl ] = React.useState("http://sonn3t.com/pfps/pfp_0.png");

  const [ step, setStep ] = React.useState(0);
  const [ errorMsg, setErrorMsg ] = React.useState("");
  
  // web3 state
  // const [account, setAccount] = React.useState(undefined);
  // const [sonnetCon, setSonnetCon] = React.useState(undefined);
  // const [poets, setPoets] = React.useState([]);
  // const [loading, setLoading] = React.useState(true);

  const { account, poets, addPoet } = usePoetsData();

  // React.useEffect(() => {
  //   loadWeb3();
  //   loadBlockchainData();
  // }, []);

  // const loadBlockchainData = async () => {
  //   const web3 = window.web3
  //   // Load account
  //   const accounts = await web3.eth.getAccounts()
  //   setAccount(accounts[0]);
  //   const networkId = await web3.eth.net.getId()
  //   const networkData = NaiveSonnetPub.networks[networkId]
  //   if(networkData) {
  //     const sonnet = new web3.eth.Contract(NaiveSonnetPub.abi, networkData.address);
  //     setSonnetCon(sonnet);
  //     const poetCount = await sonnet?.methods.poetCount().call();
  //     // Load lines
  //     const loadedPoets = [];
  //     for (var i = 0; i < poetCount; i++) {
  //       const poet = await sonnet?.methods.poets(i).call();
  //       loadedPoets.push(poet);
  //     }
  //     setPoets(loadedPoets);
  //     setLoading(false);
  //   } else {
  //     window.alert('Naive Sonnet contract not deployed to detected network.')
  //   }
  // }

  // const addPoet = React.useCallback(() => {
  //   // setLoading(true);
  //   console.log(alias, pfpUrl, account);
  //   sonnetCon?.methods.addPoet(alias, pfpUrl).send({ from: account })
  //   .on('confirmation', (confNumber, receipt) => {
  //     console.log("confirmed poet added", confNumber, receipt);
  //     loadBlockchainData();
  //   })
  //   .on('error', (error) => {
  //     setErrorMsg("There was a problem setting up the account.");
  //     console.log("error adding poet", error);
  //     // setLoading(false);
  //   })
  // }, [sonnetCon?.methods, alias, pfpUrl, account]);

  const onSubmitAlias = React.useCallback(() => {
    const poetAliases = poets.map((poet) => {
      return poet.name;
    });

    if(!poetAliases.includes(alias)) {
      setErrorMsg("");
      setStep(1);
    } else {
      setErrorMsg("Someone is already using that name.");
    }
  }, [alias, poets]);

  const router = useRouter();
  const onSubmitPic = React.useCallback(() => {
    addPoet(alias, pfpUrl, setErrorMsg);
    // router.push('/collection');
  }, [addPoet, alias, pfpUrl]);

  return (
    <div className={styles.container}>
      <Navbar account={account} />
      {
        step === 0 ?
        <UserSetup alias={alias} setAlias={setAlias} onSubmit={onSubmitAlias} errorMsg={errorMsg} />
        :
        <PicSetup pfpUrl={pfpUrl} setPfpUrl={setPfpUrl} onSubmit={onSubmitPic} errorMsg={errorMsg} />
      }
    </div>
  )
}

export default Welcome
