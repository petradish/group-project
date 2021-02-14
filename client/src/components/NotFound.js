import React, {useState} from 'react';
import history from '../history';

export const NotFound = (props) => {
    const {pathname} = window.location,
        [linkName, setLinkName] = useState();

    return (
        <div className='popup-login'>
            <div className='popup_inner'>
                <div className={'login'}>
                    <p>Sorry, the project code: <span className='login-code'>{`${pathname.replace('/', '')}`}</span> was not found</p>
                    <p htmlFor="linkName">Try another code:</p>
                    <div className={'login-code-input'}>
                        <input type="text" name="linkName" onChange={(e) => setLinkName(e.target.value)}/>
                        <button disabled={!linkName} onClick={() => {
                            props.getProject(`/${linkName}`);
                            history.push(`/${linkName}`);
                        }}>Go!</button>
                    </div>

                </div>

            </div>
        </div>
    );
}
