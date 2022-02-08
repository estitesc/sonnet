import * as React from 'react';
import Image from "next/image";
import useIsDesktop from '../h/useIsDesktop';
import SmallButton from './SmallButton';
import Link from 'next/link';
import useUserData from '../h/useUserData';

interface PoetHeaderProps {
  poemCount: number;
}

const PoetHeader: React.FC<PoetHeaderProps> = ({poemCount}) => {
    const isDesktop = useIsDesktop();
    const { getUserAlias, getPfpIndex } = useUserData();
    const [pfpIndex, setPfpIndex] = React.useState(0);
    const [alias, setAlias] = React.useState("");

    React.useEffect(() => {
      const pfpIndex = getPfpIndex() || 0;
      const alias = getUserAlias() || "";
      setPfpIndex(pfpIndex);
      setAlias(alias);
    }, [getPfpIndex, getUserAlias]);

    const countString = React.useCallback(() => {
      if(poemCount > 1) {
        return `${poemCount} poems`;
      }
      if(poemCount === 1) {
        return 'a poem';
      }
      if(poemCount === 0) {
        return isDesktop ? 'a space of poetic potential' : 'a poetic space';
      }
    }, [isDesktop, poemCount]);

    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24}}>
        <div 
          id="content" 
          style={{
            display: 'flex',
            flexDirection:'row',
            overflow: 'hidden',
            width: 520,
            padding: 12,
          }}>
            <div style={{flex: 1}}>
            <div style={{height: 144, width: 144, overflow: 'hidden', borderRadius: 80}}>
              <Image src={`/pfps/pfp_${pfpIndex}.png`} height={144} width={144} />
            </div>
            </div>
            <div style={{
              display: 'flex',
              flex: 2,
              padding: 12,
              flexDirection: 'column',
              }}>
              <div style={{margin: '20px 0'}}>
                {countString()}
              </div>
              <div>
                by
              </div>
              <div>
                {alias}
              </div>
              <div style={{display: 'flex', marginTop: 8}}>
                <Link href="/write">
                  <SmallButton onClick={() => {}} label="add a poem" />
                </Link>
              </div>
              {/* <div>
                12.26.21 - 1.30.22
              </div> */}
            </div>
        </div>
      </div>
    );
}

export default PoetHeader;