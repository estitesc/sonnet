import * as React from "react";

function useUserData() {

    const getUserAlias = React.useCallback(() => {
      const alias = localStorage.getItem('alias');
      return alias
    }, []);

    const getPfpIndex = React.useCallback(() => {
      const pfpIndex = parseInt(localStorage.getItem('pfpIndex') || "0");
      return pfpIndex
    }, []);

  return {
    getUserAlias,
    getPfpIndex,
  };
}

export default useUserData;
