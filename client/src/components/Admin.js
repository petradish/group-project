import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getAllProjects, logout} from '../store'
import {sortBy} from 'lodash';
import Project from './Project';

class Admin extends Component {
    constructor (){
        super();
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.props.getProjects();
    }
    logout(){
        this.props.logout();
    }

    render() {
        const {user, projects} = this.props;
        return (
            <React.Fragment>
                <div>
                    <h1>Hi, {user.name}! Manage your projects here</h1>
                    <button onClick={this.logout} className={'logout-button'}>Logout</button>
                </div>
                <div className="App">
                    {projects?.length ? projects?.map((project) => {
                            return <Project
                                key={project.id}
                                id={project.id}
                                name={project.name}
                                topics={project.topics}
                            />
                        })
                        : 'Loading Project Name' }
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    projects: sortBy(state.project.projects, 'name')
});

const mapDispatchToProps = dispatch => ({
    getProjects: () => dispatch(getAllProjects()),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
