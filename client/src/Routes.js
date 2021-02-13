import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {getProject, me} from './store';
import {Login} from './components/Login';
import {NotFound} from './components/NotFound';
import {ComingSoon} from './components/ComingSoon';
import Admin from './components/Admin';
import Home from './components/Home';
import CreateProject from './components/CreateProject';

/**
 * COMPONENT
 */
class Routes extends Component {
    componentDidMount() {
        this.props.getUser();
        this.props.getProject(this.props.location.pathname);
    }

    render() {
        const {isLoggedIn, project} = this.props;

        return (
            <Switch>
                {isLoggedIn && <Route exact={true} path="/create/project" component={CreateProject}/>}

                {isLoggedIn ?
                    <Route path="/:linkName" component={project ? Home : NotFound} /> :
                    <Route path="/:linkName" component={Login} />
                }

                {/*Displays our Login component as a fallback if no project exists */}
                <Route path="/" component={isLoggedIn ? Admin : Login} />

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
        user: state.user,
        project: state.project.project
    }
}

const mapDispatch = dispatch => {
    return {
        getUser: () => dispatch(me()),
        getProject: (linkName) => dispatch(getProject(linkName))
    }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
    getUser: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    getProject: PropTypes.func.isRequired
}