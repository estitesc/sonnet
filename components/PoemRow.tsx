import * as React from 'react';
import PoemPreview from './PoemPreview';

interface PoemRowProps {
  poems: any;
}

const PoemRow: React.FC<PoemRowProps> = ({poems}) => {
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
      </div>
    );
}

export default PoemRow;