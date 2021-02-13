import React, {Component} from 'react';
import {sortBy} from 'lodash';
import {getAllProjects, getProject, logout} from '../store';
import {connect} from 'react-redux';

class Project extends Component {
    constructor (){
        super();
        this.state = {
            showDetail: false
        };
        this.toggleViewDetail = this.toggleViewDetail.bind(this);
    }

    toggleViewDetail() {
        this.setState({
            showDetail: !this.state.showDetail
        });
    }

    render(){
        const {name, topics, linkName, maxStudents, shortName, instruction, description} = this.props,
            {showDetail} = this.state,
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
                       <h3>Topic List</h3>
                       <ol>{sortedTopics?.map((t, i) => <li key={i}>{t.name}</li>)}</ol>
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
                           <textarea required={true} name="instruction" defaultValue={instruction} />
                       </form>
                       <button onClick={this.toggleViewDetail}>Done</button>
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
