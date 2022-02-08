import { useRouter } from 'next/router';
import * as React from 'react';
import Main from '../components/Main';
import useUserData from '../h/useUserData';

const Home = ({props}) => {
  console.log("props are", props);
  const { getUserAlias, getPfpIndex } = useUserData();
  const [pfpIndex, setPfpIndex] = React.useState(0);
  const [alias, setAlias] = React.useState("");

  React.useEffect(() => {
    const pfpIndex = getPfpIndex() || 0;
    const alias = getUserAlias() || "";
    setPfpIndex(pfpIndex);
    setAlias(alias);
  }, [getPfpIndex, getUserAlias]);

  const router = useRouter();

  React.useEffect(() => {
    if(alias.length) {
      router.push('/collection');
    } else {
      router.push('/welcome')
    }
  }, [alias.length, router]);

  return (
    <Main pathId={null} />
  )
}

export default Home
