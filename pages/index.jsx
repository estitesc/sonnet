import { useRouter } from 'next/router';
import * as React from 'react';
import useUserData from '../h/useUserData';
import Navbar from '../components/NavbarNew';
import InfoSection from '../components/InfoSection';
import styles from '../styles/Home.module.css';
import useAccountPoetData from '../h/useAccountPoetData';

const Home = ({props}) => {
  console.log("props are", props);
  // const { alias } = useUserData();

  // const router = useRouter();

    // web3 state
  const [account, setAccount] = React.useState("");
  const [poet, setPoet] = React.useState(null);

  useAccountPoetData(setAccount, setPoet);

  // This redirection gives inconsistent results. Race condition?
  // React.useEffect(() => {
  //   if(alias.length) {
  //     router.push('/collection');
  //   } else {
  //     router.push('/welcome')
  //   }
  // }, [alias.length, router]);

  return (
    <div className={styles.container}>
      <Navbar account={account} />
      <InfoSection poet={poet} />
    </div>
  )
}

export default Home
