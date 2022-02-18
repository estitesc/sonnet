import * as React from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/NavbarNew';
import PoemSection from '../../components/PoemSection';
import AnimatedPoemSection from '../../components/AnimatedPoemSection';
import styles from '../../styles/Home.module.css';
import useTargetPoemData from '../../h/useTargetPoemData';
import convertPoem from '../../utils/convertPoem';

const Poem = ({props}) => {
  console.log("props are", props);

  const router = useRouter();
  const { poemId } = router.query;

  const [ account, setAccount ] = React.useState('');
  const [ poem, setPoem ] = React.useState(null);
  const [ poet, setPoet ] = React.useState(null);

  useTargetPoemData(poemId, setAccount, setPoem, setPoet);

  const convertedPoem = poem ? convertPoem(poem) : null;

  return (
    <div className={styles.container}>
      <Navbar account={account} />
      {
          (convertedPoem && poet) &&
          <PoemSection poem={convertedPoem} poet={poet}/>
      }
      {/* <AnimatedPoemSection /> */}
    </div>
  )
}

export default Poem;
