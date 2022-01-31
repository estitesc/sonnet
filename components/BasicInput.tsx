import * as React from 'react';

interface BasicInputProps {
    onChange: (e: any) => void;
}

const BasicInput: React.FC<BasicInputProps> = ({onChange}) => {
    const [val, setVal] = React.useState("");
    
    return (
        <input 
            value={val}
            onChange={(e) => {
                const value = e.target.value;
                setVal(value);
                onChange(value);
            }}
            maxLength = {36}
        />
    );
}

export default BasicInput;