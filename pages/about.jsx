import * as React from 'react';
import Navbar from '../components/NavbarNew';
import styles from '../styles/Home.module.css';
import AboutSection from '../components/AboutSection';

const About = ({props}) => {
  console.log("props are", props);

  return (
    <div className={styles.container}>
      <Navbar account={"0xWallet…"} poemCount={1} poemId={1} />
      <AboutSection />
    </div>
  )
}

export default About;
