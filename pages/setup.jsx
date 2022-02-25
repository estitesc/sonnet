import * as React from 'react';
import Navbar from '../components/NavbarNew';
import SetupSection from '../components/SetupSection';
import styles from '../styles/Home.module.css';
import useAccountPoetData from '../h/useAccountPoetData';

const Setup = ({props}) => {
  console.log("props are", props);

  const [account, setAccount] = React.useState("");

  useAccountPoetData(setAccount, () => {});

  return (
    <div className={styles.container}>
      <Navbar account={account} />
      <SetupSection account={account} />
    </div>
  )
}

export default Setup
