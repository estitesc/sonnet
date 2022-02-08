import * as React from 'react';
import PoemPreview from './PoemPreview';

interface PoemRowProps {
  poems: any;
}

const PoemRow: React.FC<PoemRowProps> = ({poems}) => {
  const placeHolders = new Array(3 - poems.length).fill(null);

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
              <div style={{flex: 1}} key={key} />
            )
          })}
      </div>
    );
}

export default PoemRow;