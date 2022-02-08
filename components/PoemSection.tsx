import * as React from 'react';
import useIsDesktop from '../h/useIsDesktop';
import Image from "next/image";

interface PoemSectionProps {
  poem: any;
}

const PoemSection: React.FC<PoemSectionProps> = ({poem}) => {
    const isDesktop = useIsDesktop();

    // 8.5 22- for desktop
    // 6.4, 9, 19.5- worked well
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
          return 6.4;
        }
        if(poemSize === 10) {
          return 9;
        }
        else {
          return 19.5 - poemSize;
        }
      }
    }

    return (
      <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
        <div>
          <div style={{fontSize: 12, marginBottom: 24}}>
            SONN3T #1124
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