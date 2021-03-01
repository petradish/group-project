import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getAllClassrooms, logout} from '../../store'
import {sortBy} from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {TitleBar} from '../TitleBar';
import './admin.scss';
import Classroom from './Classroom';
import CreateClassroom from './CreateClassroom';

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            classroomId: null,
            classroomName: null,
            isAdding: false
        };
        this.setClassroom = this.setClassroom.bind(this);
        this.setIsAdding = this.setIsAdding.bind(this);
        this.getClassrooms = this.getClassrooms.bind(this);
    }

    setClassroom(classroom) {
        const {id, name} = classroom;
        this.setState({...this.state, classroomId: id, classroomName: name});
    }

    setIsAdding(isAdding) {
        this.setState({isAdding})
    }

    getClassrooms() {
        this.props.getClassrooms();
    }

    componentDidMount() {
        this.getClassrooms();
    }

    render() {
        const {user, logout, classrooms} = this.props,
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
                    {
                        this.state.isAdding ?
                            <CreateClassroom
                                setIsAdding={this.setIsAdding}
                                getClassrooms={this.getClassrooms}
                                setClassroom={this.setClassroom}
                            /> :
                            <button className="new-class-button" onClick={() => this.setIsAdding(true)}>
                                <FontAwesomeIcon icon={faPlus}/>
                                Create a new classroom
                            </button>
                    }
                </div>
                <div className="main">
                    <TitleBar logout={logout} text={`${classroomName ?? 'Manage Classrooms'}`} />
                    {classroomId ?
                        <Classroom
                            key={classroomId}
                            id={classroomId}
                        /> :
                        null
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    classrooms: sortBy(state.classroom.classrooms, 'name')
});

const mapDispatchToProps = dispatch => ({
    getClassrooms: () => dispatch(getAllClassrooms()),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
