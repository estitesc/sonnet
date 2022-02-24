import Link from 'next/link';
import * as React from 'react';
import BlockButton from './BlockButton';

interface InfoSectionProps {
    poet: any;
}

const InfoSection: React.FC<InfoSectionProps> = ({poet}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'center'}}>
            <div style={{maxWidth: 340}}>
                <p style={{fontWeight: 'bold'}}>sonnet/work</p>
                <div>a new platform</div>
                <div>for square poets</div>
                {
                    poet ?
                    <Link href={`/poet/${poet.name}`}>
                        <BlockButton label='Go to Profile' onClick={() => {}} />
                    </Link>
                    :
                    <Link href={`/welcome`}>
                        <BlockButton label='Create Profile' onClick={() => {}} />
                    </Link>
                }
                <p>&nbsp;</p>
                <p>sonnet/work beta works with Polygon. For info on how to set up Metamask with Polygon, <Link href="https://medium.com/stakingbits/setting-up-metamask-for-polygon-matic-network-838058f6d844"><a>click here</a></Link>. To request MATIC to get started, tweet your wallet address:</p>
                
                <p><a href="https://twitter.com/dreamh4cker">@dreamh4cker</a></p>
            </div>
        </div>
    );
}

export default InfoSection;