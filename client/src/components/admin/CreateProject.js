import React, {Component} from 'react';
import {connect} from 'react-redux'
import {createProject, logout} from '../../store'
import {compact, isEmpty, map, omit, values} from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons';

class CreateProject extends Component {
    constructor() {
        super();

        this.state = {
            name: null,
            topics: {},
            maxStudents: null,
            shortName: null,
            instructions: null,
            description: null,
            newTopicCount: null,
            errors: {}
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
        this.handleTopicChange = this.handleTopicChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addTopic = this.addTopic.bind(this);
        this.logout = this.logout.bind(this);
    }

    handleChange(evt) {
        let errors = this.state.errors;
        switch (evt.target.name) {
            case 'topic':
                return;
            case 'maxStudents':
                errors.maxStudents =
                    evt.target.value < 1 ? 'Max students cannot be 0' : null;
                break;
            case 'name':
                errors.shortName = evt.target.value.length < 3 ? 'Required' : null
                break;
            case 'shortName':
                errors.shortName = evt.target.value.length < 1 ? 'Required' : null
                break;
            case 'instructions':
                errors.instructions = evt.target.value.length < 2 ? 'Required' : null
                break;
            case 'description':
                errors.description = evt.target.value.length < 2 ? 'Required' : null
                break;
            default:
                break;
        }
        this.setState({...this.state, errors, [evt.target.name]: evt.target.value});
    }


    handleTopicChange(evt, topicId) {
        const {topics} = this.state;
        topics[topicId].name = evt.target.value;
        this.setState({...this.state, topics})
    }

    addTopic(evt) {
        evt.preventDefault();
        const {topics, newTopicCount} = this.state;
        this.setState({
            ...this.state,
            topics: {...topics, [`new${newTopicCount}`]: {id: `new${newTopicCount}`, name: ''}},
            newTopicCount: newTopicCount + 1
        });
    }

    logout() {
        this.props.logout();
    }

    deleteTopic(evt, topicId) {
        evt.preventDefault();
        this.setState({...this.state, topics: omit(this.state.topics, topicId)})
    }

    handleSubmit(evt) {
        const {name, linkName, topics, maxStudents, shortName, instructions, description, errors} = this.state;
        evt.preventDefault();
        if (!isEmpty(compact(values(errors)))) {
            return;
        }
        const data = {
            id: this.props.id,
            name,
            linkName,
            maxStudents,
            shortName,
            instructions,
            description
        };

        if (!isEmpty(topics)) {
            data.topics = map(values(topics), 'name');
        }

        this.props.createProject(data);
    }

    render() {
        const {topics} = this.state,
            {handleChange, handleTopicChange, handleSubmit, deleteTopic, addTopic} = this;

        return (
            <React.Fragment>
                <div>
                    <h1>Create a new project</h1>
                    <button onClick={this.logout} className={'logout-button'}>
                        <FontAwesomeIcon icon={faSignOutAlt}/>
                        Logout
                    </button>
                </div>
                <div className="create-project-container">
                    <div className={'project-swatch-detail'}>
                        <div className={'project-detail'}>
                            <div className={'topic-container'}>
                                <div className={'topic-header'}>
                                    <h3>Topic List</h3>
                                </div>
                                <ol>{values(topics)?.map(t => (
                                    <li key={t.id}>
                                        <div className="topic-input">
                                            <input onChange={(e) => handleTopicChange(e, t.id)} type="text"
                                                   name="topic"/>
                                            <FontAwesomeIcon className="delete-topic" icon={faTrashAlt}
                                                             onClick={(e) => deleteTopic(e, t.id)}/>
                                        </div>
                                    </li>)
                                )}</ol>
                                <button className="add-button" onClick={addTopic}>
                                    <FontAwesomeIcon icon={faPlus}/>
                                    Add Another Topic
                                </button>

                            </div>
                            <div className={'form-fields'}>
                                <form className="form-inline">
                                    <label htmlFor="name">Project name</label>
                                    <input onChange={handleChange} type="text" name="name"/>
                                    <label htmlFor="maxStudents">Max. students per group</label>
                                    <input onChange={handleChange} type="number" name="maxStudents" min={1} max={8}
                                           placeholder={1}/>
                                    <label htmlFor="shortName">Short name</label>
                                    <input onChange={handleChange} type="text" name="shortName"/>
                                    <label htmlFor="Description">Description</label>
                                    <textarea onChange={handleChange} name="description"/>
                                    <label htmlFor="Instructions">Instructions</label>
                                    <textarea onChange={handleChange} name="instructions"/>
                                </form>
                                <button onClick={handleSubmit}>Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    createProject: (project) => dispatch(createProject(project))
})

export default connect(null, mapDispatchToProps)(CreateProject);
