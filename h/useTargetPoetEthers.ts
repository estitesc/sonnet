import * as React from 'react';
import { ethers } from 'ethers';
import NaiveSonnetPub from '../abis/NaiveSonnetPub.json';
import infuraProvider from '../lib/infuraProvider';

const useTargetPoetEthers = (poetName: string, setPoet: (poet: any) => void, setPoems: (poems: any) => void) => {
    const getPoetDataInfura = React.useCallback(async () => {
      const networkData = NaiveSonnetPub.networks[137];
      const contract = new ethers.Contract(networkData.address, NaiveSonnetPub.abi, infuraProvider);

      const poetCount = await contract.poetCount();

      let foundPoetId = null;
      for (var i = 0; i < poetCount; i++) {
        const poet = await contract.poets(i);
        if(poet.name == poetName) {
          setPoet(poet);
          foundPoetId=poet.id;
          break;
        }
      }
      // Find all poems associated with this poet
      if(foundPoetId) {
        const poemCount = await contract.poemCount();
        const loadedPoems = [];
        for (var i = 0; i < poemCount; i++) {
          const poem = await contract.poems(i);
          if(poem.poetId.toNumber() === foundPoetId.toNumber()) {
            loadedPoems.push(poem);
          }
        }
        setPoems(loadedPoems);
      }
  }, [poetName, setPoems, setPoet]);

  React.useEffect(() => {
    getPoetDataInfura();
  }, [getPoetDataInfura]);
}

export default useTargetPoetEthers;
