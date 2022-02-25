import Link from 'next/link';
import * as React from 'react';
import BlockButton from './BlockButton';
import SmallButton from './SmallButton';

declare global {
    interface Window {
        ethereum: any;
    }
}

interface SetupSectionProps {
    account: string;
}

const SetupSection: React.FC<SetupSectionProps> = ({account}) => {
    const [ showWallet, setShowWallet ] = React.useState(false);
    const [ showPolygon, setShowPolygon ] = React.useState(false);
    const [ showMatic, setShowMatic ] = React.useState(false);

    const addPolygon = React.useCallback(() => {
        window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
            chainId: '0x89',
            chainName: 'Polygon Mainnet',
            nativeCurrency: {
                name: 'Polygon',
                symbol: 'MATIC',
                decimals: 18
            },
            rpcUrls: ['https://polygon-rpc.com/'],
            blockExplorerUrls: ['https://polygonscan.com/']
            }]
            })
            .catch((error: any) => {
            console.log(error)
            }) 
    }, []);

    const tweetString = encodeURI(`Requesting MATIC funds for ${account} for http://sonnet.work from @dreamh4cker!`);
    console.log("tw", tweetString);
    const twitterLink = `http://twitter.com/intent/tweet?text=${tweetString}`;
    console.log("tw link", twitterLink);

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', alignItems: 'center'}}>
            <div style={{maxWidth: 340}}>
                <p style={{fontWeight: 'bold'}}>sonnet/work</p>
                <div>to publish on sonnet/work you need a wallet (like MetaMask) connected to Polygon with some MATIC in it.</div>

                <div style={{marginTop: 24, marginBottom: 12}}><b>Where are you at?</b></div>
                <div style={{marginBottom: 6}}>
                    {
                        showWallet ?
                        <div style={{marginTop: 24}}>
                            <div style={{marginBottom: 12}}>Install a wallet:</div>
                            <div style={{marginBottom: 12}}>metamask is the most popular and well-supported wallet. follow <a href="https://metamask.io/download/" target="_blank" rel="noreferrer">instructions here</a> to install it.</div>
                            <div>remember, write your backup codes in a SAFE place and NEVER tell give to anyone for any reason.</div>
                        </div>
                        :
                        <BlockButton label="don't have wallet at all" onClick={() => setShowWallet(true)} />
                    }
                </div>
                <div style={{marginBottom: 6}}>
                    {
                        showPolygon ? 
                        <div style={{marginTop: 24}}>
                            <div style={{marginBottom: 12}}>Add Polygon network to wallet:</div>
                            <div style={{marginBottom: 12, width: 148}}>
                                <SmallButton label="add the polygon network" onClick={addPolygon} />
                            </div>
                            <div style={{marginBottom: 12}}>click above to add the polygon network to your wallet.</div>
                            <div style={{marginBottom: 12}}>if you run into any issues, find <a href="https://medium.com/stakingbits/setting-up-metamask-for-polygon-matic-network-838058f6d844" target="_blank" rel="noreferrer">more detailed instructions here</a>.</div>
                        </div>
                        :
                        <BlockButton label="have a wallet but not on polygon" onClick={() => setShowPolygon(true)} />
                    }
                </div>
                <div style={{marginBottom: 6}}>
                    {
                        showMatic ? 
                        <div style={{marginTop: 24}}>
                            <div style={{marginBottom: 12}}>Get MATIC:</div>
                            <div style={{marginBottom: 12, width: 142}}>
                                <a href={twitterLink} target="_blank" rel='noreferrer'>
                                    <SmallButton label="tweet to request MATIC" onClick={()=>{}} />
                                </a>
                            </div>
                            <div style={{marginBottom: 12}}>just use the button above to tweet your wallet address (hash, not ENS) to @dreamh4cker.</div>
                            <div style={{marginBottom: 12}}>getting MATIC is a little tricky so to make matters easier, we are sending 3 MATIC to the first 100 poets. This is enough to publish hundreds of poems to the blockchain.</div>
                        </div>
                        :
                        <BlockButton label="have a wallet + polygon, but no MATIC" onClick={() => setShowMatic(true)} />
                    }
                </div>
                <div style={{marginTop: 24, marginBottom: 12}}><i>WHEN YOU ARE READY</i></div>
                <div style={{marginBottom: 6}}>once you have your wallet is set up, connected to polygon, and filled with some MATIC, are ready to proceed.</div>
                <Link href={`/welcome`}>
                    <BlockButton label='Create Profile' onClick={() => {}} />
                </Link>
            </div>
        </div>
    );
}

export default SetupSection;