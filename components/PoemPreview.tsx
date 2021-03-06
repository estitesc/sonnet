import Link from 'next/link';
import * as React from 'react';
import useIsDesktop from '../h/useIsDesktop';

interface PoemPreviewProps {
  poem: any;
  local?: boolean;
}

const PoemPreview: React.FC<PoemPreviewProps> = ({poem, local}) => {
    const isDesktop = useIsDesktop();
    const [mouseOver, setMouseOver] = React.useState(false);

    const getFontSize = (poemSize: number) => {
      if(isDesktop) {
        if(poemSize === 12) {
          return 9;
        }
        else {
          return 21 - poemSize;
        }
      } else {
        if(poemSize === 12) {
          return 6.6;
        }
        else {
          return 19 - poemSize;
        }
      }
    }

    return (
      <Link href={local ? `/poemLocal/${poem.index}` : `/poem/${poem.id}`}>
        <div style={{
          border: 'solid 1px #756961',
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          margin: isDesktop ? '0px 12px 24px 12px' : '6px',
          width: isDesktop ? 144 : 106,
          height: isDesktop ? 144 : 106,
          backgroundColor: mouseOver ? '#E7DFDA' : '#0B0705',
          cursor: 'pointer',
        }}>
      <div 
        id="content" 
        style={{
          fontSize: getFontSize(poem.size),
          lineHeight: '120%',
          overflow: 'hidden',
        }}
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}>
          { poem.lines.map((line: any, key: string) => {
            return(
              <div key={key} style={{whiteSpace: 'pre'}}>{line || "  "}</div>
            )
          })}
      </div>
      </div>
      </Link>
    );
}

export default PoemPreview;