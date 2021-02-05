import React from 'react'
import {connect} from 'react-redux'
import {auth} from '../store'

/**
 * COMPONENT
 */
const LoginForm = props => {
    const {error} = props

    return (
        <form>
            <div>
                <button><a href="/auth/google">Log in with Google</a></button>
                {error && error.response && <div> {error.response.data} </div>}
            </div>

        </form>

    )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
    return {
        name: 'login',
        error: state.user?.error,
        closePopup: true
    }
}


const mapDispatch = dispatch => {
    return {
        handleSubmit(evt) {
            evt.preventDefault()
            const formName = evt.target.name
            const email = evt.target.email.value
            const password = evt.target.password.value
            dispatch(auth(email, password, formName))
        }
    }
}

export const Login = connect(mapLogin, mapDispatch)(LoginForm)
