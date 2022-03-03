import * as React from 'react';
import useIsDesktop from '../h/useIsDesktop';
import BlockButton from './BlockButton';
import Image from 'next/image';
import { create, Options } from 'ipfs-http-client';

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

    const [ loadingPic, setLoadingPic ] = React.useState(false);

    const infuraUrl = 'https://ipfs.infura.io:5001/api/v0' as Options;
    const client = create(infuraUrl);

    const onSelectPic = React.useCallback((picIndex: number) => {
      setPfpUrl(`http://sonn3t.com/pfps/pfp_${picIndex}.png`);
    }, [setPfpUrl]);

    const onUpload = React.useCallback(async (e) => {
      setLoadingPic(true);
      const file = e.target.files[0]
      try {
        const added = await client.add(file)
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        setPfpUrl(url);
        setLoadingPic(false);
      } catch (error) {
        console.log('Error uploading file: ', error);
        setLoadingPic(false);
      }
    }, [client, setPfpUrl]);

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
            <div style={{marginTop: 24, marginBottom: 12}}>or, upload your own</div>
            <div>
              <input
                type="file"
                onChange={onUpload}
              />
            </div>
            {
              loadingPic ?
              <div style={{marginTop: 32, width: 240, height: 240, borderRadius: 120, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                uploading...
              </div>
              :
              <div style={{marginTop: 32, width: 240, height: 240, borderRadius: 120, overflow: 'hidden', position: 'relative'}}>
                <Image src={pfpUrl} height={240} width={240} layout='fill' objectFit='cover'/>
              </div>
            }
          </div>
          <div style={{marginTop: 24}}>
            {
              loading ?
              <BlockButton label='Loading...' onClick={() => {}} />
              :
              <BlockButton label='Confirm' onClick={onSubmit} />
            }
          </div>
        </div>
      </div>
    );
}

export default PicSetup;