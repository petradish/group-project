import React, {Component} from 'react';
import {deleteTopic, getProject, updateProject} from '../store';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt, faEdit} from '@fortawesome/free-regular-svg-icons';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {compact, isEmpty, isEqual, keyBy, omit, partition, sortBy, values} from 'lodash';

class Project extends Component {
    constructor (props){
        super(props);
        const {name, linkName, topics, maxStudents, shortName, instructions, description} = this.props;
        this.state = {
            showDetail: false,
            editTopics: false,
            name,
            topics: keyBy(topics, 'id'),
            maxStudents,
            linkName,
            shortName,
            instructions,
            description,
            toDelete: null,
            isDirty: false,
            newTopicCount: 0,
            errors: {}
        };
        this.toggleViewDetail = this.toggleViewDetail.bind(this);
        this.editTopics = this.editTopics.bind(this);
        this.handleTopicChange = this.handleTopicChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addTopic = this.addTopic.bind(this);
        this.deleteTopic = this.deleteTopic.bind(this);
    }

    componentDidMount() {
        this.props.getProject('/' + this.props.linkName);
    }

    toggleViewDetail() {
        this.setState({
            ...this.state,
            showDetail: !this.state.showDetail
        });
    }

    editTopics() {
        this.setState({
            ...this.state,
            editTopics: !this.state.editTopics
        });
    }

    handleTopicChange(evt, topic) {
        const {topics} = this.state;
        topics[topic.id].name = evt.target.value;
        this.setState({...this.state, topics, isDirty: true})
    }

    handleChange(evt) {
        let errors = this.state.errors;
        switch (evt.target.name) {
            case 'topics': return;
            case 'maxStudents':
                errors.maxStudents =
                    evt.target.value < 1 ? 'Max students cannot be 0' : null;
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
        this.setState({...this.state, isDirty: true, errors, [evt.target.name]: evt.target.value});
    }

    handleSubmit(evt) {
        const {name, linkName, topics, maxStudents, shortName, instructions, description, editTopics, errors} = this.state,
            {project} = this.props;
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
        // Do not update if not dirty
        if (!editTopics && isEqual(data, {
            id: this.props.id,
            name: project.name,
            linkName: project.linkName,
            maxStudents: project.maxStudents,
            shortName: project.shortName,
            instructions: project.instructions,
            description: project.description
        })) {
            this.setState({...this.state, showDetail: false, isDirty: false})
            return;
        }

        if (editTopics) {
            data.topics = values(topics).map(it => it.name);
        }

        this.props.updateProject(data).then(() => {
            const {name, linkName, topics, maxStudents, shortName, instructions, description} = this.props.project;
            this.setState({
                showDetail: false,
                editTopics: false,
                name,
                topics: keyBy(topics, 'id'),
                maxStudents,
                linkName,
                shortName,
                instructions,
                description,
                toDelete: null,
                isDirty: false,
                newTopicCount: 0,
                errors: {}
            });
        });
    }

    addTopic(evt) {
        evt.preventDefault();
        const {topics, newTopicCount} = this.state;
        this.setState({
            ...this.state,
            topics: {...topics, [`new${newTopicCount}`]: {id: `new${newTopicCount}`, name: ''}},
            newTopicCount: newTopicCount + 1,
            isDirty: true
        });
    }

    deleteTopic(evt, topic) {
        evt.preventDefault();
        // Only delete topic from API if saved
        if (!topic.id.startsWith('new')) {
            this.props.deleteTopic(topic.id);
        }
        this.setState({...this.state, topics: omit(this.state.topics, topic.id)})
    }

    render(){
        if (!this.props.project) return null;
        const {name, linkName, maxStudents, shortName, instructions, description} = this.props.project,
            {showDetail, editTopics, topics, isDirty} = this.state,
            {handleChange, handleTopicChange, handleSubmit, deleteTopic, addTopic} = this,
            [newTopics, oldTopics] = partition(topics, (it) => it.id.toString().startsWith('new')),
            allTopics = sortBy(oldTopics, 'name').concat(newTopics);

        return (
            !showDetail ?
            <div className={'project-swatch'} onClick={this.toggleViewDetail}>
                <h2 className={'project-title'}>{name}</h2>
            </div> :
           <div className={'project-swatch-detail'}>
               <h2 className={'project-title'}>{name}</h2>
               <div className={'project-detail'}>
                   <div className={'topic-container'}>
                       <div className={'topic-header'}>
                           <h3>Topic List</h3>
                           <button className="edit-button" onClick={this.editTopics}>
                               <FontAwesomeIcon icon={faEdit}/>
                               Edit
                           </button>
                       </div>
                       <ol>{allTopics?.map(t => (
                           <li key={t.id}>
                               {
                                   editTopics ?
                                   <div className="topic-input">
                                       <input onChange={(e) => handleTopicChange(e, t)} type="text" name="topic" defaultValue={t.name}/>
                                       <FontAwesomeIcon className="delete-topic" icon={faTrashAlt} onClick={(e) => deleteTopic(e, t)}/>
                                   </div> :
                                   t.name
                               }
                           </li>)
                       )}</ol>
                       {
                           editTopics ?
                               <button className="add-button" onClick={addTopic}>
                                   <FontAwesomeIcon icon={faPlus}/>
                                   Add Another Topic
                               </button> :
                               null
                       }
                   </div>
                   <div className={'form-fields'}>
                       <form className="form-inline">
                           <label htmlFor="linkName">Link name</label>
                           <input onChange={handleChange} type="text" name="linkName" defaultValue={linkName}/>
                           <label htmlFor="maxStudents">Max. students per group</label>
                           <input onChange={handleChange} type="number" name="maxStudents" defaultValue={maxStudents} min={1} max={8} placeholder={1}/>
                           <label htmlFor="shortName">Short name</label>
                           <input onChange={handleChange} type="text" name="shortName" defaultValue={shortName}/>
                           <label htmlFor="Description">Description</label>
                           <textarea onChange={handleChange} name="description" defaultValue={description} />
                           <label htmlFor="Instructions">Instructions</label>
                           <textarea onChange={handleChange} name="instructions" defaultValue={instructions} />
                       </form>
                       <button className="submit-button" onClick={handleSubmit}>{isDirty ? 'Save' : 'Done'}</button>
                   </div>
               </div>
           </div>
        );
    }
}

const mapStateToProps = state => ({
    project: state.project.project,
});

const mapDispatchToProps = dispatch => ({
    getProject: (linkName) => dispatch(getProject(linkName)),
    updateProject: (project) => dispatch(updateProject(project)),
    deleteTopic: (topicId) => dispatch(deleteTopic(topicId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Project);
