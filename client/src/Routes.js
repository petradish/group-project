import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {me} from './store';
import App from './App';
import Popup from './components/Popup';
import {Login} from './components/Login';
import Home from './components/Home';

/**
 * COMPONENT
 */
class Routes extends Component {
    componentDidMount() {
        this.props.loadInitialData()
    }

    render() {
        const {isLoggedIn} = this.props

        return (
            <Switch>
                {isLoggedIn && (
                    <Switch>
                        {/* Routes placed here are only available after logging in */}
                        <Route path="/" component={Home} />
                    </Switch>
                )}
                 {/*Displays our Login component as a fallback */}
                <Route path="/" component={Login} />
            </Switch>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = state => {
    return {
        // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
        // Otherwise, state.user will be an empty object, and state.user.id will be falsey
        isLoggedIn: !!state.user?.googleId,
        name: state.user?.name
    }
}

const mapDispatch = dispatch => {
    return {
        loadInitialData() {
            dispatch(me())
        }
    }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
    loadInitialData: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired
}