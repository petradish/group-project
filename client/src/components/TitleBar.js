import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export const TitleBar = (props) => {
    const {text, logout} = props;
    return (
        <div className={'title-bar'}>
            <h1>{props.user ? `Hi, ${props.user.name}! ` : null}{text}</h1>
            <button onClick={logout} className={'logout-button'}>
                <FontAwesomeIcon icon={faSignOutAlt}/>
                Logout
            </button>
        </div>
    )
}
