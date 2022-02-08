import Link from 'next/link';
import * as React from 'react';
import useIsDesktop from '../h/useIsDesktop';

const PoemPlaceholder: React.FC = () => {
    const isDesktop = useIsDesktop();
    const [mouseOver, setMouseOver] = React.useState(false);

    return (
      <Link href={`/write`}>
      <div 
        id="content" 
        style={{
          flex: 1,
          display: 'flex',
          flexDirection:'column',
          margin: isDesktop ? '0px 12px 24px 12px' : '6px',
          fontSize: 14,
          lineHeight: '125%',
          width: isDesktop ? 144 : 106,
          height: isDesktop ? 144 : 106,
          border: 'solid 1px #FDFCFC',
          overflow: 'hidden',
          cursor: 'pointer',
          backgroundColor: mouseOver ? '#E7DFDA' : '#0B0705',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={() => setMouseOver(true)}
        onMouseLeave={() => setMouseOver(false)}>
          <div style={{textAlign: 'center'}}>
            add your first poem
          </div>
      </div>
      </Link>
    );
}

export default PoemPlaceholder;