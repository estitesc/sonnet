import * as React from 'react';
import { ethers } from 'ethers';
import infuraProvider from '../lib/infuraProvider';
import NaiveSonnetPub from '../abis/NaiveSonnetPub.json';

const useTargetPoemEthers = (poemId: number, setPoem: (poem: any) => void, setPoet: (poet: any) => void) => {
  const getPoemDataInfura = React.useCallback(async () => {
      if(typeof poemId !== 'string' && typeof poemId !== 'number') { return }
      const networkData = NaiveSonnetPub.networks[137];
      const contract = new ethers.Contract(networkData.address, NaiveSonnetPub.abi, infuraProvider);

      const poem = await contract.poems(poemId);
      const poet = await contract.poets(poem.poetId.toNumber());

      setPoem(poem);
      setPoet(poet);
  }, [poemId, setPoem, setPoet]);

  React.useEffect(() => {
    getPoemDataInfura();
  }, [getPoemDataInfura]);
}

export default useTargetPoemEthers;
