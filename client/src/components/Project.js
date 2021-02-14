import React, {Component} from 'react';
import {sortBy} from 'lodash';
import {getProject} from '../store';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashAlt, faEdit} from '@fortawesome/free-regular-svg-icons';

class Project extends Component {
    constructor (){
        super();
        this.state = {
            showDetail: false,
            editTopics: false
        };
        this.toggleViewDetail = this.toggleViewDetail.bind(this);
        this.editTopics = this.editTopics.bind(this);
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

    render(){
        const {name, topics, linkName, maxStudents, shortName, instructions, description} = this.props,
            {showDetail, editTopics} = this.state,
            sortedTopics = sortBy(topics, 'name');
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
                       <ol>{sortedTopics?.map((t, i) => (
                           <li key={i}>
                               {editTopics ?
                                   <div className="topic-input">
                                       <input required={true} type="text" name="topic" defaultValue={t.name} />
                                       <FontAwesomeIcon className="delete-topic" icon={faTrashAlt} />
                                   </div>
                                   :
                                   t.name
                               }
                           </li>)
                       )}</ol>
                   </div>
                   <div className={'form-fields'}>
                       <form className="form-inline">
                           <label htmlFor="linkName">Link name</label>
                           <input required={true} type="text" name="linkName" defaultValue={linkName} readOnly={true}/>
                           <label htmlFor="maxStudents">Max. students per group</label>
                           <input required={true} type="number" name="maxStudents" defaultValue={maxStudents} min={1} max={8} placeholder={1}/>
                           <label htmlFor="shortName">Short name</label>
                           <input required={true} type="text" name="shortName" defaultValue={shortName}/>
                           <label htmlFor="Description">Description</label>
                           <textarea required={true} name="description" defaultValue={description} />
                           <label htmlFor="Instructions">Instructions</label>
                           <textarea required={true} name="instructions" defaultValue={instructions} />
                       </form>
                       <button className="submit-button" onClick={this.toggleViewDetail}>Done</button>
                   </div>
               </div>
           </div>
        );
    }
}

const mapStateToProps = state => ({
    projectDetail: state.project.project
});

const mapDispatchToProps = dispatch => ({
    getProject: (linkName) => dispatch(getProject(linkName))
})

export default connect(mapStateToProps, mapDispatchToProps)(Project);
