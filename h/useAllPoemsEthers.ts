import * as React from 'react';
import { ethers } from 'ethers';
import infuraProvider from '../lib/infuraProvider';
import NaiveSonnetPub from '../abis/NaiveSonnetPub.json';

const useAllPoemsEthers = (setPoems: (poems: any) => void) => {
  const getPoemsDataInfura = React.useCallback(async () => {
      const networkData = NaiveSonnetPub.networks[137];
      const contract = new ethers.Contract(networkData.address, NaiveSonnetPub.abi, infuraProvider);

      const poemCount = await contract.poemCount();
      const loadedPoems = [];
      for (var i = 0; i < poemCount; i++) {
        const poem = await contract.poems(i);
        if(poem.content.length > 24) {
          loadedPoems.push(poem);
        }
      }
      setPoems(loadedPoems);
  }, [setPoems]);

  React.useEffect(() => {
    getPoemsDataInfura();
  }, [getPoemsDataInfura]);
}

export default useAllPoemsEthers;
