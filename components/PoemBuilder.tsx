import * as React from 'react';
import useIsDesktop from '../h/useIsDesktop';
import PublishButton from './PublishButton';

const POEM_LINES = 14;
const MAX_CHARS = 28;

interface PoemBuilderProps {
  onPublish: (lines: string[]) => void;
}

const PoemBuilder: React.FC<PoemBuilderProps> = ({onPublish}) => {
    const isDesktop = useIsDesktop();

    const [lines, setLines] = React.useState([""]);
    const [editingLine, setEditingLine] = React.useState(0);

    const newLineOrDown = React.useCallback(() => {
      if (lines.length < POEM_LINES || editingLine < lines.length - 1) {
        if(editingLine === lines.length - 1) {
          setLines([...lines, ""]);
        }
        setEditingLine(editingLine + 1);
      }
    }, [editingLine, lines]);

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
        newVal = currVal.substring(0, currVal.length - 1);
      }

      if(currVal.length <= MAX_CHARS) {
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
    }, [lines, editingLine, newLineOrDown]);

    React.useEffect(() => {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    // const onPublish = React.useCallback(() => {

    // }, []);

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
          marginLeft: isDesktop ? 72 : 0,
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
        <div style={{fontSize: 10, marginTop: 24}}>
              Add up to 14 lines &lt;28 chars
            </div>
            {
              (lines.length > 1 || lines[0].length > 0) &&
              <div>
                <PublishButton onPublish={() => onPublish(lines)} />
              </div>
            }
        </div>
        
      </div>
    );
}

export default PoemBuilder;