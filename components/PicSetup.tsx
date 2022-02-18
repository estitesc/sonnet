import * as React from 'react';
import useIsDesktop from '../h/useIsDesktop';
import BlockButton from './BlockButton';
import Image from 'next/image';

interface PicSetupProps {
  pfpUrl: string;
  setPfpUrl: (url: string) => {};
  onSubmit: () => void;
  errorMsg: string;
  loading: boolean;
}

const PicSetup: React.FC<PicSetupProps> = ({pfpUrl, setPfpUrl, onSubmit, errorMsg, loading}) => {
    const isDesktop = useIsDesktop();

    const pics = new Array(6).fill(null);

    const onSelectPic = React.useCallback((picIndex: number) => {
      setPfpUrl(`http://sonn3t.com/pfps/pfp_${picIndex}.png`);
    }, [setPfpUrl]);

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
            {
              errorMsg &&
              <div style={{fontStyle: 'italic', paddingBottom: 24}}>{errorMsg}</div>
            }
            <div>choose a profile pic</div>
            <div style={{display:'flex', maxWidth: 400}}>
              {
                pics.map((_pic:any, index: number) => {
                  return (
                    <div
                      key={index}
                      style={{width: 64, height: 64, cursor: 'pointer'}}
                      onClick={() => onSelectPic(index)}
                    >
                      <Image src={`/pfps/pfp_${index}.png`} height={64} width={64} />
                    </div>
                  );
                })
              }
            </div>
            <div style={{marginTop: 32, width: 240, height: 240, borderRadius: 120, overflow: 'hidden'}}>
              <Image src={pfpUrl} height={240} width={240}/>
            </div>
            <div style={{marginTop: 24, fontSize: 12}}>
              the ability to upload is coming soon :)
            </div>
          </div>
          <div style={{marginTop: 24}}>
            </div>
            {
              loading ?
              <BlockButton label='Loading...' onClick={() => {}} />
              :
              <BlockButton label='Confirm' onClick={onSubmit} />
            }
        </div>
      </div>
    );
}

export default PicSetup;