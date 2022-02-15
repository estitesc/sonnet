import * as React from 'react';
import CollectionDisplay from '../components/CollectionDisplay';
import Navbar from '../components/NavbarNew';
import PoetHeader from '../components/PoetHeader';
import useSinglePoetData from '../h/useSinglePoetData';
import styles from '../styles/Home.module.css';

interface CollectionProps {
    props: any;
}

const Collection: React.FC<CollectionProps> = ({props}) => {
  console.log("props are", props);

  const { account, poet, poems } = useSinglePoetData();

  return (
    <div className={styles.container}>
      <Navbar account={account} />
      <PoetHeader poemCount={poems.length} poet={poet} />
      <CollectionDisplay poems={poems}/>
    </div>
  )
}

export default Collection
