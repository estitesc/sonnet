import * as React from 'react';
import useIsDesktop from '../h/useIsDesktop';

interface PoemPreviewProps {
  poem: any;
}

const PoemPreview: React.FC<PoemPreviewProps> = ({poem}) => {
    const isDesktop = useIsDesktop();
    // console.log("poem is", poem);
    const [mouseOver, setMouseOver] = React.useState(false);

    // 8.5 22- for desktop
    // 6.4, 9, 19.5- worked well
    const getFontSize = (poemSize: number) => {
      if(isDesktop) {
        return 12;
        if(poemSize === 14) {
          return 8.5;
        }
        else {
          return 22 - poemSize;
        }
      } else {
        return 11;
        if(poemSize === 14) {
          return 6.4;
        }
        if(poemSize === 10) {
          return 9;
        }
        else {
          return 19.5 - poemSize;
        }
      }
    }

    const onMouseOver = () => {
      console.log("pigsmy");
    }

    return (
      <div 
        id="content" 
        style={{
          flex: 1,
          display: 'flex',
          flexDirection:'column',
          margin: isDesktop ? '0px 12px 24px 12px' : '6px',
          fontSize: getFontSize(poem.size),
          lineHeight: '125%',
          width: isDesktop ? 144 : 106,
          height: isDesktop ? 144 : 106,
          border: 'solid 1px #FDFCFC',
          overflow: 'hidden',
          cursor: 'pointer',
          backgroundColor: mouseOver ? '#E7DFDA' : '#0B0705'
        }}
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}>
          { poem.lines.map((line: any, key: string) => {
            return(
              <div key={key} style={{whiteSpace: 'pre'}}>{line}</div>
            )
          })}
      </div>
    );
}

export default PoemPreview;