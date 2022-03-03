import * as React from 'react';

interface BlockButtonProps {
    onClick: () => void;
    label: string;
}

const BlockButton: React.FC<BlockButtonProps> = ({onClick, label}) => {
    return (
        <div onClick={onClick} style={{
            padding: 12,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#ffffff',
            display: 'inline-block',
            cursor: 'pointer',
        }}>
            <div style={{ color: "#fbfbf8", fontSize: 14 }}>{label}</div>
        </div>
    );
}

export default BlockButton;