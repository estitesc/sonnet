import * as React from 'react';

const AboutSection: React.FC = () => {

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'center'}}>
            <div style={{maxWidth: 340}}>
                <p>About <b>&lt;SONN3T&gt;</b></p>
                <p>36 char max lines</p>
                <p>new sonnet every 14 lines</p>
                <p>poets can mint a (X/14) NFT of sonnets they contributed to.</p>
                <p></p>
                <p>by <a href="https://twitter.com/dreamh4cker">@dreamh4cker</a></p>
            </div>
        </div>
    );
}

export default AboutSection;