import { useRouter } from 'next/router';
import * as React from 'react';
import Navbar from '../components/NavbarNew';
import PicSetup from '../components/PicSetup';
import UserSetup from '../components/UserSetup';
import styles from '../styles/Home.module.css';
import usePoetsData from '../h/usePoetsData';

const Welcome = ({props}) => {
  console.log("props are", props);
  const [ alias, setAlias ] = React.useState("");
  const [ pfpUrl, setPfpUrl ] = React.useState("http://sonn3t.com/pfps/pfp_0.png");

  const [ step, setStep ] = React.useState(0);
  const [ errorMsg, setErrorMsg ] = React.useState("");

  const { account, poets, addPoet } = usePoetsData();

  const onSubmitAlias = React.useCallback(() => {
    const poetAliases = poets.map((poet) => {
      return poet.name;
    });

    if(!poetAliases.includes(alias)) {
      setErrorMsg("");
      setStep(1);
    } else {
      setErrorMsg("Someone is already using that name.");
    }
  }, [alias, poets]);

  const router = useRouter();
  const onSubmitPic = React.useCallback(() => {
    addPoet(alias, pfpUrl, setErrorMsg, () => {router.push(`/poet/${alias}`)});
  }, [addPoet, alias, pfpUrl, router]);

  return (
    <div className={styles.container}>
      <Navbar account={account} />
      {
        step === 0 ?
        <UserSetup alias={alias} setAlias={setAlias} onSubmit={onSubmitAlias} errorMsg={errorMsg} />
        :
        <PicSetup pfpUrl={pfpUrl} setPfpUrl={setPfpUrl} onSubmit={onSubmitPic} errorMsg={errorMsg} />
      }
    </div>
  )
}

export default Welcome
