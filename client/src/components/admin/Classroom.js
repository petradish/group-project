import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getAllProjects, getClassroom, logout} from '../../store'
import {sortBy} from 'lodash';
import Project from './Project';
import history from '../../history'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';


class Classroom extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        const {pathname} = window.location,
            id = pathname.replace('/home/classroom', '');
        this.props.getClassroom(id);
        this.props.getProjects(id);
    }

    logout() {
        this.props.logout();
    }

    render() {
        const {projects, classroom} = this.props;
        if (!classroom) return null;
        return (
            <div className='Admin'>
                <div>
                    <h1>Manage your projects for {classroom?.name}</h1>
                    <button onClick={this.logout} className={'logout-button'}>
                        <FontAwesomeIcon icon={faSignOutAlt}/>
                        Logout
                    </button>
                </div>
                <div className="projects-container">
                    {projects?.length ? projects?.map((project) => {
                            const {id, name, linkName, topics, shortName, maxStudents, description, instructions} = project;
                            return <Project
                                key={id}
                                id={id}
                                name={name}
                                linkName={linkName}
                                topics={topics}
                                shortName={shortName}
                                maxStudents={maxStudents}
                                description={description}
                                instructions={instructions}
                            />
                        }) :
                        null
                    }
                </div>
                <button className="new-project-button" onClick={() => history.push('/create/project')}>
                    <FontAwesomeIcon icon={faPlus}/>
                    Create a new project
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    classroom: state.classroom.classroom,
    projects: sortBy(state.project.projects, 'name')
});

const mapDispatchToProps = dispatch => ({
    getClassroom: (id) => dispatch(getClassroom(id)),
    getProjects: (id) => dispatch(getAllProjects(id)),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Classroom);
