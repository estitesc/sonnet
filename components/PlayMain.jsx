import * as React from 'react';
import styles from '../styles/Home.module.css';
import Navbar from './Navbar';
import PoemDisplay from './PoemDisplay';
import PoemBuilder from './PoemBuilder';

export const LINES_PER_POEM = 20;

const Main = ({pathId}) => {
  const account = "funzzy";
  const [lines, setLines] = React.useState([]);

  const addLine = React.useCallback((content) => {
    const newLines = [...lines, {content, addedAt: new Date().getTime()}];
    setLines(newLines);
  }, [lines]);

  const poemCount = Math.ceil((lines.length + 1) / LINES_PER_POEM);
  const poemId = pathId && pathId < poemCount ? pathId : poemCount - 1;

  const isLatest = lines.length < (LINES_PER_POEM * poemId) + LINES_PER_POEM;
  const activeLineCount = isLatest ? lines.length % LINES_PER_POEM : LINES_PER_POEM;
  const startLineId = poemId * LINES_PER_POEM;
  const endLineId = startLineId + activeLineCount;
  const activeLines = lines.slice(startLineId, endLineId);

  return (
    <div className={styles.container}>
      <Navbar account={account} poemCount={poemCount} poemId={pathId == 'about' ? undefined : poemId} />
      {/* <div style={{paddingTop: 96}}><PoemDisplay lines={activeLines} addLine={addLine} isLatest={isLatest} /></div> */}
      <div style={{paddingTop: 96}}><PoemBuilder onPublish={(content) => {}}/></div>
    </div>
  )
}

export default Main
