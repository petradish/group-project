import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
const LoginForm = props => {
    const {error} = props

    return (
        <div className='popup-login'>
            <div className='popup_inner'>
                <div className={'login'}>
                    <h3>Welcome to ezgp!</h3>
                    <p>Create any group project, first-come-first-served.</p>
                    <br />

                    <button><a href="/auth/google">Teacher Log In with Google</a></button>
                    <br />
                    <button><a href="/auth/google">Student Log In with Google</a></button>

                    {error && error.response && <div> {error.response.data} </div>}
                </div>
            </div>
        </div>
    )
}

const mapLogin = state => {
    return {
        error: state.user?.error,
        closePopup: true
    }
}

export const Login = connect(mapLogin, null)(LoginForm)
