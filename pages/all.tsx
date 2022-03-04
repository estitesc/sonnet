import * as React from 'react';
import CollectionDisplay from '../components/CollectionDisplay';
import Spinner from '../components/Spinner';
import Navbar from '../components/NavbarNew';
import styles from '../styles/Home.module.css';
import _ from 'lodash';
import useBrowserAccount from '../h/useBrowserAccount';
import useAllPoemsEthers from '../h/useAllPoemsEthers';

interface AllPageProps {
    props: any;
}

const AllPage: React.FC<AllPageProps> = ({props}) => {
  console.log("props are", props);

  const [account, setAccount] = React.useState("");
  const [poems, setPoems] = React.useState([]);

  useBrowserAccount(setAccount);
  useAllPoemsEthers(setPoems);

  return (
    <div className={styles.container}>
      <Navbar account={account} />
      {
        poems.length === 0 ?
        <Spinner />
        :
        <CollectionDisplay poems={poems} isOwner={false} />
      }
    </div>
  )
}

export default AllPage;
