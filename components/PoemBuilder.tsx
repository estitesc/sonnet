import { useRouter } from 'next/router';
import * as React from 'react';
import useIsDesktop from '../h/useIsDesktop';
// import PublishButton from './PublishButton';
import usePoemData from '../h/usePoemData';
import BlockButton from './BlockButton';
import InputLine from './InputLine';
import SmallButton from './SmallButton';

interface PoemBuilderProps {
  onPublish: (lines: string[]) => void;
  poemLength: number;
}

const PoemBuilder: React.FC<PoemBuilderProps> = ({onPublish, poemLength}) => {
    const isDesktop = useIsDesktop();

    const [lines, setLines] = React.useState([""]);
    const [editingLine, setEditingLine] = React.useState(0);

    const maxLength = poemLength;
    const maxChars = poemLength * 2;

    const router = useRouter();

    const { addPoem } = usePoemData();
    const onSaveLocal = (lines: string[]) => {
      const newPoem = {
        size: poemLength,
        lines: lines,
      }

      addPoem(newPoem);
      router.push('/collection');
    }

    const newLineOrDown = React.useCallback(() => {
      if (lines.length < maxLength || editingLine < lines.length - 1) {
        if(editingLine === lines.length - 1) {
          setLines([...lines, ""]);
        }
        setEditingLine(editingLine + 1);
      }
    }, [editingLine, lines, maxLength]);

    const handleKeyPress = React.useCallback((e: any) => {
      if(e.code === 'Enter' || e.code === 'ArrowDown') {
          newLineOrDown();
          return;
      }

      if (e.code === 'ArrowUp') {
        if(editingLine > 0) {
          setEditingLine(editingLine - 1);
        }
        return;
      } 

      const currVal = lines[editingLine];
      let newVal = currVal;

      if(e.code === 'Backspace') {
        if(currVal.length === 0) {
          // Delete the entire current line (as it's down to nothing)
          let newLines = lines;
          newLines.splice(editingLine, 1);
          setLines([...newLines]);
          setEditingLine(editingLine - 1);
          return;
        } else {
          newVal = currVal.substring(0, currVal.length - 1);
        }
      }

      if(currVal.length <= maxChars) {
          if(e.key.length === 1) {
              newVal = `${currVal}${e.key}`;
          }
          
          if(e.code === 'Space') {
              newVal = `${currVal} `
          }
      }

      if(newVal !== currVal) {
          let newLines = lines;
          newLines.splice(editingLine, 1, newVal);
          setLines([...newLines]);
      }
    }, [lines, editingLine, maxChars, newLineOrDown]);

    React.useEffect(() => {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    return (
      <div 
        id="content" 
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection:'column', 
          width: '100%'
        }}>
        <div style={{
          minWidth: 365,
          marginLeft: isDesktop ? 72 : 12,
        }}>
        <div id="poem">
          { lines.map((line: string, index: number) => {
            return(
              index === editingLine ?
              <div key={index} style={{display: 'flex', height: 20}}>
                <span style={{whiteSpace: 'pre'}}>{line}</span>
                <div className='blinking' style={{ width: 10, height: 20, backgroundColor: '#FDFCFC'}} />
              </div>
              :
              <div key={index} style={{whiteSpace: 'pre'}}>{line || " "}</div>
            )
          })}
        </div>
        {
          !isDesktop &&
            <input id="hiddenInput" style={{marginTop: 24}} value={lines[editingLine]} />
        }
        <div style={{fontSize: 10, marginTop: 24}}>
              Add up to {maxLength} lines &lt;{maxChars} chars
            </div>
            {
              (lines.length > 1 || lines[0].length > 0) &&
              <div>
                <BlockButton label="Save Locally" onClick={() => onSaveLocal(lines)} />
                {/* <PublishButton onPublish={() => onPublish(lines)} /> */}
              </div>
            }
        </div>
        
      </div>
    );
}

export default PoemBuilder;