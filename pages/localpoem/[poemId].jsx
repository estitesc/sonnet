import * as React from 'react';
import { useRouter } from 'next/router';
import Navbar from '../../components/NavbarNew';
import PoemSection from '../../components/PoemSectionLocal';
import styles from '../../styles/Home.module.css';
import usePoemData from '../../h/usePoemData';

const Poem = ({props}) => {
  console.log("props are", props);

  const router = useRouter();
  const { poemId } = router.query;

  const poemLines12 = [
    "sunny chillshine in a bar",
    "nodding off - window seat",
    "putting together words of",
    "things we wanted to lose",
    "the holy sin shine of mew",
    "the undiscoverable dread",
    "that swell picadilly hall",
    "sunny chillshine in a bar",
    "children new muse easy",
    "so there was still some",
    "sunny chillshine in a bar",
    "and yet we faltered.",
  ];

  const poem12 = {
    size: 12,
    lines: poemLines12,
    }

  const { getPoemData } = usePoemData();

  const [ poems, setPoems ] = React.useState([]);

  React.useEffect(() => {
    const poems = getPoemData();
    setPoems(poems);
  }, [getPoemData]);

  const poem = poems[poemId] || poem12;

  return (
    <div className={styles.container}>
      <Navbar account={"0x5ome1…"} poemCount={1} poemId={1} />
      <PoemSection poem={poem}/>
    </div>
  )
}

export default Poem;
