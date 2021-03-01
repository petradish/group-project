import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {getProject, me} from './store';
import {Login} from './components/Login';
import {NotFound} from './components/app/NotFound';
import {JoinProject} from './components/app/JoinProject';
import Admin from './components/admin/Admin';
import Home from './components/Home';
import {ComingSoon} from './components/admin/ComingSoon';

/**
 * COMPONENT
 */
class Routes extends Component {
    componentDidMount() {
        this.props.getUser().then(() => {
            if (this.props.isLoggedIn) {
                const {pathname} = this.props.location;
                if (!pathname || ['/', '/home'].includes(pathname) || pathname.split('/').length > 2) return;
                this.props.getProject(this.props.location.pathname);
            }
        })
    }

    render() {
        const {isLoggedIn, project} = this.props;

        return (
            <Switch>
                <Route exact path="/home" component={isLoggedIn ? Admin : Login}/>
                {isLoggedIn && <Route path="/home/classroom/:id" component={Admin}/>}
                {isLoggedIn && <Route exact path="/create/classroom" component={ComingSoon}/>}

                {isLoggedIn ?
                    <Route path="/:linkName"
                           render={(props) => project ?
                               <Home {...props} /> :
                               <NotFound getProject={this.props.getProject}/>}
                    /> :
                    <Route path="/:linkName" component={JoinProject}/>
                }

                {/*Displays our Login component as a fallback if no project exists */}
                <Route exact path="/" component={isLoggedIn ? Admin : Login}/>

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