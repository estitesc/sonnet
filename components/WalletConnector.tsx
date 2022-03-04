import React from 'react';
import _ from 'lodash';
import Link from 'next/link';
import useIsDesktop from '../h/useIsDesktop';
import loadWeb3 from '../utils/loadWeb3';
import useAccountPoetData from '../h/useAccountPoetData';
import switchOrAddPolygon from '../utils/switchOrAddPolygon';
import useChainId from '../h/useChainId';
import BlockButton from './BlockButton';

interface WalletConnectorProps {
  poet?: any;
}

const WalletConnector: React.FC<WalletConnectorProps> = ({poet}) => {
  const isDesktop = useIsDesktop();

  const [account, setAccount] = React.useState("");
  const [chainId, setChainId] = React.useState(137);

  useAccountPoetData(setAccount, () => {});
  useChainId(setChainId);

  const onSwitchToPolygon = React.useCallback(() => {
    setChainId(137);
  }, []);

  const renderLinkButton = () => {
    if(!account) {
      return(
        // <span style={{cursor: 'pointer'}} onClick={loadWeb3}></span>
        <BlockButton onClick={loadWeb3} label='Connect Wallet' />
      )
    }
    if(chainId !== 137) {
      return (
        <BlockButton onClick={() => switchOrAddPolygon(onSwitchToPolygon)} label='Switch to Polygon' />
      )
    }
    return (
      <Link href={poet ? `/poet/${poet.name}` : '/'}><a style={{color: '#fdfcfc'}}>{_.truncate(account, {length: 12, omission: '…'})}</a></Link>
    )
  }

    return (
      <a style={{color: "#F9F7F5", paddingRight: isDesktop ? 0 : 12}}>
        {
          renderLinkButton()
        }
      </a>
    );
}

export default WalletConnector;