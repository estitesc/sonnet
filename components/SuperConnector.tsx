import React from 'react';
import _ from 'lodash';
import Link from 'next/link';
import useIsDesktop from '../h/useIsDesktop';
import loadWeb3 from '../utils/loadWeb3';
import useAccountPoetData from '../h/useAccountPoetData';
import switchOrAddPolygon from '../utils/switchOrAddPolygon';
import useChainId from '../h/useChainId';
import BlockButton from './BlockButton';

const SuperConnector: React.FC = () => {
  const isDesktop = useIsDesktop();

  const [poet, setPoet] = React.useState(undefined as any);
  const [account, setAccount] = React.useState("");
  const [chainId, setChainId] = React.useState(137);

  useAccountPoetData(setAccount, setPoet);
  useChainId(setChainId);

  const onSwitchToPolygon = React.useCallback(() => {
    setChainId(137);
  }, []);

  const renderLinkButton = () => {
    if(!account) {
      return(
        <BlockButton onClick={loadWeb3} label='Connect Wallet' />
      )
    }
    if(chainId !== 137) {
      return (
        <BlockButton onClick={() => switchOrAddPolygon(onSwitchToPolygon)} label='Switch to Polygon' />
      )
    }
    if(!poet) {
      return (
        <Link href="/welcome">
          <BlockButton onClick={() => {}} label='Start Writing' />
        </Link>
      )
    }
    if(poet) {
      return (
        <Link href={`/poet/${poet?.name}`}>
          <BlockButton onClick={() => {}} label='My Poems' />
        </Link>
      )
    }
  }

    return (
      <a style={{color: "#F9F7F5", paddingRight: isDesktop ? 0 : 12}}>
        {
          renderLinkButton()
        }
      </a>
    );
}

export default SuperConnector;