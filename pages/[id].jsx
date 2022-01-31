import * as React from 'react';
import { useRouter } from 'next/router'
import Main from '../components/Main';

const Home = ({props}) => {
  console.log("props are", props);

  const router = useRouter()
  const { id } = router.query

  return (
    <Main pathId={id}/>
  )
}

export default Home;
