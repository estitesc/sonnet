import React from 'react';
import _ from 'lodash';
import Link from 'next/link';
import Image from "next/image";
import useIsDesktop from '../h/useIsDesktop';

interface NavbarProps {
    account: string;
    poemCount: number;
    poemId: number;
  }

const Navbar: React.FC<NavbarProps> = ({account, poemCount, poemId}) => {
  const poems = new Array(poemCount).fill(undefined);
  const isDesktop = useIsDesktop();

    return (
      <nav>
        <div style={{display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-between', padding: "16px 0px"}}>
          <div style={{paddingLeft: isDesktop ? 0 : 12}}>
            <Link href="/about">
              <div>
                <Image src="/icon_small_b_w.png" width={32} height={32} />
              </div>
            </Link> 
          </div>
          <a style={{color: "#F9F7F5", paddingRight: isDesktop ? 0 : 12}}>
            <span >{_.truncate(account, {length: 12, omission: '…'})}</span>
          </a>
        </div>
      </nav>
    );
}

export default Navbar;