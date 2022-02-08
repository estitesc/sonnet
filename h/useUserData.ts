import * as React from "react";

function useUserData() {

    const getUserAlias = React.useCallback(() => {
      const alias = localStorage?.getItem('alias') || "";
      return alias
    }, []);

    const getPfpIndex = React.useCallback(() => {
      const pfpIndexString = localStorage?.getItem('pfpIndex') || "0";
      const pfpIndex = parseInt(pfpIndexString);
      return pfpIndex
    }, []);

  return {
    getUserAlias,
    getPfpIndex,
  };
}

export default useUserData;
