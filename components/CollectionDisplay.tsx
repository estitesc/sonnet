import * as React from 'react';
import PoemRow from './PoemRow';
import _ from 'lodash';
import PoemPlaceholder from './PoemPlaceholder';
import convertPoem from '../utils/convertPoem';

interface CollectionDisplayProps {
  poems: any;
}

const CollectionDisplay: React.FC<CollectionDisplayProps> = ({poems}) => {
  const poemObjects = _.reverse(poems.map((poem: any) => convertPoem(poem)));

  const chunks = _.chunk(poemObjects, 3);

    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div 
          id="content" 
          style={{
            width: '100%',
            maxWidth: 506,
          }}>
            {
              poems.length > 0 ?
              chunks.map((chunk, index) => (
                <PoemRow poems={chunk} key={index} />
              ))
              :
              <PoemPlaceholder />
            }
        </div>  
      </div>
    );
}

export default CollectionDisplay;