import Link from 'next/link';
import * as React from 'react';
import BlockButton from './BlockButton';

interface InfoSectionProps {
    poet: any;
}

const SonnetWhySection: React.FC<InfoSectionProps> = ({poet}) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'center'}}>
            <div style={{maxWidth: 340}}>
                <p style={{fontWeight: 'bold'}}>sonnet/work</p>
                <div>a new platform for poets to</div>
                <div>publish work on the blockchain.</div>

                <div style={{marginTop: 24, marginBottom: 24}}>join our public alpha so you can:</div>
                <div style={{marginBottom: 6}}><b>CREATE</b> an insta-like collection of on-chain poetry</div>
                <div style={{marginBottom: 6}}><b>GET</b> 3 free MATIC just for participating</div>
                <div style={{marginBottom: 6}}><b>EARN</b> future governance allocation for poems you submit</div>
                {/* <div style={{marginTop: 24, marginBottom: 12}}>&lt;attn&gt;<i>NOT YOUR GMA's SONNET</i>&lt;/attn&gt;</div> */}
                <div style={{marginTop: 24, marginBottom: 12}}><i>NOT YOUR GRANNY&apos;S SONNET</i></div>
                <div style={{marginBottom: 24}}>your canvas is a 12 line by 24 char monospace square. rhyme, prose, concrete, haiku... whatever fits in those 288 chars is at home here.</div>
                {
                    poet ?
                    <Link href={`/poet/${poet.name}`}>
                        <BlockButton label='Go to Profile' onClick={() => {}} />
                    </Link>
                    :
                    <Link href={`/setup`}>
                        <BlockButton label='Get Started' onClick={() => {}} />
                    </Link>
                }
            </div>
        </div>
    );
}

export default SonnetWhySection;