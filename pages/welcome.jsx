import { useRouter } from 'next/router';
import * as React from 'react';
import Navbar from '../components/NavbarNew';
import PicSetup from '../components/PicSetup';
import UserSetup from '../components/UserSetup';
import styles from '../styles/Home.module.css';

const Welcome = ({props}) => {
  console.log("props are", props);
  const [ step, setStep ] = React.useState(0);

  const onSubmitAlias = React.useCallback(() => {
    setStep(1);
  }, []);

  const router = useRouter();
  const onSubmitPic = React.useCallback(() => {
    setStep(1);
    router.push('/collection');
  }, [router]);

  return (
    <div className={styles.container}>
      <Navbar account={"0xWallet…"} />
      {
        step === 0 ?
        <UserSetup onSubmit={onSubmitAlias} />
        :
        <PicSetup onSubmit={onSubmitPic} />
      }
    </div>
  )
}

export default Welcome
