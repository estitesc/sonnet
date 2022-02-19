import * as React from 'react';
import Navbar from '../components/NavbarNew';
import PoemBuilder from '../components/PoemBuilder';
import styles from '../styles/Home.module.css';
import useCreatePoem from '../h/useCreatePoem';
import useAccountPoetData from '../h/useAccountPoetData';

const Write = ({props}) => {
  console.log("props are", props);
  const { addPoem } = useCreatePoem();

  const [poet, setPoet] = React.useState(null);
  const [account, setAccount] = React.useState("");
  useAccountPoetData(setAccount, setPoet);

  return (
    <div className={styles.container}>
      <Navbar account={account} />
      <PoemBuilder poemLength={12} addPoem={addPoem} poet={poet} />
    </div>
  )
}

export default Write
