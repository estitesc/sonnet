import * as React from 'react';
import useIsDesktop from '../h/useIsDesktop';
import PoemRow from './PoemRow';

interface CollectionDisplayProps {
  poems: any;
}

const CollectionDisplay: React.FC<CollectionDisplayProps> = ({poems}) => {
  const isDesktop = useIsDesktop();

  const poemsForRow = [poems[0], poems[1], poems[2]];
  const poemsForRow2 = [poems[3], poems[4], poems[5]];

    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div 
          id="content" 
          style={{
            width: '100%',
            maxWidth: 520,
          }}>
            <PoemRow poems={poemsForRow} />
            <PoemRow poems={poemsForRow2} />
            <PoemRow poems={poemsForRow} />
            <PoemRow poems={poemsForRow2} />
            <PoemRow poems={poemsForRow} />
            <PoemRow poems={poemsForRow} />
            {/* { poems.map((poem: any, key: string) => {
              return(
                <PoemDisplay poem={poem} key={key}/>
              )
            })} */}
        </div>  
      </div>
    );
}

export default CollectionDisplay;