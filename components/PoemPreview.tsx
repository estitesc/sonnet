import Link from 'next/link';
import * as React from 'react';
import useIsDesktop from '../h/useIsDesktop';

interface PoemPreviewProps {
  poem: any;
}

const PoemPreview: React.FC<PoemPreviewProps> = ({poem}) => {
    const isDesktop = useIsDesktop();
    const [mouseOver, setMouseOver] = React.useState(false);

    const getFontSize = (poemSize: number) => {
      if(isDesktop) {
        return 12;
      } else {
        return 11;
      }
    }

    return (
      <Link href={`/poem/${poem.index}`}>
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
              <div key={key} style={{whiteSpace: 'pre'}}>{line || "  "}</div>
            )
          })}
      </div>
      </Link>
    );
}

export default PoemPreview;