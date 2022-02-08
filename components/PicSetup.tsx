import * as React from 'react';
import useIsDesktop from '../h/useIsDesktop';
import BlockButton from './BlockButton';
import Image from 'next/image';

interface PicSetupProps {
  onSubmit: () => void;
}

const PicSetup: React.FC<PicSetupProps> = ({onSubmit}) => {
    const [ pfpIndex, setPfpIndex ] = React.useState(0);
    const isDesktop = useIsDesktop();

    const pics = new Array(6).fill(null);

    const onSubmitPic= React.useCallback(() => {
      localStorage.setItem('pfpIndex', pfpIndex.toString());
      onSubmit();
    }, [pfpIndex, onSubmit]);

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
          marginLeft: isDesktop ? 72 : 0,
        }}>
          <div>
            <div>choose a profile pic</div>
            <div style={{display:'flex', maxWidth: 400}}>
              {
                pics.map((_pic:any, index: number) => {
                  return (
                    <div
                      key={index}
                      style={{width: 64, height: 64, cursor: 'pointer'}}
                      onClick={() => setPfpIndex(index)}
                    >
                      <Image src={`/pfps/pfp_${index}.png`} height={64} width={64} />
                    </div>
                  );
                })
              }
            </div>
            <div style={{marginTop: 32, width: 240, height: 240, borderRadius: 120, overflow: 'hidden'}}>
              <Image src={`/pfps/pfp_${pfpIndex}.png`} height={240} width={240}/>
            </div>
            <div style={{marginTop: 24, fontSize: 12}}>
              the ability to upload is coming soon :)
            </div>
          </div>
          <div style={{marginTop: 24}}>
            </div>
            <BlockButton label='Confirm' onClick={onSubmitPic} />
        </div>
        
      </div>
    );
}

export default PicSetup;