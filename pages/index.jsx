import * as React from 'react';
import Navbar from '../components/NavbarNew';
import SonnetWhySection from '../components/SonnetWhySection';
import styles from '../styles/Home.module.css';
import useAccountPoetData from '../h/useAccountPoetData';

const Home = ({props}) => {
  console.log("props are", props);

  // web3 state
  const [account, setAccount] = React.useState("");
  const [poet, setPoet] = React.useState(null);

  useAccountPoetData(setAccount, setPoet);

  return (
    <div className={styles.container}>
      <Navbar account={account} poet={poet} />
      <SonnetWhySection poet={poet} />
    </div>
  )
}

export default Home
