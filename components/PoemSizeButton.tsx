import * as React from 'react';

interface PoemSizeButtonProps {
    onClick: () => void;
    size: number;
    width: number;
    isSelected?: boolean;
}

const PoemSizeButton: React.FC<PoemSizeButtonProps> = ({onClick, isSelected, size, width}) => {

    const boxButtonStyle={
        border: 'solid 1px #FDFCFC',
        margin: 4,
        display:'flex',
        alignItems:'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: isSelected ? '#0B0705' : '#FDFCFC',
        backgroundColor: isSelected ? '#FDFCFC' : '#0B0705'
      }
    
    return (
        <div style={{...boxButtonStyle, width, height: width}} onClick={onClick}>{size}</div>
    );
}

export default PoemSizeButton;