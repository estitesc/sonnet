import _ from 'lodash';
import { useRouter } from 'next/router';
import * as React from 'react';
import useIsDesktop from '../h/useIsDesktop';
import BlockButton from './BlockButton';

interface PoemBuilderProps {
  poemLength: number;
  addPoem: (
    name: string,
    content: string,
    setErrorMsg: (msg: string) => void,
    onSuccess: () => void
  ) => void;
  poet: any;
}

const PoemBuilder: React.FC<PoemBuilderProps> = ({poemLength, addPoem, poet}) => {
    const isDesktop = useIsDesktop();

    const maxLength = poemLength;
    const maxChars = poemLength * 2;

    const [lines, setLines] = React.useState(new Array(maxLength).fill(""));
    const [editingLine, setEditingLine] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");

    const router = useRouter();

    const onSavePoem = (lines: string[]) => {
      setLoading(true);
      const name = "";
      const content = _.join(lines, '\n');

      const onError = (msg: string) => {
        setLoading(false);
        setErrorMsg(msg);
      }
      const onSuccess = () => {
        setLoading(false);
        router.push(`/poet/${poet.name}`);
      }

      addPoem(name, content, onError, onSuccess);
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
          if(editingLine === 0) {
            return;
          }
          setEditingLine(editingLine - 1);
          return;
        } else {
          newVal = currVal.substring(0, currVal.length - 1);
        }
      }

      if(currVal.length < maxChars) {
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
          
          // Go to next line if that's the last char
          if(
            newVal.length === maxChars && 
            editingLine < maxLength - 1 && 
            lines[editingLine + 1].length === 0
          ) {
            setEditingLine(editingLine + 1);
          }
      }
    }, [lines, editingLine, maxChars, newLineOrDown, maxLength]);

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
          width: 258,
          marginLeft: isDesktop ? 72 : 12,
        }}>
          {
            errorMsg &&
            <div style={{fontStyle: 'italic', paddingBottom: 24}}>{errorMsg}</div>
          }
        <div id="poem" style={{ border: 'solid 1px #333'}}>
          <div style={{padding: '12px 0px 12px 12px'}}>
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
        </div>
        {
          !isDesktop &&
            <input id="hiddenInput" style={{marginTop: 24, fontSize: 14, width: 254, height: 24}} value={lines[editingLine]} onChange={() => {}} />
        }
        <div style={{fontSize: 10, marginTop: 24}}>
              Add up to {maxLength} lines &lt;{maxChars} chars
            </div>
            {
              (lines.length > 1 || lines[0].length > 0) &&
              <div>
                {
                  loading ?
                  <BlockButton label="Saving..." onClick={() => {}} />
                  :
                  <BlockButton label="Save On Chain" onClick={() => onSavePoem(lines)} />
                }
              </div>
            }
        </div>
      </div>
    );
}

export default PoemBuilder;