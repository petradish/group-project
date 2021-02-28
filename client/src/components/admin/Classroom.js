import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getClassroom, logout} from '../../store'
import Project from './Project';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import CreateProject from './CreateProject';

class Classroom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdding: false
        };
        this.setIsAdding = this.setIsAdding.bind(this);
        this.fetchClassroom = this.fetchClassroom.bind(this);
    }

    componentDidMount() {
        this.fetchClassroom();
    }

    fetchClassroom() {
        this.props.getClassroom(this.props.id);
    }

    setIsAdding(isAdding) {
        this.setState({isAdding})
    }

    render() {
        const {classroom} = this.props;
        if (!classroom) return null;
        const {projects} = classroom;
        return (
            <div className='Admin'>
                <div className="projects-container">
                    {projects.length ? projects.map((project) => {
                            const {id} = project;
                            return <Project
                                key={id}
                                id={id}
                                project={project}
                                fetchClassroom={this.fetchClassroom}
                            />
                        }) :
                        null
                    }
                    {
                        this.state.isAdding ?
                            <CreateProject key={classroom.id} classroomId={classroom.id} setIsAdding={this.setIsAdding}/> :
                            <button className="new-project-button" onClick={() => this.setIsAdding(true)}>
                                <FontAwesomeIcon icon={faPlus}/>
                                Create a new project
                            </button>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    classroom: state.classroom.classroom
});

const mapDispatchToProps = dispatch => ({
    getClassroom: (id) => dispatch(getClassroom(id)),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Classroom);
