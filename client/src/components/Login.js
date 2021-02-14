import React from 'react';

export const Login = () => {
    const {pathname} = window.location,
        isHomePage = pathname === '/'
    return (
        <div className='popup-login'>
            <div className='popup_inner'>
                <div className={'login'}>
                    <h3>Welcome to ezgp!</h3>
                    {isHomePage ?
                        <p>Create any group project, first-come-first-served.</p> :
                        <div>
                            <p>{`Join group project code: `}</p>
                            <p className='login-code'>{`${pathname.replace('/', '')}`}</p>
                        </div>
                    }
                    <br />
                    {isHomePage ?
                        <a href={`/auth/google${pathname}`}><button>Teacher Log In with Google</button></a> :
                        <a href={`/auth/google${pathname}`}><button>Student Log In with Google</button></a>
                    }
                    <br />
                </div>
            </div>
        </div>
    );
}
