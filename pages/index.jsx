import { useRouter } from 'next/router';
import * as React from 'react';
import useUserData from '../h/useUserData';
import Navbar from '../components/NavbarNew';
import InfoSection from '../components/InfoSection';
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
      <Navbar account={account} />
      <InfoSection poet={poet} />
    </div>
  )
}

export default Home
