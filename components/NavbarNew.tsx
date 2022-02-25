import React from 'react';
import _ from 'lodash';
import Link from 'next/link';
import Image from "next/image";
import useIsDesktop from '../h/useIsDesktop';
import loadWeb3 from '../utils/loadWeb3';

interface NavbarProps {
  account: string;
  poet?: any;
}

const Navbar: React.FC<NavbarProps> = ({account, poet}) => {
  const isDesktop = useIsDesktop();

    return (
      <nav>
        <div style={{display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-between', padding: "16px 0px"}}>
          <div style={{paddingLeft: isDesktop ? 0 : 12}}>
            <Link href="/">
              <div style={{cursor: 'pointer'}}>
                <Image src="/icon_small_b_w.png" width={32} height={32} />
              </div>
            </Link> 
          </div>
          <a style={{color: "#F9F7F5", paddingRight: isDesktop ? 0 : 12}}>
            {
              account ?
              <Link href={poet ? `/poet/${poet.name}` : '/'}><a style={{color: '#fdfcfc'}}>{_.truncate(account, {length: 12, omission: '…'})}</a></Link>
              :
              <span style={{cursor: 'pointer'}} onClick={loadWeb3}>Connect Wallet</span>
            }
          </a>
        </div>
      </nav>
    );
}

export default Navbar;