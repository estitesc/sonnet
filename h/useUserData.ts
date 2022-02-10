import * as React from "react";

function useUserData() {
    const [pfpIndex, setPfpIndex] = React.useState(0);
    const [alias, setAlias] = React.useState("");

    const getUserAlias = React.useCallback(() => {
      const alias = localStorage?.getItem('alias') || "";
      return alias
    }, []);

    const getPfpIndex = React.useCallback(() => {
      const pfpIndexString = localStorage?.getItem('pfpIndex') || "0";
      const pfpIndex = parseInt(pfpIndexString);
      return pfpIndex
    }, []);

    React.useEffect(() => {
      const pfpIndex = getPfpIndex() || 0;
      const alias = getUserAlias() || "";
      setPfpIndex(pfpIndex);
      setAlias(alias);
    }, [getPfpIndex, getUserAlias]);

    return {
      alias,
      pfpIndex,
    }
}

export default useUserData;
