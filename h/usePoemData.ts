import * as React from "react";

function usePoemData() {

    const getPoemData = React.useCallback(() => {
      const poems = localStorage.getItem('poems');
      if(poems) {
        const poemData = JSON.parse(poems).map((poem: any, index: number) => {
          return {...poem, index };
        });
        return poemData;
      } else {
        return [];
      }
    }, []);

    const setPoemData = (poems: any) => {
      localStorage.setItem('poems', JSON.stringify(poems));
    }

    const addPoem = (poem: any) => {
      const poems = getPoemData();
      const poemWithDate = {
        ...poem,
        createdAt: new Date().getTime(),
      }
      const newPoems = [...poems, poemWithDate];
      console.log("new poems is", newPoems);
      setPoemData(newPoems);
    }

  return {
      getPoemData,
      setPoemData,
      addPoem,
  };
}

export default usePoemData;
