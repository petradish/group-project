import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getAllClassrooms, getAllProjects, logout} from '../../store'
import {sortBy} from 'lodash';
import history from '../../history'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {TitleBar} from '../TitleBar';
import './admin.scss';
import Classroom from './Classroom';

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            classroomId: null,
            classroomName: null
        };
        this.setClassroom = this.setClassroom.bind(this);
    }

    setClassroom(classroom) {
        const {id, name} = classroom;
        this.setState({...this.state, classroomId: id, classroomName: name});
        this.props.getProjects(id);
        // history.push(`/home/classroom/${id}`);
    }

    componentDidMount() {
        this.props.getClassrooms();
    }

    render() {
        const {user, logout, classrooms, projects} = this.props,
            {classroomId, classroomName} = this.state;
        return (
            <div className='Admin'>
                <div className="sidebar">
                    <h3>{user.name}'s Classes</h3>
                    {classrooms?.length ? classrooms?.map((classroom) => {
                            const {id, name, description} = classroom;
                            return(
                                <div className={classroomId === id ? 'classroom--selected' : 'classroom'} key={id} onClick={() => this.setClassroom({id, name})}>
                                    <h2 className={'classroom__title'}>{name}</h2>
                                    <p className={'classroom__description'}>{description}</p>
                                </div>
                            )
                        }) :
                        'Loading Classroom'
                    }
                    <button className="new-class-button" onClick={() => history.push('/create/classroom')}>
                        <FontAwesomeIcon icon={faPlus}/>
                        Create a new classroom
                    </button>
                </div>
                <div className="main">
                    <TitleBar logout={logout} text={`${classroomName ?? 'Manage Classrooms'}`} />
                    {classroomId ? <Classroom id={classroomId} projects={projects}/> : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    classrooms: sortBy(state.classroom.classrooms, 'name'),
    projects: sortBy(state.project.projects, 'name')
});

const mapDispatchToProps = dispatch => ({
    getClassrooms: () => dispatch(getAllClassrooms()),
    getProjects: (id) => dispatch(getAllProjects(id)),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
