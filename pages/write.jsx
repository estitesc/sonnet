import * as React from 'react';
import Navbar from '../components/NavbarNew';
import PoemBuilder from '../components/PoemBuilder';
import styles from '../styles/Home.module.css';
import useCreatePoem from '../h/useCreatePoem';

const Write = ({props}) => {
  console.log("props are", props);
  const { account, addPoem } = useCreatePoem();

  return (
    <div className={styles.container}>
      <Navbar account={account} />
      <PoemBuilder poemLength={12} addPoem={addPoem} />
    </div>
  )
}

export default Write
