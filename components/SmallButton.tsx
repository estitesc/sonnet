import * as React from 'react';

interface SmallButtonProps {
    onClick: () => void;
    label: string;
}

const SmallButton: React.FC<SmallButtonProps> = ({onClick, label}) => {
    return (
        <div onClick={onClick} style={{ 
            color: '#0B0705', 
            backgroundColor: '#FDFCFC', 
            padding: 4, 
            borderRadius: 4,
            fontSize: 10,
            lineHeight: 1,
            fontWeight: 'bold',
            cursor: 'pointer'
        }}>
            {label}
        </div>
    );
}

export default SmallButton;