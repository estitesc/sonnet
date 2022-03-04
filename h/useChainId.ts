import * as React from 'react';
import loadWeb3 from '../utils/loadWeb3';

const useChainId = (setChainId: (chainId: number) => void) => {
  const loadChainId = React.useCallback(async () => {
    const web3 = window.web3;
    const chainId = await web3.eth.getChainId();
    setChainId(chainId);
  }, [setChainId]);

  React.useEffect(() => {
    loadWeb3();
    loadChainId();
  }, [loadChainId]);
}

export default useChainId;
