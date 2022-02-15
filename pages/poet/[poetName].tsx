import * as React from 'react';
import { useRouter } from 'next/router';
import CollectionDisplay from '../../components/CollectionDisplay';
import Navbar from '../../components/NavbarNew';
import PoetHeader from '../../components/PoetHeader';
import useTargetPoetData from '../../h/useTargetPoetData';
import styles from '../../styles/Home.module.css';

interface PoetPageProps {
    props: any;
}

const PoetPage: React.FC<PoetPageProps> = ({props}) => {
  console.log("props are", props);
  const router = useRouter();
  const { poetName } = router.query;

  const [account, setAccount] = React.useState("");
  const [poet, setPoet] = React.useState(null);
  const [poems, setPoems] = React.useState([]);

  useTargetPoetData(poetName, setAccount, setPoet, setPoems);

  // console.log("this stuff",{ account, poet, poems }  );

  return (
    <div className={styles.container}>
      <Navbar account={account} />
      {
        poet ?
        <>
          <PoetHeader poemCount={poems.length} poet={poet} account={account} />
          <CollectionDisplay poems={poems}/>
        </>
        :
        <div style={{textAlign: 'center', marginTop: 24}}>
          No poet by that name...
        </div>
      }
      
    </div>
  )
}

export default PoetPage;
