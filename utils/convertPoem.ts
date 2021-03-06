import _ from 'lodash';

const convertPoem = (poem: any) => {
    const linesData = convertContentToLines(poem.content);

    return {
        ...linesData,
        ...poem,
    }
}

export const convertContentToLines = (poemContent: string) => {  
    const lines = _.split(poemContent, '\n');

    return {
        lines,
        size: lines.length,
    }
}

export default convertPoem;