import React from 'react';

interface InputLine {
    value: string;
    setValue: (val: string) => void;
    onSubmit: () => void;
    maxLength?: number;
}

const InputLine: React.FC<InputLine> = ({value, setValue, onSubmit, maxLength = 28}) => {
    const handleKeyPress = React.useCallback((e: any) => {
        if(e.code === 'Enter') {
            onSubmit();
            setValue("");
            return;
        }

        let newVal = value;

        if(e.code === 'Backspace') {
            newVal = value.substring(0, value.length - 1);
        }

        if(value.length <= maxLength) {
            if(e.key.length === 1) {
                newVal = `${value}${e.key}`;
            }
            
            if(e.code === 'Space') {
                newVal = `${value} `
            }
        }

        if(newVal !== value) {
            setValue(newVal);
        }
      }, [value, maxLength, onSubmit, setValue]);

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => document.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);
    
    return (
      <div style={{display: 'flex', height: 20}}>
          <span style={{whiteSpace: 'pre'}}>{value}</span>
            <div className='blinking' style={{ width: 10, height: 20, backgroundColor: '#FDFCFC'}} />
      </div>
    );
}

export default InputLine;