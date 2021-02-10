import React from 'react';

export const NotFound = () => {
    const {pathname} = window.location;
    return (
        <div className='popup-login'>
            <div className='popup_inner'>
                <div className={'login'}>
                    <h2>{`Sorry, the project code "${pathname.replace('/', '')}" was not found!`}</h2>
                </div>
            </div>
        </div>
    );
}
