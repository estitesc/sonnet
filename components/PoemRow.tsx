import * as React from 'react';
import useIsDesktop from '../h/useIsDesktop';
import PoemPreview from './PoemPreview';

interface PoemRowProps {
  poems: any;
}

const PoemRow: React.FC<PoemRowProps> = ({poems}) => {
  const placeHolders = new Array(3 - poems.length).fill(null);
  const isDesktop = useIsDesktop();

    return (
      <div 
        id="content" 
        style={{
          display: 'flex',
        }}>
          { poems.map((poem: any, key: string) => {
            return(
              <PoemPreview poem={poem} key={key}/>
            )
          })}
          { placeHolders.map((placeholder: void, key: number) => {
            return(
              <div style={{
                flex: 1,
                width: isDesktop ? 144 : 106,
                margin: isDesktop ? '0px 12px 24px 12px' : '6px'
              }} key={key} />
            )
          })}
      </div>
    );
}

export default PoemRow;