import React, {Component} from 'react';
import {connect} from 'react-redux'
import {createProject, getClassroom, logout} from '../../store'
import Project from './Project';
import history from '../../history'
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
    }

    componentDidMount() {
        const {id} = this.props;
        this.props.getClassroom(id);
    }

    setIsAdding(isAdding) {
        this.setState({isAdding})
    }

    render() {
        const {projects, classroom} = this.props;
        if (!classroom) return null;
        return (
            <div className='Admin'>
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
                    {
                        this.state.isAdding ?
                            <CreateProject classroomId={classroom.id} setIsAdding={this.setIsAdding}/> :
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
    user: state.user,
    classroom: state.classroom.classroom,
    project: state.project.project
});

const mapDispatchToProps = dispatch => ({
    getClassroom: (id) => dispatch(getClassroom(id)),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Classroom);
