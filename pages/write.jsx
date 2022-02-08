import * as React from 'react';
import Navbar from '../components/NavbarNew';
import PoemBuilder from '../components/PoemBuilder';
import WriteSetup from '../components/WriteSetup';
import styles from '../styles/Home.module.css';

const Write = ({props}) => {
  console.log("props are", props);
  const [ step, setStep ] = React.useState(0);
  const [ poemLength, setPoemLength ] = React.useState(14);

  return (
    <div className={styles.container}>
      <Navbar account={"0xWallet…"} />
      {
        step === 0 ?
        <WriteSetup onSubmit={() => {setStep(1)}} setPoemLength={setPoemLength} poemLength={poemLength}/>
        :
        <PoemBuilder poemLength={poemLength} />
      }
    </div>
  )
}

export default Write
