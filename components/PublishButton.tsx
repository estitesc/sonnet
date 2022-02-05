import * as React from 'react';

interface PublishButtonProps {
    onPublish: () => void;
}

const PublishButton: React.FC<PublishButtonProps> = ({onPublish}) => {
    const [val, setVal] = React.useState("");
    
    return (
        <div onClick={onPublish} style={{
            padding: 12,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#ffffff',
            marginTop: 12,
            display: 'inline-block',
            cursor: 'pointer'
        }}>
            <div style={{ color: "#fbfbf8", fontSize: 14 }}>Publish on Chain</div>
        </div>
    );
}

export default PublishButton;