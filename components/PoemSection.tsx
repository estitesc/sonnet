import * as React from 'react';
import useIsDesktop from '../h/useIsDesktop';
// import Image from "next/image";
import Link from 'next/link';

interface PoemSectionProps {
  poem: any;
}

const PoemSection: React.FC<PoemSectionProps> = ({poem}) => {
    const isDesktop = useIsDesktop();

    const getFontSize = (poemSize: number) => {
      if(isDesktop) {
        if(poemSize === 14) {
          return 16;
        }
        else {
          return 30 - poemSize;
        }
      } else {
        if(poemSize === 14) {
          return 16;
        }
        if(poemSize === 10) {
          return 18;
        }
        else {
          return 28 - poemSize;
        }
      }
    }

    return (
      <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        
        <div style={{position: 'relative'}}>
          <Link href="/collection">
            <div style={{position: 'absolute', left: "-48px", top: 0, fontSize: 24, cursor: 'pointer'}}>
              ←
            </div>
          </Link>
          <div style={{fontSize: 12, marginBottom: 24}}>
            SONN3T #{poem.index}
          </div>
          <div 
            id="content" 
            style={{
              display: 'flex',
              flexDirection:'column',
              fontSize: getFontSize(poem.size),
              lineHeight: '125%',
            }}>
              { poem.lines.map((line: any, key: string) => {
                return(
                  <div key={key} style={{whiteSpace: 'pre'}}>{line || " "}</div>
                )
              })}
          </div>
          <div style={{fontSize: 12, marginTop: 24}}>
            09.23.22
          </div>
          {/* <div style={{display: 'flex', alignItems: 'center' , marginTop: 24}}>
            <div style={{height: 28, width: 28, overflow: 'hidden', borderRadius: 12, marginRight: 12}}>
              <Image src="/disclaimed_witch.png" height={28} width={28} />
            </div>
            <div>
            <div style={{fontSize: 12}}>
              marca.soli
            </div>
            <div style={{fontSize: 12, lineHeight: 1}}>
            09.23.22
          </div>

            </div>
            
            </div> */}
          
          <div style={{fontSize: 12, marginTop: 24}}>
            <b>poet</b> marca.soli
          </div>
          <div style={{fontSize: 12}}>
            <b>patron</b> charli0.eth
          </div>
          <div style={{display: 'flex', alignItems: 'baseline'}}>
          <div style={{fontSize: 12, marginTop: 4}}>
            <b>last</b> ⧫ 2.2
          </div>
          <div style={{display: 'inline-block', marginLeft: 12}}>
                <div style={{ 
                  color: '#0B0705', 
                  backgroundColor: '#FDFCFC', 
                  padding: 4,
                  borderRadius: 4,
                  fontSize: 10,
                  lineHeight: 1,
                  fontWeight: 'bold'
                  }}>make offer</div>
              </div>
          </div>
          
        </div>
      </div>
      
    );
}

export default PoemSection;