import * as React from 'react';
import Image from "next/image";
import useIsDesktop from '../h/useIsDesktop';
import SmallButton from './SmallButton';
import Link from 'next/link';

interface PoetHeaderProps {
  poemCount: number;
  poet: any;
  account: string;
}

const PoetHeader: React.FC<PoetHeaderProps> = ({poemCount, poet, account}) => {
    const isDesktop = useIsDesktop();

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
            <div style={{height: 144, width: 144, overflow: 'hidden', borderRadius: 80, position: 'relative'}}>
              {
                poet.pfpUrl &&
                <Image src={poet.pfpUrl} height={144} width={144} layout='fill' objectFit='cover'/>
              }
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
                {poet.name}
              </div>
              {
                account === poet.wallet &&
                <div style={{display: 'flex', marginTop: 8}}>
                  <Link href="/write">
                    <SmallButton onClick={() => {}} label="add a poem" />
                  </Link>
                </div>
              }
            </div>
        </div>
      </div>
    );
}

export default PoetHeader;