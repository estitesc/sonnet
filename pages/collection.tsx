import * as React from 'react';
import CollectionDisplay from '../components/CollectionDisplay';
import Navbar from '../components/NavbarNew';
import PoetHeader from '../components/PoetHeader';
import styles from '../styles/Home.module.css';

interface CollectionProps {
    props: any;
}

const Collection: React.FC<CollectionProps> = ({props}) => {
  console.log("props are", props);

  const poemLines10 = [
    "sunny floof day out",
    "nothing wrong with it",
    "nothing right",
    "we lay down paint and",
    "call poems old words",
    "they still sit rotten",
    "losing paint chips",
    "by the day",
    "these           words",
    "this... clay",
  ];

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

  const poemLines14 = [
    "lost in a creepy conversation",
    "not knowing who I am      now",
    "they speak of influencers and",
    "nft marketing, while   others",
    "here sip kava and craft  love",
    "a girl hums happy, nonchalant",
    "lost in a creepy conversation",
    "not knowing who I am      now",
    "they speak of influencers and",
    "nft marketing, while   others",
    "here sip kava and craft  love",
    "a girl hums happy, nonchalant",
    "here sip kava and craft  love",
    "a girl hums happy, nonchalant",
  ];

  const poem10 = {
      size: 10,
      lines: poemLines10,
  }

  const poem12 = {
    size: 12,
    lines: poemLines12,
    }

    const poem14 = {
        size: 14,
        lines: poemLines14,
    }

  const poems = [poem12, poem12, poem14, poem10, poem12, poem10, poem10, poem14, poem12, poem12, poem12];

  return (
    <div className={styles.container}>
      <Navbar account={"0x5ome1…"} poemCount={1} poemId={1} />
      <PoetHeader poetName='marca.voleo' />
      <CollectionDisplay poems={poems}/>
    </div>
  )
}

export default Collection
