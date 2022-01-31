import React from 'react';
import _ from 'lodash';
import Link from 'next/link'

interface NavbarProps {
    account: string;
    poemCount: number;
    poemId: number;
  }

const Navbar: React.FC<NavbarProps> = ({account, poemCount, poemId}) => {
  const poems = new Array(poemCount).fill(undefined);

  const renderPoemList = React.useCallback(() => {
    return poems.map((_poem, index) => {
      return (
        poemId == index ?
        <span>{index}</span>
        :
        <Link href={`/${index}`}><a>{index}</a></Link>
      );
    });
  }, [poems]);

    return (
      <nav>
        <div style={{display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-between', padding: "16px 0px"}}>
          <div><Link href="/about"><a style={{color: '#F9F7F5', fontWeight: 'bold'}}>&lt;SONN3T&gt;</a></Link> {renderPoemList()}</div>
          <a style={{color: "#F9F7F5"}}><span >{_.truncate(account, {length: 12, omission: '…'})}</span></a>
        </div>
      </nav>
    );
}

export default Navbar;