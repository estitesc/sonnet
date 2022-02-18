import * as React from 'react';
import CollectionDisplay from '../components/CollectionDisplayLocal';
import Navbar from '../components/NavbarNew';
import PoetHeader from '../components/PoetHeaderLocal';
import usePoemData from '../h/usePoemData';
import styles from '../styles/Home.module.css';

interface CollectionProps {
    props: any;
}

const Collection: React.FC<CollectionProps> = ({props}) => {
  console.log("props are", props);

  const { getPoemData } = usePoemData();

  const [ poems, setPoems ] = React.useState([]);

  React.useEffect(() => {
    const poems = getPoemData();
    setPoems(poems);
  }, [getPoemData]);

  return (
    <div className={styles.container}>
      <Navbar account={"0xWallet…"} />
      <PoetHeader poemCount={poems.length} />
      <CollectionDisplay poems={poems} />
    </div>
  )
}

export default Collection