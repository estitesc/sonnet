import * as React from 'react';
import PoemRow from './PoemRow';
import _ from 'lodash';

interface CollectionDisplayProps {
  poems: any;
}

const CollectionDisplay: React.FC<CollectionDisplayProps> = ({poems}) => {
  const chunks = _.chunk(poems, 3);

    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div 
          id="content" 
          style={{
            width: '100%',
            maxWidth: 520,
          }}>
            {
              chunks.map((chunk, index) => (
                <PoemRow poems={chunk} key={index} />
              ))
            }
        </div>  
      </div>
    );
}

export default CollectionDisplay;