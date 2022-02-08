import * as React from 'react';
import useIsDesktop from '../h/useIsDesktop';
import BlockButton from './BlockButton';
import PoemSizeButton from './PoemSizeButton';

interface WriteSetupProps {
  onSubmit: () => void;
  poemLength: number;
  setPoemLength: (length: number) => void;
}

const WriteSetup: React.FC<WriteSetupProps> = ({onSubmit, poemLength, setPoemLength}) => {
    const isDesktop = useIsDesktop();

    const maxLength = poemLength;
    const maxChars = poemLength * 2;

    return (
      <div 
        id="content" 
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection:'column', 
          width: '100%'
        }}>
        <div style={{
          minWidth: 365,
          marginLeft: isDesktop ? 72 : 12,
        }}>
          <div>
            <div>choose a sonnet size</div>
            <div style={{display:'flex'}}>
              <PoemSizeButton size={10} width={28} onClick={() => setPoemLength(10)} isSelected={poemLength === 10} />
              <PoemSizeButton size={12} width={32} onClick={() => setPoemLength(12)} isSelected={poemLength === 12}/>
              <PoemSizeButton size={14} width={36} onClick={() => setPoemLength(14)} isSelected={poemLength === 14}/>
            </div>
          </div>
          <div style={{marginTop: 24}}>
              poem will fit up to {maxLength} lines &lt;{maxChars} chars
            </div>
            <BlockButton label='Start Writing' onClick={onSubmit} />
        </div>
        
      </div>
    );
}

export default WriteSetup;