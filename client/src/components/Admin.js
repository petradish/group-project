import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getAllProjects, logout} from '../store'
import {sortBy} from 'lodash';
import Project from './Project';
import history from '../history'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSignOutAlt, faPlus} from '@fortawesome/free-solid-svg-icons';


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
            <div className='Admin'>
                <div>
                    <h1>Hi, {user.name}! Manage your projects here</h1>
                    <button onClick={this.logout} className={'logout-button'}>
                        <FontAwesomeIcon icon={faSignOutAlt}/>
                        Logout
                    </button>
                </div>
                <div className="projects-container">
                    {projects?.length ? projects?.map((project) => {
                        const {id, name, linkName, topics, shortName, maxStudents, description, instruction} = project;
                        return <Project
                            key={id}
                            id={id}
                            name={name}
                            linkName={linkName}
                            topics={topics}
                            shortName={shortName}
                            maxStudents={maxStudents}
                            description={description}
                            instruction={instruction}
                        />
                    }) :
                        'Loading Project Name'
                    }

                </div>
                <button className="new-project-button" onClick={()=> history.push('/create/project')}>
                    <FontAwesomeIcon icon={faPlus}/>
                    Create a new project
                </button>
            </div>
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
