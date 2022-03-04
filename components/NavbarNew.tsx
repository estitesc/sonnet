import React from 'react';
import _ from 'lodash';
import Link from 'next/link';
import Image from "next/image";
import useIsDesktop from '../h/useIsDesktop';
import WalletConnector from './WalletConnector';
import SuperConnector from './SuperConnector';

interface NavbarProps {
  account: string;
  poet?: any;
  showWallet?: boolean;
  showAbout?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({account, poet, showWallet, showAbout}) => {
  const isDesktop = useIsDesktop();

    return (
      <nav>
        <div style={{display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-between', padding: "16px 0px"}}>
          <div style={{paddingLeft: isDesktop ? 0 : 12, display: 'flex'}}>
            <Link href="/">
              <div style={{cursor: 'pointer'}}>
                <Image src="/icon_small_b_w.png" width={32} height={32} />
              </div>
            </Link>
            {
              showAbout &&
              <Link href="/start">
                <div style={{padding: '6px 0px 0px 24px'}}>
                  about
                </div>
              </Link>
            }
          </div>
          {
            showWallet ?
            <WalletConnector />
            :
            <SuperConnector />
          }
        </div>
      </nav>
    );
}

export default Navbar;