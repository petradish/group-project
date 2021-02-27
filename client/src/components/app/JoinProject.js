import React from 'react';

export const JoinProject = () => {
    const {pathname} = window.location;
    return (
        <div className='popup-login'>
            <div className='popup_inner'>
                <div className={'login'}>
                    <h3>Welcome to ezgp!</h3>
                        <div>
                            <p>{`Join group project code: `}</p>
                            <p className='login-code'>{`${pathname.replace('/', '')}`}</p>
                        </div>
                        <br/>
                        <a href={`/auth/google${pathname}`}>
                            <button>Student Log In with Google</button>
                        </a>
                </div>
            </div>
        </div>
    );
}
