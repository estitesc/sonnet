import * as React from 'react';
import { useRouter } from 'next/router';
import CollectionDisplay from '../../components/CollectionDisplay';
import Navbar from '../../components/NavbarNew';
import PoetHeader from '../../components/PoetHeader';
import useTargetPoetEthers from '../../h/useTargetPoetEthers';
import styles from '../../styles/Home.module.css';
import _ from 'lodash';
import useBrowserAccount from '../../h/useBrowserAccount';

interface PoetPageProps {
    props: any;
}

const PoetPage: React.FC<PoetPageProps> = ({props}) => {
  console.log("props are", props);
  const router = useRouter();
  const { poetName } = router.query;

  const [account, setAccount] = React.useState("");
  const [poet, setPoet] = React.useState({wallet: null});
  const [poems, setPoems] = React.useState([]);

  useBrowserAccount(setAccount);
  useTargetPoetEthers(_.join(poetName, ''), setPoet, setPoems);

  return (
    <div className={styles.container}>
      <Navbar account={account} showWallet/>
      {
        poet.wallet ?
        <>
          <PoetHeader poemCount={poems.length} poet={poet} account={account} />
          <CollectionDisplay poems={poems} isOwner={poet && account === poet.wallet} />
        </>
        :
        <div style={{textAlign: 'center', marginTop: 24}}>
          A poet by any other name...
        </div>
      }
      
    </div>
  )
}

export default PoetPage;
