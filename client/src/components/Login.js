import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store';

/**
 * COMPONENT
 */
const LoginForm = props => {
    const {login, error} = props

    return (
        <div className='popup-login'>
            <div className='popup_inner'>
                <div className={'login'}>
                    <h3>Welcome to ezgp!</h3>
                    <p>Create any group project, first-come-first-served.</p>
                    <br />

                    <button onClick={login}>Teacher Log In with Google</button>
                    <br />
                    <button onClick={login}>Student Log In with Google</button>

                    {error && <p style={{color: 'red'}}> {error.message} </p>}
                </div>
            </div>
        </div>
    );
}
const mapState = state => ({
    user: state.user,
    error: state.user.error
})

const mapDispatch = dispatch => ({
    login: () => dispatch(auth())
})

export const Login = connect(mapState, mapDispatch)(LoginForm)
