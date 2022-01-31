import * as React from 'react';
import ConsoleInput from './ConsoleInput';
import BasicInput from './BasicInput';
import useIsDesktop from '../h/useIsDesktop';

interface PoemDisplayProps {
  lines: any;
  addLine: (content: string) => void;
  isLatest: boolean;
}

const PoemDisplay: React.FC<PoemDisplayProps> = ({lines, addLine, isLatest}) => {
    const isDesktop = useIsDesktop();

    const [content, setContent] = React.useState("");

    const submitLine = React.useCallback(() => {
      addLine(content);
    },[addLine, content]);

    const renderEditSection = () => {
      if(!isLatest) {
        const lastLine = lines[lines.length - 1];
        return (
          lastLine ?
          <div style={{fontSize: 10, marginTop: 24}}>
            {new Date(lastLine.addedAt * 1000).toDateString()}
          </div>
          :
          null
        )
      }
      if(isDesktop) {
        return (
          <>
            <ConsoleInput onChange={(value)=>{setContent(value)}} onSubmit={submitLine} />
            <div style={{fontSize: 10, marginTop: 24}}>
              Press "Enter" to submit line
            </div>
          </>
        );
      }
      return (
          <div style={{display: 'flex', flexDirection: 'column', marginTop: 12}}>
            <BasicInput onChange={(value)=>{setContent(value)}} />
            <button 
              onClick={submitLine} 
              style={{
                marginTop: 12, 
                backgroundColor: '#7A401F', 
                borderWidth: 0, 
                borderRadius: 4,
                color: '#F9F7F5',
                fontWeight: 'bold',
                padding: '6px 0',
                }}
              >
                Submit Line
              </button>
          </div>
      )
    }

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
          { lines.map((line: any, key: string) => {
            return(
              <div key={key}>{line.content}</div>
            )
          })}
        </div>
        {
          renderEditSection()
        }
        </div>
      </div>
    );
}

export default PoemDisplay;