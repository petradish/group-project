import React, {Component} from 'react';
import {connect} from 'react-redux'
import {createProject} from '../../store'
import {compact, isEmpty, isString, map, omit, values} from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCheck, faPlus} from '@fortawesome/free-solid-svg-icons';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons';

class CreateProject extends Component {
    constructor(props) {
        super(props);

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
    }

    handleChange(evt) {
        let errors = this.state.errors,
            value = evt.target.value
        value = isString(value) ? value.trim() : value;

        switch (evt.target.name) {
            case 'topic':
                return;
            case 'maxStudents': {
                errors.maxStudents = value < 1 ?
                    `Min. 1 student` : value > 8 ?
                        'Max. 8 students' :
                        null;
                break;
            }
            case 'shortName':
                errors.shortName = value.length < 1 ? 'Required' : null
                break;
            case 'name':
            case 'description':
            case 'instructions':
                errors[evt.target.name] = value.length < 4 ? 'Min. 4 characters' : null
                break;
            case 'linkName': {
                if (value.length < 4) {
                    errors.linkName = 'Min. 4 characters';
                } else {
                    const regex = new RegExp(`^[a-zA-Z0-9]{4,50}$`);
                    errors.linkName = !regex.test(value) ? 'Link names can only contain alphanumeric characters' : null;
                }
                break;
            }
            default:
                break;
        }
        this.setState({...this.state, errors, [evt.target.name]: value});
    }

    async handleSubmit(evt) {
        const {name, linkName, topics, maxStudents, shortName, instructions, description, errors} = this.state;
        evt.preventDefault();
        if (!isEmpty(compact(values(errors)))) {
            return;
        }
        const data = {
            id: this.props.id,
            classroomId: this.props.classroomId,
            name,
            linkName,
            maxStudents,
            shortName,
            instructions,
            description
        };

        if (!isEmpty(topics)) {
            data.topics = compact(map(values(topics), 'name'));
        }

        await this.props.createProject(data);
        this.props.fetchClassroom();
        this.props.setIsAdding(false);
    }

    handleTopicChange(evt, topicId) {
        const {topics} = this.state;
        topics[topicId].name = evt.target.value?.trim();
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

    deleteTopic(evt, topicId) {
        evt.preventDefault();
        this.setState({...this.state, topics: omit(this.state.topics, topicId)})
    }

    render() {
        const {topics, errors, name, shortName, maxStudents, description, instructions} = this.state,
            formNotValid = !name || !shortName || !maxStudents || !description || !instructions,
            {handleChange, handleTopicChange, handleSubmit, deleteTopic, addTopic} = this;

        return (
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
                            <label htmlFor="name">
                                Project name*
                                {errors.name ? <p>{errors.name}</p> : null}
                            </label>
                            <input onChange={handleChange} type="text" name="name"/>
                            <label htmlFor="maxStudents">
                                Max. students*
                                {errors.maxStudents ? <p>{errors.maxStudents}</p> : <p> (per group)</p>}
                            </label>
                            <input onChange={handleChange} type="number" name="maxStudents" min={1} max={8}
                                   placeholder={1}/>
                            <label htmlFor="shortName">
                                Short name*
                                {errors.shortName ? <p>{errors.shortName}</p> : null}
                            </label>
                            <input onChange={handleChange} type="text" name="shortName"/>
                            <label htmlFor="Description">
                                Description*
                                {errors.description ? <p>{errors.description}</p> : null}
                            </label>
                            <textarea onChange={handleChange} name="description"/>
                            <label htmlFor="Instructions">
                                Instructions*
                                {errors.instructions ? <p>{errors.instructions}</p> : null}
                            </label>
                            <textarea onChange={handleChange} name="instructions"/>
                        </form>
                        <div className={'action-button'}>
                            <button onClick={() => this.props.setIsAdding(false)}>Cancel</button>
                            <button
                                className="submit-button"
                                title={compact(values(errors)).length ? 'Resolve errors before saving' : null}
                                disabled={compact(values(errors)).length || formNotValid}
                                onClick={handleSubmit}>
                                <FontAwesomeIcon icon={faCheck}/>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    createProject: (project) => dispatch(createProject(project))
})

export default connect(null, mapDispatchToProps)(CreateProject);
