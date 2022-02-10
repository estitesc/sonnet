import { useRouter } from 'next/router';
import * as React from 'react';
import useUserData from '../h/useUserData';
import Navbar from '../components/NavbarNew';
import styles from '../styles/Home.module.css';

const Home = ({props}) => {
  console.log("props are", props);
  const { alias } = useUserData();

  const router = useRouter();

  // This redirection gives inconsistent results. Race condition?
  React.useEffect(() => {
    if(alias.length) {
      router.push('/collection');
    } else {
      router.push('/welcome')
    }
  }, [alias.length, router]);

  return (
    <div className={styles.container}>
      <Navbar account={"0xWallet…"} />
    </div>
  )
}

export default Home
