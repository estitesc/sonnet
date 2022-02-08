import * as React from 'react';
import useIsDesktop from '../h/useIsDesktop';
import BlockButton from './BlockButton';
import InputLine from './InputLine';

interface UserSetupProps {
  onSubmit: () => void;
}

const UserSetup: React.FC<UserSetupProps> = ({onSubmit}) => {
    const [ alias, setAlias ] = React.useState("");
    const isDesktop = useIsDesktop();

    const onSubmitAlias = React.useCallback(() => {
      if(alias.length === 0) {
        return;
      }
      localStorage.setItem('alias', alias);
      onSubmit();
    }, [alias, onSubmit]);

    return (
      <div 
        id="content" 
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection:'column', 
          width: '100%'
        }}>
        <div style={{
          minWidth: 365,
          marginLeft: isDesktop ? 72 : 12,
        }}>
          <div>
            <div style={{fontWeight: 'bold'}}>who are you?</div>
            <div style={{display:'flex'}}>
              <InputLine value={alias} setValue={setAlias} onSubmit={onSubmitAlias} maxLength={18} />
            </div>
            {
          !isDesktop &&
            <input id="hiddenInput" style={{marginTop: 24}} value={alias} />
        }
            
            <div style={{marginTop: 24, fontSize: 12}}>
              type up to 18 characters
            </div>
          </div>
          <div style={{marginTop: 24}}>
            </div>
            <BlockButton label='Confirm' onClick={onSubmitAlias} />
        </div>
        
      </div>
    );
}

export default UserSetup;