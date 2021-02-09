import React from 'react';

export const Login = () => {
    const {pathname} = window.location;
    return (
        <div className='popup-login'>
            <div className='popup_inner'>
                <div className={'login'}>
                    <h3>Welcome to ezgp!</h3>
                    <p>Create any group project, first-come-first-served.</p>
                    <br />
                    <a href={`/auth/google${pathname}`}><button>Teacher Log In with Google</button></a>
                    <br />
                    <a href={`/auth/google${pathname}`}><button>Student Log In with Google</button></a>
                </div>
            </div>
        </div>
    );
}
