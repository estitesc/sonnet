import * as React from 'react';
import loadWeb3 from '../utils/loadWeb3';

declare global {
  interface Window {
      web3:any;
  }
}

const useBrowserAccount = (setAccount: (account: string) => void) => {
  const loadAccount = React.useCallback(async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }, [setAccount]);

  React.useEffect(() => {
    loadWeb3();
    loadAccount();
  }, [loadAccount]);
}

export default useBrowserAccount;
