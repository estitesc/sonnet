import * as React from 'react';
import Image from "next/image";
import useIsDesktop from '../h/useIsDesktop';

interface PoetHeaderProps {
  poetName: string;
}

const PoetHeader: React.FC<PoetHeaderProps> = ({poetName}) => {
    const isDesktop = useIsDesktop();
    // console.log("poem is", poem);

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
              <Image src="/disclaimed_witch.png" height={300} width={300} />
            </div>
            </div>
            <div style={{
              display: 'flex', 
              flex: 2, 
              padding: 12, 
              // alignItems: 'flex-end', 
              flexDirection: 'column',
              }}>
              <div style={{margin: '20px 0'}}>
                28 poems
              </div>
              <div>
                by
              </div>
              <div>
                {poetName}
              </div>
              <div style={{display: 'flex', marginTop: 8}}>
                <div style={{ 
                  color: '#0B0705', 
                  backgroundColor: '#FDFCFC', 
                  padding: 4, 
                  borderRadius: 4,
                  fontSize: 10,
                  lineHeight: 1,
                  fontWeight: 'bold'
                  }}>send tip</div>
                {/* <div>nudge</div> */}
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